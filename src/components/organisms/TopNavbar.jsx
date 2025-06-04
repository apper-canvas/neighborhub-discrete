import { motion } from 'framer-motion'
import AppIcon from '../atoms/AppIcon'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import SearchBar from '../molecules/SearchBar'
import NotificationBadge from '../molecules/NotificationBadge'
import ProfileInfo from '../molecules/ProfileInfo'

const TopNavbar = ({ onMenuToggle, currentUser }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-surface-200 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
            icon={AppIcon}
            iconProps={{ name: "Menu", size: 20 }}
          />

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <AppIcon name="Home" size={18} className="text-white" />
            </div>
            <Text type="h1" className="text-xl font-bold gradient-text hidden sm:block">NeighborHub</Text>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <SearchBar placeholder="Search community..." />
        </div>

        <div className="flex items-center space-x-3">
          <NotificationBadge count={3} />

          <div className="flex items-center space-x-2 pl-2">
            <ProfileInfo currentUser={currentUser} size="sm" className="!space-x-2" />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default TopNavbar