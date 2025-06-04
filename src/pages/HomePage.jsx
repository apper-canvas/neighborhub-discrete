import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { postService } from '../services'
import PageLayout from '../components/templates/PageLayout'
import CommunityFeedTemplate from '../components/templates/CommunityFeedTemplate'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
    <PageLayout currentUser={currentUser} navigationItems={navigationItems}>
      <CommunityFeedTemplate
        posts={posts}
        loading={loading}
        error={error}
        currentUser={currentUser}
        onNewPost={handleNewPost}
        onReaction={handleReaction}
      />
    </PageLayout>
  )
}

export default HomePage