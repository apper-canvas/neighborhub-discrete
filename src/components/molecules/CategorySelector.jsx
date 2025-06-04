import Button from '../atoms/Button'
import AppIcon from '../atoms/AppIcon'
import Text from '../atoms/Text'

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          type="button"
          onClick={() => onSelectCategory(category.id)}
          className={`flex flex-col items-center space-y-2 p-3 rounded-xl border-2 transition-all ${
            selectedCategory === category.id
              ? 'border-primary bg-primary/5 shadow-lg scale-105'
              : 'border-surface-200 hover:border-surface-300 hover:shadow-md'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
            <AppIcon name={category.icon} size={16} />
          </div>
          <Text type="span" className="text-xs font-medium text-surface-700">{category.label}</Text>
        </Button>
      ))}
    </div>
  )
}

export default CategorySelector