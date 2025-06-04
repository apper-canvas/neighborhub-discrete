import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = ({ onNewPost, currentUser }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [attachedMedia, setAttachedMedia] = useState([])
  const [isPosting, setIsPosting] = useState(false)

  const categories = [
    { id: 'announcement', label: 'Announcement', icon: 'Megaphone', color: 'bg-blue-100 text-blue-700' },
    { id: 'event', label: 'Event', icon: 'Calendar', color: 'bg-green-100 text-green-700' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench', color: 'bg-orange-100 text-orange-700' },
    { id: 'community', label: 'Community', icon: 'Users', color: 'bg-purple-100 text-purple-700' },
    { id: 'general', label: 'General', icon: 'MessageCircle', color: 'bg-gray-100 text-gray-700' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!postContent.trim()) {
      toast.error('Please write something to share!')
      return
    }

    setIsPosting(true)
    
    try {
      const mediaUrls = attachedMedia.map((_, index) => 
        `https://images.unsplash.com/photo-${1500000000 + index}?w=400&h=300&fit=crop`
      )

      await onNewPost({
        content: postContent.trim(),
        category: selectedCategory || 'general',
        media: mediaUrls
      })

      // Reset form
      setPostContent('')
      setSelectedCategory('')
      setAttachedMedia([])
      setIsCreating(false)
      
    } catch (error) {
      toast.error('Failed to create post')
    } finally {
      setIsPosting(false)
    }
  }

  const handleMediaAttach = () => {
    if (attachedMedia.length < 4) {
      setAttachedMedia(prev => [...prev, { id: Date.now(), type: 'image' }])
      toast.success('Image attached!')
    } else {
      toast.warning('Maximum 4 images allowed')
    }
  }

  const removeMedia = (id) => {
    setAttachedMedia(prev => prev.filter(media => media.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-card border border-surface-200 overflow-hidden"
    >
      {/* Post Creator Header */}
      <div className="p-6 border-b border-surface-100">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser?.profilePicture}
            alt={currentUser?.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
          />
          
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="flex-1 text-left px-4 py-3 bg-surface-50 hover:bg-surface-100 rounded-xl text-surface-600 hover:text-surface-900 transition-colors"
            >
              What's happening in our community, {currentUser?.name?.split(' ')[0]}?
            </button>
          ) : (
            <div className="flex-1">
              <h3 className="font-semibold text-surface-900 mb-1">Share with Community</h3>
              <p className="text-sm text-surface-600">Post updates, announcements, or start conversations</p>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Post Creator */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-3">
                  Post Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-xl border-2 transition-all ${
                        selectedCategory === category.id
                          ? 'border-primary bg-primary/5 shadow-lg scale-105'
                          : 'border-surface-200 hover:border-surface-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                        <ApperIcon name={category.icon} size={16} />
                      </div>
                      <span className="text-xs font-medium text-surface-700">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share what's on your mind..."
                  rows={4}
                  className="w-full px-4 py-3 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  disabled={isPosting}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-surface-500">
                    {postContent.length}/500 characters
                  </span>
                  {postContent.length > 450 && (
                    <span className="text-sm text-accent">Almost at limit</span>
                  )}
                </div>
              </div>

              {/* Media Attachments */}
              {attachedMedia.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Attached Images
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {attachedMedia.map((media, index) => (
                      <motion.div
                        key={media.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000 + index}?w=200&h=150&fit=crop`}
                          alt=""
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia(media.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ApperIcon name="X" size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={handleMediaAttach}
                    disabled={attachedMedia.length >= 4}
                    className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary-dark hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ApperIcon name="ImagePlus" size={16} />
                    <span className="text-sm font-medium">Photo</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-secondary-dark hover:bg-secondary/5 rounded-lg transition-colors"
                  >
                    <ApperIcon name="MapPin" size={16} />
                    <span className="text-sm font-medium">Location</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false)
                      setPostContent('')
                      setSelectedCategory('')
                      setAttachedMedia([])
                    }}
                    className="px-4 py-2 text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!postContent.trim() || isPosting}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2 rounded-lg font-medium btn-hover shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isPosting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Send" size={16} />
                        <span>Share Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions (when not creating) */}
      {!isCreating && (
        <div className="px-6 pb-6">
          <div className="flex justify-between">
            <button
              onClick={handleMediaAttach}
              className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary-dark hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ApperIcon name="ImagePlus" size={16} />
              <span className="text-sm font-medium">Photo</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-secondary-dark hover:bg-secondary/5 rounded-lg transition-colors">
              <ApperIcon name="Calendar" size={16} />
              <span className="text-sm font-medium">Event</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-accent hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
              <ApperIcon name="Megaphone" size={16} />
              <span className="text-sm font-medium">Announce</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default MainFeature