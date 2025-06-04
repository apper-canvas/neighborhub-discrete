import { motion } from 'framer-motion'

const Button = ({ children, onClick, className, type = 'button', disabled, icon: Icon, iconSize = 16, iconClass, ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon name={Icon.name || ''} size={iconSize} className={iconClass} />}
      {children}
    </motion.button>
  )
}

export default Button