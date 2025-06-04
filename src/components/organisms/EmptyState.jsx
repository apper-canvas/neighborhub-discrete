import AppIcon from '../atoms/AppIcon'
import Text from '../atoms/Text'

const EmptyState = ({ icon, message, className }) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <AppIcon name={icon} size={48} className="text-surface-400 mx-auto mb-4" />
      <Text type="p" className="text-surface-600">{message}</Text>
    </div>
  )
}

export default EmptyState