import ProfilePicture from '../atoms/ProfilePicture'
import Text from '../atoms/Text'

const ProfileInfo = ({ user, showRole = false, className, size = 'md' }) => {
  if (!user) return null

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <ProfilePicture src={user.profilePicture} alt={user.name} size={size} />
      <div>
        <Text type="div" className="font-semibold text-surface-900">{user.name}</Text>
        <Text type="div" className="text-sm text-surface-600">{user.flatNumber}</Text>
        {showRole && (
          <Text type="span" className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full mt-1">
            {user.role}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo