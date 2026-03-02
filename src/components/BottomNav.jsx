import { useApp } from '../context/AppContext'
import { Home, BookOpen, Calendar, User, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BottomNav() {
    const { activePage, setActivePage } = useApp()

    const navs = [
        { id: 'mobile-home', icon: Home, label: 'Home' },
        { id: 'mobile-learning', icon: BookOpen, label: 'Learning' },
        { id: 'mobile-canteen', icon: UtensilsCrossed, label: 'Food' },
        { id: 'mobile-schedule', icon: Calendar, label: 'Schedule' },
        { id: 'mobile-profile', icon: User, label: 'Profile' },
    ]

    return (
        <nav className="bottom-nav">
            {navs.map((n) => {
                const Icon = n.icon
                const isActive = activePage === n.id
                return (
                    <button
                        key={n.id}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setActivePage(n.id)}
                    >
                        <div className="nav-icon-bg">
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <motion.span
                            initial={false}
                            animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.9 }}
                            className="nav-label"
                        >
                            {n.label}
                        </motion.span>
                    </button>
                )
            })}
        </nav>
    )
}
