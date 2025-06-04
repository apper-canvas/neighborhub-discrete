import AppIcon from '../atoms/AppIcon'
import Text from '../atoms/Text'

const NotificationBadge = ({ count }) => {
  return (
    <button className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors">
      <AppIcon name="Bell" size={20} />
      {count > 0 && (
        <Text type="span" className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-medium text-white">
          {count}
        </Text>
      )}
    </button>
  )
}

export default NotificationBadge