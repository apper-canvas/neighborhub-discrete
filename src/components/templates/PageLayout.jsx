import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TopNavbar from '../organisms/TopNavbar'
import Sidebar from '../organisms/Sidebar'
import Text from '../atoms/Text'

const PageLayout = ({ currentUser, navigationItems, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      <TopNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} currentUser={currentUser} />
      
      <div className="flex h-screen pt-16">
        {/* Sidebar Overlay for Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <Sidebar currentUser={currentUser} navigationItems={navigationItems} isOpen={sidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="min-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout