import ProfilePicture from '../atoms/ProfilePicture'
import Text from '../atoms/Text'

const PostAuthorInfo = ({ authorName, timestamp, authorProfilePic }) => {
  return (
    <div className="flex items-center space-x-3">
      <ProfilePicture src={authorProfilePic} alt={authorName} size="md" className="!w-10 !h-10" />
      <div>
        <Text type="div" className="font-semibold text-surface-900">{authorName}</Text>
        <Text type="div" className="text-sm text-surface-500">
          {new Date(timestamp).toLocaleDateString()}
        </Text>
      </div>
    </div>
  )
}

export default PostAuthorInfo