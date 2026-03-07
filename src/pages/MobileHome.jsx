import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import {
    Bell, Play, Calendar, CheckCircle2,
    Award, Utensils
} from 'lucide-react'

export default function MobileHome() {
    const { user, xp, level, streak, notifications, setActivePage, gainXp, attendance } = useApp()

    const nextLevelXp = 2000
    const progress = (xp / nextLevelXp) * 100

    // Filter unread or recent notifications
    const recentNotifs = notifications.slice(-3).reverse()
    const unreadCount = notifications.length

    // Calculate Attendance %
    const dates = Object.keys(attendance)
    let presentDays = 0
    let totalDays = 0
    dates.forEach(d => {
        if (attendance[d] && attendance[d][user?.roll]) {
            totalDays++
            if (attendance[d][user.roll] === 'Present') presentDays++
        }
    })
    const attendancePercent = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100

    return (
        <div className="mobile-page">
            {/* Premium Header */}
            <header className="mobile-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{
                            width: 54, height: 54, borderRadius: 18,
                            background: 'linear-gradient(135deg, #1E50E2, #6366F1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 24, boxShadow: '0 10px 20px rgba(30, 80, 226, 0.2)', color: 'white'
                        }}
                    >
                        {user?.avatar || '🎓'}
                    </motion.div>
                    <div>
                        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', margin: 0 }}>Hi, {user?.name?.split(' ')[0]}!</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                            <span style={{
                                background: '#1E50E2', color: 'white', fontSize: 10,
                                fontWeight: 900, padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase'
                            }}>Level {level}</span>
                            <span style={{ fontSize: 12, color: '#64748B', fontWeight: 700 }}>{streak} Day Streak 🔥</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActivePage('mobile-notifications')}
                        className="header-btn"
                        style={{ background: 'white', borderRadius: 16, border: '1px solid #F1F5F9', position: 'relative' }}
                    >
                        <Bell size={20} color="#0F172A" />
                        {unreadCount > 0 && <div className="notif-dot" style={{ background: '#EF4444' }} />}
                    </motion.button>
                </div>
            </header>

            {/* Attendance & Progress Stats */}
            <div className="stats-grid" style={{ marginBottom: 24 }}>
                <div className="premium-card" style={{ flex: 1, padding: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>My Attendance</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#0F172A' }}>{attendancePercent}%</div>
                    <div style={{ height: 4, background: '#F1F5F9', borderRadius: 2, marginTop: 12, overflow: 'hidden' }}>
                        <div style={{ width: `${attendancePercent}%`, height: '100%', background: '#10B981' }} />
                    </div>
                </div>
                <div className="premium-card" style={{ flex: 1, padding: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Total XP</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#1E50E2' }}>{xp}</div>
                    <div style={{ fontSize: 11, color: '#1E50E2', fontWeight: 800, marginTop: 8 }}>RANK #4 CLASS</div>
                </div>
            </div>

            {/* Broadcast / Recent Notif */}
            <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16, color: '#0F172A' }}>Official Alerts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {recentNotifs.length > 0 ? recentNotifs.map((n, i) => (
                        <div key={i} className="premium-card" style={{ padding: '16px 20px', borderLeft: '4px solid #1E50E2' }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div style={{ fontSize: 18 }}>{n.type === 'Syllabus' ? '📚' : n.type === 'Fee' ? '💰' : '🔔'}</div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>{n.title}</div>
                                    <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{n.message}</div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="premium-card" style={{ background: '#F8FAFC', padding: '16px 20px', textAlign: 'center' }}>
                            <p style={{ margin: 0, color: '#94A3B8', fontSize: 13, fontWeight: 600 }}>No new alerts today.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Launch */}
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16, color: '#0F172A' }}>Shortcuts</h3>
            <div className="stats-grid" style={{ marginBottom: 32 }}>
                {[
                    { id: 'mobile-learning', label: 'Learning', icon: Play, bg: '#E0E7FF', iconColor: '#4338CA' },
                    { id: 'mobile-homework', label: 'Homework', icon: CheckCircle2, bg: '#FCE7F3', iconColor: '#BE185D' },
                    { id: 'mobile-canteen', label: 'Canteen', icon: Utensils, bg: '#FFEDD5', iconColor: '#C2410C' },
                    { id: 'mobile-timetable', label: 'Schedule', icon: Calendar, bg: '#DCFCE7', iconColor: '#15803D' },
                ].map(item => (
                    <motion.div
                        key={item.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActivePage(item.id)}
                        className="premium-card"
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer', alignItems: 'center', padding: '16px' }}
                    >
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <item.icon size={22} color={item.iconColor} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>{item.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Daily Missions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0, color: '#0F172A' }}>Daily Goals</h3>
                <span style={{ fontSize: 12, color: '#1E50E2', fontWeight: 800 }}>View All</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                    { id: 1, task: 'Complete Unit Quiz', xp: 150, done: false },
                    { id: 2, task: 'Order Canteen Snack', xp: 50, done: true },
                    { id: 3, task: 'Check Weekly Timetable', xp: 20, done: false },
                ].map(m => (
                    <div key={m.id} className="premium-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            {m.done ? <CheckCircle2 size={24} color="#10B981" /> : <div style={{ width: 24, height: 24, borderRadius: 12, border: '2px solid #E2E8F0' }} />}
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 14, color: m.done ? '#94A3B8' : '#0F172A', textDecoration: m.done ? 'line-through' : 'none' }}>{m.task}</div>
                                <div style={{ fontSize: 11, fontWeight: 800, color: '#1E50E2' }}>+{m.xp} XP</div>
                            </div>
                        </div>
                        {!m.done && <button onClick={() => gainXp(m.xp)} style={{ background: 'none', border: 'none', color: '#1E50E2', fontWeight: 800, fontSize: 12 }}>Claim</button>}
                    </div>
                ))}
            </div>
        </div>
    )
}
