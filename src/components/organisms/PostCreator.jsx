import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ProfilePicture from '../atoms/ProfilePicture'
import Button from '../atoms/Button'
import AppIcon from '../atoms/AppIcon'
import Text from '../atoms/Text'
import CategorySelector from '../molecules/CategorySelector'
import FormField from '../molecules/FormField'
import MediaAttachmentInput from '../molecules/MediaAttachmentInput'

const PostCreator = ({ onNewPost, currentUser }) => {
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
    const MAX_MEDIA = 4
    if (attachedMedia.length < MAX_MEDIA) {
      setAttachedMedia(prev => [...prev, { id: Date.now(), type: 'image' }])
      toast.success('Image attached!')
    } else {
      toast.warning(`Maximum ${MAX_MEDIA} images allowed`)
    }
  }

  const removeMedia = (id) => {
    setAttachedMedia(prev => prev.filter(media => media.id !== id))
  }

  const handleCancel = () => {
    setIsCreating(false)
    setPostContent('')
    setSelectedCategory('')
    setAttachedMedia([])
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
          <ProfilePicture src={currentUser?.profilePicture} alt={currentUser?.name} size="lg" />

          {!isCreating ? (
            <Button
              onClick={() => setIsCreating(true)}
              className="flex-1 text-left px-4 py-3 bg-surface-50 hover:bg-surface-100 rounded-xl text-surface-600 hover:text-surface-900 transition-colors"
            >
              What's happening in our community, {currentUser?.name?.split(' ')[0]}?
            </Button>
          ) : (
            <div className="flex-1">
              <Text type="h3" className="font-semibold text-surface-900 mb-1">Share with Community</Text>
              <Text type="p" className="text-sm text-surface-600">Post updates, announcements, or start conversations</Text>
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
                <FormField
                  label="Post Category"
                  id="post-category"
                  type="custom" // Indicate custom rendering for category selector
                />
                <CategorySelector
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>

              {/* Content Input */}
              <FormField
                label="Your Message"
                id="post-content"
                type="textarea"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share what's on your mind..."
                rows={4}
                disabled={isPosting}
                showCharacterCount
                maxLength={500}
                limitWarningThreshold={50}
              />

              {/* Media Attachments */}
              <MediaAttachmentInput
                attachedMedia={attachedMedia}
                onAddMedia={handleMediaAttach}
                onRemoveMedia={removeMedia}
                maxMedia={4}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    onClick={handleMediaAttach}
                    disabled={attachedMedia.length >= 4}
                    className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary-dark hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    icon={AppIcon}
                    iconProps={{ name: "ImagePlus", size: 16 }}
                  >
                    <Text type="span" className="text-sm font-medium">Photo</Text>
                  </Button>

                  <Button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-secondary-dark hover:bg-secondary/5 rounded-lg transition-colors"
                    icon={AppIcon}
                    iconProps={{ name: "MapPin", size: 16 }}
                  >
                    <Text type="span" className="text-sm font-medium">Location</Text>
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-colors"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={!postContent.trim() || isPosting}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2 rounded-lg font-medium btn-hover shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    icon={AppIcon}
                    iconProps={{ name: "Send", size: 16, className: 'text-white' }}
                  >
                    {isPosting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <AppIcon name="Send" size={16} className='text-white' />
                        <span>Share Post</span>
                      </>
                    )}
                  </Button>
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
            <Button
              onClick={handleMediaAttach}
              className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary-dark hover:bg-primary/5 rounded-lg transition-colors"
              icon={AppIcon}
              iconProps={{ name: "ImagePlus", size: 16 }}
            >
              <Text type="span" className="text-sm font-medium">Photo</Text>
            </Button>

            <Button className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-secondary-dark hover:bg-secondary/5 rounded-lg transition-colors" icon={AppIcon} iconProps={{ name: "Calendar", size: 16 }}>
              <Text type="span" className="text-sm font-medium">Event</Text>
            </Button>

            <Button className="flex items-center space-x-2 px-4 py-2 text-accent hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors" icon={AppIcon} iconProps={{ name: "Megaphone", size: 16 }}>
              <Text type="span" className="text-sm font-medium">Announce</Text>
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default PostCreator