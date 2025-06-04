import AppIcon from '../atoms/AppIcon'
import Input from '../atoms/Input'

const SearchBar = ({ placeholder = 'Search...', value, onChange }) => {
  return (
    <div className="relative w-full">
      <AppIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      />
    </div>
  )
}

export default SearchBar