import React from 'react'
import { useApp } from '../context/AppContext'
import {
    Home, BookOpen, Utensils, Calendar, User,
    LogOut, GraduationCap, ChevronRight, CheckSquare
} from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
    { id: 'mobile-home', icon: Home, label: 'Dashboard' },
    { id: 'mobile-learning', icon: BookOpen, label: 'Learning Hub' },
    { id: 'mobile-homework', icon: CheckSquare, label: 'Homework' },
    { id: 'mobile-canteen', icon: Utensils, label: 'Cafeteria' },
    { id: 'mobile-schedule', icon: Calendar, label: 'Schedule' },
    { id: 'mobile-profile', icon: User, label: 'My Profile' },
]

export default function DesktopSidebar() {
    const { activePage, setActivePage, logout, user, xp, level } = useApp()

    if (activePage === 'login' || activePage === 'course-player') return null

    return (
        <aside className="desktop-sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <GraduationCap size={24} color="#fff" />
                </div>
                <div className="sidebar-brand">
                    <h3>Amalorpavam</h3>
                    <span>Student Portal</span>
                </div>
            </div>

            <div className="sidebar-user-mini">
                <div className="mini-avatar">{user?.avatar || '🎓'}</div>
                <div className="mini-info">
                    <h4>{user?.name || 'Student'}</h4>
                    <span className="mini-xp">Level {level} · {xp} XP</span>
                </div>
            </div>

            <nav className="sidebar-nav-main">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`sidebar-nav-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => setActivePage(item.id)}
                    >
                        <item.icon size={20} className="nav-icon" />
                        <span>{item.label}</span>
                        {activePage === item.id && (
                            <motion.div
                                layoutId="active-pill"
                                className="active-indicator"
                            />
                        )}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-nav-item logout-btn" onClick={logout}>
                    <LogOut size={20} className="nav-icon" />
                    <span>Sign Out</span>
                </button>

                <div className="sidebar-version">
                    v4.0 PRO READY
                </div>
            </div>
        </aside>
    )
}
