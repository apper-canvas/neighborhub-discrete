import Text from '../atoms/Text'

const CategoryBadge = ({ category }) => {
  return (
    <Text type="span" className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
      {category}
    </Text>
  )
}

export default CategoryBadge