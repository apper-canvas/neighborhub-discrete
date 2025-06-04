import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import { postService } from '../services'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser] = useState({
    id: '1',
    name: 'Sarah Johnson',
    flatNumber: 'A-204',
    role: 'Resident',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face'
  })

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      try {
        const result = await postService.getAll()
        setPosts(result)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load community posts')
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const handleNewPost = async (postData) => {
    try {
      const newPost = await postService.create({
        ...postData,
        authorId: currentUser.id,
        timestamp: new Date().toISOString(),
        reactions: [],
        comments: []
      })
      setPosts(prev => [newPost, ...prev])
      toast.success('Post shared with community!')
    } catch (err) {
      toast.error('Failed to create post')
    }
  }

  const handleReaction = async (postId, reactionType) => {
    try {
      const post = posts.find(p => p.id === postId)
      const existingReaction = post?.reactions?.find(r => r.userId === currentUser.id)
      
      let updatedReactions = post?.reactions || []
      
      if (existingReaction) {
        if (existingReaction.type === reactionType) {
          updatedReactions = updatedReactions.filter(r => r.userId !== currentUser.id)
        } else {
          updatedReactions = updatedReactions.map(r => 
            r.userId === currentUser.id ? { ...r, type: reactionType } : r
          )
        }
      } else {
        updatedReactions.push({
          userId: currentUser.id,
          type: reactionType,
          timestamp: new Date().toISOString()
        })
      }

      await postService.update(postId, { reactions: updatedReactions })
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, reactions: updatedReactions } : p
      ))
    } catch (err) {
      toast.error('Failed to update reaction')
    }
  }

  const navigationItems = [
    { icon: 'Home', label: 'Community Feed', active: true },
    { icon: 'Calendar', label: 'Events' },
    { icon: 'Users', label: 'Residents' },
    { icon: 'MessageCircle', label: 'Messages' },
    { icon: 'Bell', label: 'Announcements' },
    { icon: 'FileText', label: 'Complaints' },
    { icon: 'CreditCard', label: 'Payments' },
    { icon: 'Shield', label: 'Security' },
    { icon: 'Settings', label: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-surface-200 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
            >
              <ApperIcon name="Menu" size={20} />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <ApperIcon name="Home" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text hidden sm:block">NeighborHub</h1>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search community..."
                className="w-full pl-10 pr-4 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ApperIcon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-medium text-white">3</span>
            </button>
            
            <div className="flex items-center space-x-2 pl-2">
              <img
                src={currentUser.profilePicture}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="hidden sm:block text-sm">
                <div className="font-medium text-surface-900">{currentUser.name}</div>
                <div className="text-surface-500">{currentUser.flatNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className={`fixed top-16 left-0 w-72 h-full bg-white/95 backdrop-blur-md border-r border-surface-200 z-40 lg:translate-x-0 lg:static lg:z-auto transition-transform duration-300 lg:duration-0`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
            <img
              src={currentUser.profilePicture}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div>
              <div className="font-semibold text-surface-900">{currentUser.name}</div>
              <div className="text-sm text-surface-600">{currentUser.flatNumber}</div>
              <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full mt-1">
                {currentUser.role}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  item.active 
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg' 
                    : 'text-surface-700 hover:bg-surface-100 hover:text-surface-900'
                }`}
              >
                <ApperIcon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-72'} pt-16`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MainFeature onNewPost={handleNewPost} currentUser={currentUser} />

          {/* Posts Feed */}
          <div className="mt-8 space-y-6">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-surface-600">Loading community posts...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
                <p className="text-error">{error}</p>
              </div>
            )}

            {!loading && !error && posts?.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="MessageSquare" size={48} className="text-surface-400 mx-auto mb-4" />
                <p className="text-surface-600">No posts yet. Be the first to share something!</p>
              </div>
            )}

            <AnimatePresence>
              {posts?.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-card border border-surface-200 overflow-hidden card-hover"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`}
                          alt="Author"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-surface-900">Community Member</div>
                          <div className="text-sm text-surface-500">
                            {new Date(post.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {post.category && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {post.category}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-surface-800 leading-relaxed">{post.content}</p>
                    </div>

                    {post.media && post.media.length > 0 && (
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        {post.media.slice(0, 4).map((mediaUrl, idx) => (
                          <img
                            key={idx}
                            src={mediaUrl}
                            alt=""
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                      <div className="flex items-center space-x-4">
                        {['Heart', 'ThumbsUp', 'Smile'].map((reactionType) => {
                          const reactionCount = post.reactions?.filter(r => r.type === reactionType).length || 0
                          const userReacted = post.reactions?.some(r => r.userId === currentUser.id && r.type === reactionType)
                          
                          return (
                            <button
                              key={reactionType}
                              onClick={() => handleReaction(post.id, reactionType)}
                              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                                userReacted 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-surface-100 text-surface-600'
                              }`}
                            >
                              <ApperIcon name={reactionType} size={16} />
                              {reactionCount > 0 && <span className="text-sm">{reactionCount}</span>}
                            </button>
                          )
                        })}
                      </div>

                      <div className="flex items-center space-x-4 text-surface-500">
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <ApperIcon name="MessageCircle" size={16} />
                          <span className="text-sm">{post.comments?.length || 0}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <ApperIcon name="Share2" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home