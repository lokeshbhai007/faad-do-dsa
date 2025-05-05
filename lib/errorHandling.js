// lib/rateLimit.js
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

/**
 * Simple rate limiting middleware for API routes
 * @param {Request} request - The incoming request object
 * @param {Object} options - Rate limiting options
 * @returns {Promise<Object>} - Result with limited status
 */
export async function rateLimit(request, options = {}) {
  const {
    limit = 10, // Maximum number of requests 
    duration = 60, // Time window in seconds
    identifierFn = getIdentifier, // Function to get identifier
  } = options;

  try {
    // Get identifier from request (IP, API key, etc.)
    const identifier = await identifierFn(request);
    
    if (!identifier) {
      console.warn('No identifier for rate limiting');
      return { limited: false, remaining: limit };
    }

    const key = `ratelimit:${identifier}`;
    
    // Get current count and time
    const [current = 0] = await redis.pipeline()
      .incr(key)
      .expire(key, duration)
      .exec();
    
    const remaining = Math.max(0, limit - current);
    const reset = Math.floor(Date.now() / 1000) + duration;
    const limited = current > limit;

    // Return rate limit information
    return {
      limited,
      remaining,
      reset,
      limit,
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open - allow request if rate limiting fails
    return { limited: false };
  }
}

/**
 * Get a unique identifier from the request
 * @param {Request} request - The incoming request
 * @returns {Promise<string>} - A unique identifier
 */
async function getIdentifier(request) {
  // Try to get API key from headers
  const apiKey = request.headers.get('X-API-Key') || 
                request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (apiKey) {
    return `apikey:${apiKey}`;
  }
  
  // Fall back to IP address
  const ip = request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            'unknown';
            
  return `ip:${ip}`;
}

/**
 * Higher-order function to add rate limiting to any API handler
 * @param {Function} handler - The original API handler
 * @param {Object} options - Rate limiting options
 * @returns {Function} - Enhanced handler with rate limiting
 */
export function withRateLimit(handler, options = {}) {
  return async (request, ...args) => {
    const result = await rateLimit(request, options);
    
    if (result.limited) {
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': String(result.limit),
            'X-RateLimit-Remaining': String(result.remaining),
            'X-RateLimit-Reset': String(result.reset),
          }
        }
      );
    }
    
    // Add rate limit headers to the response
    const response = await handler(request, ...args);
    
    // Handle both Response and NextResponse objects
    if (response instanceof Response) {
      response.headers.set('X-RateLimit-Limit', String(result.limit));
      response.headers.set('X-RateLimit-Remaining', String(result.remaining));
      response.headers.set('X-RateLimit-Reset', String(result.reset));
    }
    
    return response;
  };
}