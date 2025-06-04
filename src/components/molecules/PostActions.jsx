import AppIcon from '../atoms/AppIcon'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

const PostActions = ({ reactions, commentsCount, onReact, currentUser, postId }) => {
  const reactionTypes = ['Heart', 'ThumbsUp', 'Smile']

  return (
    <div className="flex items-center justify-between pt-4 border-t border-surface-100">
      <div className="flex items-center space-x-4">
        {reactionTypes.map((reactionType) => {
          const reactionCount = reactions?.filter(r => r.type === reactionType).length || 0
          const userReacted = reactions?.some(r => r.userId === currentUser.id && r.type === reactionType)

          return (
            <Button
              key={reactionType}
              onClick={() => onReact(postId, reactionType)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                userReacted
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-surface-100 text-surface-600'
              }`}
              icon={AppIcon}
              iconProps={{ name: reactionType, size: 16 }}
            >
              {reactionCount > 0 && <Text type="span" className="text-sm">{reactionCount}</Text>}
            </Button>
          )
        })}
      </div>

      <div className="flex items-center space-x-4 text-surface-500">
        <Button className="flex items-center space-x-1 hover:text-primary transition-colors" icon={AppIcon} iconProps={{ name: "MessageCircle", size: 16 }}>
          <Text type="span" className="text-sm">{commentsCount || 0}</Text>
        </Button>
        <Button className="flex items-center space-x-1 hover:text-primary transition-colors" icon={AppIcon} iconProps={{ name: "Share2", size: 16 }} />
      </div>
    </div>
  )
}

export default PostActions