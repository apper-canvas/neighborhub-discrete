import { motion } from 'framer-motion'
import PostAuthorInfo from '../molecules/PostAuthorInfo'
import CategoryBadge from '../molecules/CategoryBadge'
import PostMedia from '../molecules/PostMedia'
import PostActions from '../molecules/PostActions'
import Text from '../atoms/Text'

const PostCard = ({ post, currentUser, onReaction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: post.delay || 0 }}
      className="bg-white rounded-2xl shadow-card border border-surface-200 overflow-hidden card-hover"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <PostAuthorInfo
            authorName="Community Member" // This was hardcoded in original Home.jsx
            timestamp={post.timestamp}
            authorProfilePic={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`} // Hardcoded in original Home.jsx
          />
          {post.category && <CategoryBadge category={post.category} />}
        </div>

        <div className="mb-4">
          <Text type="p" className="text-surface-800 leading-relaxed">{post.content}</Text>
        </div>

        <PostMedia mediaUrls={post.media} />

        <PostActions
          reactions={post.reactions}
          commentsCount={post.comments?.length}
          onReact={onReaction}
          currentUser={currentUser}
          postId={post.id}
        />
      </div>
    </motion.div>
  )
}

export default PostCard