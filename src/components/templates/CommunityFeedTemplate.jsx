import { AnimatePresence } from 'framer-motion'
import PostCreator from '../organisms/PostCreator'
import PostCard from '../organisms/PostCard'
import LoadingState from '../organisms/LoadingState'
import EmptyState from '../organisms/EmptyState'
import AppIcon from '../atoms/AppIcon'
import Text from '../atoms/Text'

const CommunityFeedTemplate = ({
  posts,
  loading,
  error,
  currentUser,
  onNewPost,
  onReaction
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PostCreator onNewPost={onNewPost} currentUser={currentUser} />

      {/* Posts Feed */}
      <div className="mt-8 space-y-6">
        {loading && <LoadingState message="Loading community posts..." />}

        {error && (
          <div className="text-center py-8">
            <AppIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <Text type="p" className="text-error">{error}</Text>
          </div>
        )}

        {!loading && !error && posts?.length === 0 && (
          <EmptyState
            icon="MessageSquare"
            message="No posts yet. Be the first to share something!"
          />
        )}

        <AnimatePresence>
          {posts?.map((post, index) => (
            <PostCard
              key={post.id}
              post={{ ...post, delay: index * 0.1 }}
              currentUser={currentUser}
              onReaction={onReaction}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CommunityFeedTemplate