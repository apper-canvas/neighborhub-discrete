import { motion } from 'framer-motion'
import AppIcon from '../atoms/AppIcon'
import Text from '../atoms/Text'

const NavbarLink = ({ icon, label, active, onClick, delayIndex }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delayIndex * 0.05 }}
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
          : 'text-surface-700 hover:bg-surface-100 hover:text-surface-900'
      }`}
    >
      <AppIcon name={icon} size={18} />
      <Text type="span" className="font-medium">{label}</Text>
    </motion.button>
  )
}

export default NavbarLink