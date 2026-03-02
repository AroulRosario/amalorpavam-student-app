import { useApp } from '../context/AppContext'
import { Bell, Flame, Trophy, Star, Clock, ChevronRight, Video, Megaphone, Zap, GraduationCap, PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MobileHome() {
    const { news, liveClasses, appConfig, user, xp, level, streak, points, addToast, setActivePage } = useApp()

    return (
        <div className="mobile-page">
            {/* Header with Profile & XP */}
            <header className="mobile-header" style={{ alignItems: 'flex-start', paddingBottom: 10 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 16, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        {user?.avatar || '👩‍🎓'}
                    </div>
                    <div>
                        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#0A2463', margin: 0 }}>Hi, {user?.name.split(' ')[0] || 'Student'}!</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                            <div style={{ background: '#E0F2FE', color: '#0369A1', fontSize: 10, fontWeight: 800, padding: '2px 6px', borderRadius: 4 }}>LEVEL {level}</div>
                            <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700 }}>{xp} XP</div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF7ED', color: '#EA580C', padding: '8px 12px', borderRadius: 14, fontWeight: 800, fontSize: 13, border: '1px solid #FFEDD5' }}>
                        <Flame size={16} fill="#EA580C" /> {streak}
                    </div>
                    <button className="header-btn" onClick={() => addToast('Notifications coming soon', 'info')}>
                        <Bell size={20} />
                        <div className="notif-dot" />
                    </button>
                </div>
            </header>

            {/* XP Progress Bar */}
            <div style={{ padding: '0 24px 24px' }}>
                <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'linear-gradient(90deg, #1034A6, #4F83EE)', borderRadius: 3 }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, fontWeight: 800, color: '#94A3B8' }}>
                    <span>650 XP TO LEVEL {level + 1}</span>
                    <span>75%</span>
                </div>
            </div>

            {/* Admin Broadcast Card */}
            <motion.div
                whileTap={{ scale: 0.98 }}
                style={{
                    margin: '0 24px 24px', padding: '16px 20px',
                    background: 'linear-gradient(135deg, #1034A6, #0A2463)',
                    borderRadius: 24, color: 'white', position: 'relative', overflow: 'hidden',
                    boxShadow: '0 15px 30px rgba(10, 36, 99, 0.15)'
                }}
            >
                <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1 }}><Megaphone size={100} /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800 }}>CAMPUS NEWS</div>
                </div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, lineHeight: 1.5 }}>
                    {appConfig.studentAppBroadcast}
                </p>
            </motion.div>

            {/* Continue Learning */}
            <div style={{ padding: '0 24px 24px' }}>
                <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16 }}>Continue Learning</h2>
                <div style={{ padding: 20, background: 'white', borderRadius: 24, border: '1.5px solid #F1F5F9', display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: '#E8EFFD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E50E2' }}>
                        <PlayCircle size={32} fill="#1E50E2" color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#1E50E2', marginBottom: 2 }}>MATHEMATICS · LEVEL 12</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>Calculus: Unit 4 Review</div>
                        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>24 mins remaining</div>
                    </div>
                    <ChevronRight size={20} color="#CBD5E1" />
                </div>
            </div>

            {/* Live Classes Grid */}
            <div style={{ padding: '0 24px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Live Sessions</h2>
                    <span style={{ fontSize: 12, color: '#1E50E2', fontWeight: 800 }}>Join All</span>
                </div>
                <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 10, margin: '0 -24px', paddingLeft: 24 }}>
                    {liveClasses.map(c => (
                        <motion.div
                            key={c.id}
                            whileTap={{ scale: 0.96 }}
                            style={{ flex: '0 0 280px', padding: 20, background: 'white', borderRadius: 28, border: '1.5px solid #F1F5F9', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{ background: c.status === 'Live' ? '#FEE2E2' : '#F1F5F9', color: c.status === 'Live' ? '#EF4444' : '#64748B', padding: '6px 12px', borderRadius: 10, fontSize: 10, fontWeight: 900, letterSpacing: 0.5 }}>
                                    {c.status.toUpperCase()}
                                </div>
                                {c.status === 'Live' && (
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />
                                )}
                            </div>
                            <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 900 }}>{c.subject}</h3>
                            <p style={{ margin: '0 0 20px', fontSize: 13, color: '#64748B', fontWeight: 600 }}>{c.teacher} · {c.time}</p>
                            <button style={{
                                width: '100%', padding: '12px', borderRadius: 16,
                                background: c.status === 'Live' ? '#1E50E2' : '#F1F5F9',
                                color: c.status === 'Live' ? 'white' : '#64748B',
                                border: 'none', fontWeight: 800, fontSize: 14,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer'
                            }}>
                                <Video size={18} /> {c.status === 'Live' ? 'Join Now' : 'Reminder Set'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick Actions Feed */}
            <div style={{ padding: '0 24px 40px' }}>
                <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16 }}>Daily Missions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { icon: Star, bg: '#FEF3C7', color: '#D97706', label: 'Solve Daily Math Quiz', xp: '+50 XP' },
                        { icon: Zap, bg: '#E0F2FE', color: '#0369A1', label: 'Watch Unit 4 Lecture', xp: '+100 XP' },
                        { icon: Trophy, bg: '#D1FAE5', color: '#059669', label: 'Score 90% in Chem Quiz', xp: '+250 XP' },
                    ].map((m, i) => (
                        <div key={i} style={{ padding: 16, background: 'white', borderRadius: 20, border: '1.5px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                                <m.icon size={22} />
                            </div>
                            <div style={{ flex: 1, fontWeight: 800, fontSize: 14 }}>{m.label}</div>
                            <div style={{ fontSize: 12, fontWeight: 900, color: m.color }}>{m.xp}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
      `}</style>
        </div>
    )
}
