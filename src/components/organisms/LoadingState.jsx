import Text from '../atoms/Text'

const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="text-center py-8">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
      <Text type="p" className="text-surface-600">{message}</Text>
    </div>
  )
}

export default LoadingState