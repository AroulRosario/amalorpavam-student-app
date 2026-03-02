import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import {
    Bell, Flame, TrendingUp, Play, Calendar, CheckCircle2,
    ArrowRight, Award, Zap, Utensils
} from 'lucide-react'

export default function MobileHome() {
    const { user, xp, level, streak, news, appConfig, setActivePage, gainXp } = useApp()

    const nextLevelXp = 2000
    const progress = (xp / nextLevelXp) * 100

    return (
        <div className="mobile-page">
            {/* Premium Header */}
            <header className="mobile-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{
                            width: 54, height: 54, borderRadius: 18,
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 24, boxShadow: '0 10px 20px rgba(255, 165, 0, 0.2)'
                        }}
                    >
                        {user?.avatar || '🎓'}
                    </motion.div>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0A2463', margin: 0 }}>Hi, {user?.name.split(' ')[0]}!</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                            <span style={{
                                background: '#1034A6', color: 'white', fontSize: 10,
                                fontWeight: 900, padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase'
                            }}>Level {level}</span>
                            <span style={{ fontSize: 12, color: '#64748B', fontWeight: 700 }}>{xp} XP</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.8)', padding: '10px 14px', borderRadius: 16,
                            display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 8px 16px rgba(0,0,0,0.03)',
                            border: '1.5px solid #F1F5F9'
                        }}
                    >
                        <Flame size={18} color="#EF4444" fill="#EF4444" />
                        <span style={{ fontWeight: 900, fontSize: 14 }}>{streak}</span>
                    </motion.div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="header-btn"
                        style={{ background: 'white', borderRadius: 16, border: '1.5px solid #F1F5F9' }}
                    >
                        <Bell size={20} />
                        <div className="notif-dot" />
                    </motion.button>
                </div>
            </header>

            {/* XP Progress Hero */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="premium-card"
                style={{
                    marginBottom: 32,
                    background: 'linear-gradient(135deg, #1034A6, #4F83EE)',
                    color: 'white',
                    border: 'none',
                    padding: '28px'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1 }}>Next Milestone</div>
                        <h2 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0' }}>{nextLevelXp - xp} XP to Level {level + 1}</h2>
                    </div>
                    <Award size={32} opacity={0.5} />
                </div>
                <div style={{ height: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 10, overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{ height: '100%', background: 'white', boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, fontWeight: 800, opacity: 0.9 }}>
                    <span>{xp} XP EARNED</span>
                    <span>{progress.toFixed(0)}%</span>
                </div>
            </motion.div>

            {/* Broadcast Ticker */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0, color: '#0A2463' }}>Academic Alerts</h3>
                    <span style={{ fontSize: 12, color: '#1E50E2', fontWeight: 800, cursor: 'pointer' }}>View All</span>
                </div>
                <div className="premium-card" style={{ background: '#0A2463', color: 'white', padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Zap size={20} color="#F59E0B" fill="#F59E0B" />
                        <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{appConfig.studentAppBroadcast}</p>
                    </div>
                </div>
            </div>

            {/* Quick Launch Grid */}
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16, color: '#0A2463' }}>Quick Actions</h3>
            <div className="stats-grid">
                <motion.div
                    onClick={() => setActivePage('mobile-learning')}
                    className="premium-card"
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer' }}
                >
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={20} color="#1D4ED8" fill="#1D4ED8" />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>Learning Hub</div>
                </motion.div>
                <motion.div
                    onClick={() => setActivePage('mobile-canteen')}
                    className="premium-card"
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer' }}
                >
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Utensils size={20} color="#C2410C" />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>Order Food</div>
                </motion.div>
            </div>

            {/* Daily Missions */}
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16, color: '#0A2463' }}>Daily Missions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                    { id: 1, task: 'Complete Unit 4 Quiz', xp: 150, done: false },
                    { id: 2, task: 'Attend Live Physics Class', xp: 100, done: true },
                    { id: 3, task: 'Solve 5 Math Problems', xp: 200, done: false },
                ].map(m => (
                    <div key={m.id} className="premium-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            {m.done ? <CheckCircle2 size={24} color="#10B981" /> : <div style={{ width: 24, height: 24, borderRadius: 12, border: '2px solid #E2E8F0' }} />}
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 14, textDecoration: m.done ? 'line-through' : 'none', color: m.done ? '#94A3B8' : '#0F172A' }}>{m.task}</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#1E50E2' }}>+{m.xp} XP</div>
                            </div>
                        </div>
                        {!m.done && (
                            <button
                                onClick={() => gainXp(m.xp)}
                                style={{ border: 'none', background: 'none', color: '#1034A6', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}
                            >
                                Claim
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Padding for Nav */}
            <div style={{ height: 40 }} />
        </div>
    )
}
