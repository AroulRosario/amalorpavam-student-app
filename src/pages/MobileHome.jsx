import { useApp } from '../context/AppContext'
import { Bell, Search, Star, Clock, ChevronRight, Video, Megaphone, Zap, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MobileHome() {
    const { news, liveClasses, appConfig, homework, addToast } = useApp()

    return (
        <div className="mobile-page">
            {/* Header */}
            <header className="mobile-header">
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0A2463', margin: 0 }}>Hello, Kavya 👋</h1>
                    <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Class XII-A · Rank #1</p>
                </div>
                <button className="header-btn" onClick={() => addToast('3 new notifications', 'info')}>
                    <Bell size={20} />
                    <div className="notif-dot" />
                </button>
            </header>

            {/* Admin Broadcast Ticker */}
            <div style={{ background: 'linear-gradient(90deg, #1034A6, #1E50E2)', padding: '10px 16px', margin: '0 20px 20px', borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Megaphone size={16} color="white" />
                <div style={{ whiteSpace: 'nowrap', color: 'white', fontSize: 13, fontWeight: 700, animation: 'ticker 15s linear infinite' }}>
                    {appConfig.studentAppBroadcast} — {appConfig.studentAppBroadcast}
                </div>
            </div>

            <style>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

            {/* Main Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 20px 20px' }}>
                <div style={{ padding: 16, background: '#E8EFFD', borderRadius: 20, border: '1.5px solid #D1E0FB' }}>
                    <div style={{ background: 'white', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <Star size={18} color="#1E50E2" />
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#1E50E2' }}>94%</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Attendance</div>
                </div>
                <div style={{ padding: 16, background: '#FEF3C7', borderRadius: 20, border: '1.5px solid #FDE68A' }}>
                    <div style={{ background: 'white', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <Zap size={18} color="#D97706" />
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#D97706' }}>120</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Activity Pts</div>
                </div>
            </div>

            {/* Live Classes (Admin Managed) */}
            <div style={{ padding: '0 20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 800 }}>Live & Scheduled</h2>
                    <span style={{ fontSize: 12, color: '#1E50E2', fontWeight: 700 }}>View All</span>
                </div>
                <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
                    {liveClasses.map(c => (
                        <motion.div
                            key={c.id}
                            whileTap={{ scale: 0.96 }}
                            style={{ flex: '0 0 240px', padding: 16, background: 'white', borderRadius: 20, border: '1.5px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <div style={{ background: c.status === 'Live' ? '#FEE2E2' : '#F1F5F9', color: c.status === 'Live' ? '#EF4444' : '#64748B', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800 }}>
                                    {c.status.toUpperCase()}
                                </div>
                                <div style={{ color: '#94A3B8' }}><Clock size={14} /></div>
                            </div>
                            <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginBottom: 4 }}>{c.subject}</div>
                            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>{c.teacher} · {c.time}</div>
                            <button disabled={c.status !== 'Live'} style={{ width: '100%', padding: '10px', borderRadius: 12, background: c.status === 'Live' ? '#1E50E2' : '#E2E8F0', color: 'white', border: 'none', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
                                <Video size={16} /> {c.status === 'Live' ? 'Join Now' : 'Starts Soon'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* News Feed (Admin Managed) */}
            <div style={{ padding: '0 20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 800 }}>Notice Board</h2>
                    <span style={{ fontSize: 12, color: '#1E50E2', fontWeight: 700 }}>More</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {news.map(n => (
                        <div key={n.id} style={{ display: 'flex', gap: 12, padding: 12, background: n.urgent ? '#FFF7ED' : 'white', borderRadius: 18, border: n.urgent ? '1.5px solid #FFEDD5' : '1.5px solid #F1F5F9' }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: n.urgent ? '#FFEDD5' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.urgent ? '#EA580C' : '#64748B', flexShrink: 0 }}>
                                {n.type === 'Sports' ? '🏅' : n.type === 'Event' ? '🗓️' : '📢'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: n.urgent ? '#EA580C' : '#94A3B8', textTransform: 'uppercase' }}>{n.type}</span>
                                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{n.date}</span>
                                </div>
                                <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A', marginBottom: 4 }}>{n.title}</div>
                                <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>{n.content}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Student of the Month */}
            <div style={{ margin: '0 20px 100px', padding: 20, background: 'linear-gradient(135deg, #FFD700, #F59E0B)', borderRadius: 24, color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 8, padding: '4px 8px', fontSize: 10, fontWeight: 800 }}>🏆 STAR STUDENT</div>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>Kavya Nair</h3>
                    <p style={{ margin: 0, fontSize: 13, opacity: 0.9, fontWeight: 600 }}>Consistent Academic Excellence & Leadership</p>
                    <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                        <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.1)', padding: '4px 8px', borderRadius: 4 }}>Class XII-A</span>
                        <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.1)', padding: '4px 8px', borderRadius: 4 }}>GPA 4.0</span>
                    </div>
                </div>
                <div style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.2 }}>
                    <GraduationCap size={120} />
                </div>
            </div>

        </div>
    )
}
