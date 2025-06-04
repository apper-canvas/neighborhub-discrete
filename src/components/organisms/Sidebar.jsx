import { motion } from 'framer-motion'
import ProfileInfo from '../molecules/ProfileInfo'
import NavbarLink from '../molecules/NavbarLink'

const Sidebar = ({ currentUser, navigationItems, isOpen }) => {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      className={`fixed top-16 left-0 w-72 h-full bg-white/95 backdrop-blur-md border-r border-surface-200 z-40 lg:translate-x-0 lg:static lg:z-auto transition-transform duration-300 lg:duration-0`}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
          <ProfileInfo currentUser={currentUser} showRole={true} size="lg" />
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item, index) => (
            <NavbarLink
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={item.active}
              delayIndex={index}
            />
          ))}
        </nav>
      </div>
    </motion.aside>
  )
}

export default Sidebar