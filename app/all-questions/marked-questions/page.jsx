"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Calendar, Bookmark, CheckCircle, X, Trash2, Check, ExternalLink, Edit, Eye } from 'lucide-react';

// LoadingBar component
function LoadingBar({ isLoading }) {
  return (
    <div className={`fixed top-0 left-0 w-full h-1 z-50 transition-all duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className={`h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 ${isLoading ? 'animate-loading-bar' : ''}`}
      ></div>
    </div>
  );
}

// Format dates consistently to avoid hydration errors
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

// Edit Dialog Component
function EditDialog({ isOpen, onClose, onSubmit, reviewQuestion }) {
  const [formData, setFormData] = useState({
    questionNo: '',
    questionName: '',
    solvingPlatform: '',
    platformQsnNo: '',
    note: ''
  });

  useEffect(() => {
    if (reviewQuestion) {
      setFormData({
        questionNo: reviewQuestion.questionNo || '',
        questionName: reviewQuestion.questionName || '',
        solvingPlatform: reviewQuestion.solvingPlatform || '',
        platformQsnNo: reviewQuestion.platformQsnNo || '',
        note: reviewQuestion.note || ''
      });
    }
  }, [reviewQuestion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Edit Marked Question</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="questionNo" className="block text-sm text-gray-300 mb-1.5">
                Question Number <span className="text-red-400">*</span>
              </label>
              <input
                id="questionNo"
                name="questionNo"
                type="number"
                required
                value={formData.questionNo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question number"
              />
            </div>
            
            <div>
              <label htmlFor="questionName" className="block text-sm text-gray-300 mb-1.5">
                Question Name <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="questionName"
                name="questionName"
                type="text"
                value={formData.questionName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question name"
              />
            </div>
            
            <div>
              <label htmlFor="solvingPlatform" className="block text-sm text-gray-300 mb-1.5">
                Solving Platform <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="solvingPlatform"
                name="solvingPlatform"
                type="text"
                value={formData.solvingPlatform}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., LeetCode, HackerRank"
              />
            </div>
            
            <div>
              <label htmlFor="platformQsnNo" className="block text-sm text-gray-300 mb-1.5">
                Platform Question No. <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="platformQsnNo"
                name="platformQsnNo"
                type="text"
                value={formData.platformQsnNo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Platform's question number"
              />
            </div>
            
            <div>
              <label htmlFor="note" className="block text-sm text-gray-300 mb-1.5">
                Note <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Add any notes about this question"
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-lg flex items-center justify-center"
              >
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Confirm Delete Dialog
function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MarkedQuestionsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterReviewed, setFilterReviewed] = useState('all'); // 'all', 'reviewed', 'not-reviewed'

  // Fetch marked questions on component mount
  useEffect(() => {
    fetchReviewQuestions();
  }, []);

  // Function to fetch all review questions
  const fetchReviewQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reviewQuestions');
      if (response.ok) {
        const data = await response.json();
        setReviewQuestions(data.data);
      } else {
        console.error('Failed to fetch review questions');
      }
    } catch (error) {
      console.error('Error fetching review questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle navigation with loading state
  const handleNavigation = (path) => {
    setIsLoading(true);
    router.push(path);
  };

  // Handle edit question
  const handleEditQuestion = (question) => {
    setCurrentQuestion(question);
    setIsEditDialogOpen(true);
  };

  // Handle delete question confirmation
  const handleDeletePrompt = (question) => {
    setCurrentQuestion(question);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete question
  const handleDeleteQuestion = async () => {
    if (!currentQuestion) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/reviewQuestions?id=${currentQuestion._id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove the deleted question from state
        setReviewQuestions(prevQuestions => 
          prevQuestions.filter(q => q._id !== currentQuestion._id)
        );
        setIsDeleteDialogOpen(false);
      } else {
        console.error('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (formData) => {
    if (!currentQuestion) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/reviewQuestions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: currentQuestion._id,
          ...formData
        }),
      });
      
      if (response.ok) {
        const { data } = await response.json();
        // Update the edited question in state
        setReviewQuestions(prevQuestions => 
          prevQuestions.map(q => q._id === data._id ? data : q)
        );
        setIsEditDialogOpen(false);
      } else {
        console.error('Failed to update question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggle reviewed status
  const handleToggleReviewed = async (question) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reviewQuestions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: question._id,
          reviewed: !question.reviewed
        }),
      });
      
      if (response.ok) {
        const { data } = await response.json();
        // Update the question in state
        setReviewQuestions(prevQuestions => 
          prevQuestions.map(q => q._id === data._id ? data : q)
        );
      } else {
        console.error('Failed to update review status');
      }
    } catch (error) {
      console.error('Error updating review status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter questions based on search query and review status
  const filteredQuestions = reviewQuestions.filter(question => {
    // First apply search filter
    const matchesSearch = 
      question.questionNo.toString().includes(searchQuery) ||
      (question.questionName && question.questionName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (question.note && question.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (question.solvingPlatform && question.solvingPlatform.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Then apply reviewed status filter
    if (filterReviewed === 'all') {
      return matchesSearch;
    } else if (filterReviewed === 'reviewed') {
      return matchesSearch && question.reviewed;
    } else if (filterReviewed === 'not-reviewed') {
      return matchesSearch && !question.reviewed;
    }
    
    return matchesSearch;
  });

  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen">
      <LoadingBar isLoading={isLoading} />
      
      <EditDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        reviewQuestion={currentQuestion}
      />
      
      <ConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteQuestion}
        title="Delete Marked Question"
        message="Are you sure you want to delete this marked question? This action cannot be undone."
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with back button and search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <div className="inline-block mb-4 md:mb-5 bg-blue-600/10 rounded-xl hover:bg-blue-600/20 transition-all duration-300">
              <button 
                onClick={() => handleNavigation('/all-questions')} 
                className="flex items-center px-5 py-2.5 text-blue-400 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Problems
              </button>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Marked Questions</h1>
            <p className="text-gray-400">Track and review questions you've marked for further study</p>
          </div>
          
          {/* Search box */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search marked questions..."
              className="pl-10 pr-4 py-3 w-full md:w-96 bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="flex mb-6 space-x-2 bg-gray-800/70 backdrop-blur-sm p-1 rounded-xl shadow-lg w-fit">
          <button 
            onClick={() => setFilterReviewed('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterReviewed === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-transparent text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Questions
          </button>
          <button 
            onClick={() => setFilterReviewed('not-reviewed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterReviewed === 'not-reviewed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-transparent text-gray-300 hover:bg-gray-700'
            }`}
          >
            Not Reviewed
          </button>
          <button 
            onClick={() => setFilterReviewed('reviewed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterReviewed === 'reviewed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-transparent text-gray-300 hover:bg-gray-700'
            }`}
          >
            Reviewed
          </button>
        </div>
        
        {reviewQuestions.length === 0 ? (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-purple-600/30 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Marked Questions</h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">You haven't marked any questions for review yet.</p>
            <button 
              onClick={() => handleNavigation('/questions')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium shadow-lg"
            >
              Go to All Problems
            </button>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-gray-700/50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Matching Questions</h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">No questions match your current search or filter criteria.</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterReviewed('all');
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 mb-10">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-10 gap-4 bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl border border-gray-700 text-gray-300 font-medium shadow-lg">
              <div className="col-span-1">Q.No</div>
              <div className="col-span-2">Question Name</div>
              <div className="col-span-1">Platform</div>
              <div className="col-span-1">Qsn No.</div>
              <div className="col-span-3">Notes</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
            
            {/* Question Items */}
            {filteredQuestions.map((question) => (
              <div 
                key={question._id}
                className="grid grid-cols-1 md:grid-cols-10 gap-4 bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg"
              >
                {/* Mobile View - Card Layout */}
                <div className="md:hidden space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Question #{question.questionNo}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleReviewed(question);
                        }}
                        className={`p-2 rounded-lg ${
                          question.reviewed 
                            ? 'bg-green-900/40 text-green-400 hover:bg-green-900/60' 
                            : 'bg-amber-900/40 text-amber-400 hover:bg-amber-900/60'
                        } transition-colors`}
                        title={question.reviewed ? "Mark as Not Reviewed" : "Mark as Reviewed"}
                      >
                        {question.reviewed ? <CheckCircle className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {question.questionName && (
                    <div className="text-white font-medium">{question.questionName}</div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {question.solvingPlatform && (
                      <span className="px-3 py-1 bg-gray-700/70 rounded-lg text-sm text-gray-300">
                        {question.solvingPlatform} {question.platformQsnNo && `#${question.platformQsnNo}`}
                      </span>
                    )}
                    
                    <span className={`px-3 py-1 rounded-lg text-sm ${
                      question.reviewed 
                        ? 'bg-green-900/40 text-green-400' 
                        : 'bg-amber-900/40 text-amber-400'
                    }`}>
                      {question.reviewed ? 'Reviewed' : 'Not Reviewed'}
                    </span>
                  </div>
                  
                  {question.note && (
                    <div className="bg-gray-900/70 p-3 rounded-lg text-gray-300 text-sm">
                      {question.note}
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleEditQuestion(question)}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center text-sm"
                    >
                      <Edit className="h-4 w-4 mr-1.5" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePrompt(question)}
                      className="px-3 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-lg transition-colors flex items-center text-sm"
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Desktop View - Table Layout */}
                <div className="hidden md:block col-span-1 text-white font-medium">{question.questionNo}</div>
                <div className="hidden md:block col-span-2 text-white break-words">
                  {question.questionName || <span className="text-gray-500 italic">Not specified</span>}
                </div>
                <div className="hidden md:block col-span-1 text-gray-300">
                  {question.solvingPlatform || <span className="text-gray-500 italic">-</span>}
                </div>
                <div className="hidden md:block col-span-1 text-gray-300">
                  {question.platformQsnNo || <span className="text-gray-500 italic">-</span>}
                </div>
                <div className="hidden md:block col-span-3 text-gray-300 break-words">
                  {question.note || <span className="text-gray-500 italic">No notes</span>}
                </div>
                <div className="hidden md:flex col-span-1 justify-center">
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    question.reviewed 
                      ? 'bg-green-900/40 text-green-400' 
                      : 'bg-amber-900/40 text-amber-400'
                  }`}>
                    {question.reviewed ? 'Reviewed' : 'Not Reviewed'}
                  </span>
                </div>
                <div className="hidden md:flex col-span-1 gap-2 justify-center">
                  <button 
                    onClick={() => handleToggleReviewed(question)}
                    className={`p-2 rounded-lg ${
                      question.reviewed 
                        ? 'bg-green-900/40 text-green-400 hover:bg-green-900/60' 
                        : 'bg-amber-900/40 text-amber-400 hover:bg-amber-900/60'
                    } transition-colors`}
                    title={question.reviewed ? "Mark as Not Reviewed" : "Mark as Reviewed"}
                  >
                    {question.reviewed ? <CheckCircle className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={() => handleEditQuestion(question)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    title="Edit Question"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePrompt(question)}
                    className="p-2 bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-lg transition-colors"
                    title="Delete Question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer / Pagination could be added here */}
        <div className="py-4 text-center text-gray-400 text-sm">
          {filteredQuestions.length > 0 && (
            <p>Showing {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}</p>
          )}
        </div>
      </div>
      
      {/* Add custom CSS for the loading bar animation */}
      <style jsx global>{`
        @keyframes loading {
          0% { width: 0%; }
          20% { width: 20%; }
          40% { width: 40%; }
          60% { width: 60%; }
          80% { width: 80%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading 1.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}