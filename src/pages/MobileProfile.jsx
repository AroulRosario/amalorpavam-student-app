import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import {
    User, Shield, Bell, CreditCard, LogOut,
    ChevronRight, Settings, HelpCircle, Moon, Smartphone
} from 'lucide-react'

export default function MobileProfile() {
    const { user, logout, setActivePage } = useApp()

    const sections = [
        { label: 'Security & Privacy', icon: Shield, color: '#10B981', bg: '#D1FAE5' },
        { label: 'Notifications', icon: Bell, color: '#F59E0B', bg: '#FEF3C7' },
        { label: 'Appearance', icon: Moon, color: '#6366F1', bg: '#EEF2FF' },
        { label: 'Device Settings', icon: Smartphone, color: '#EC4899', bg: '#FCE7F3' },
        { label: 'Help & Support', icon: HelpCircle, color: '#64748B', bg: '#F1F5F9' },
    ]

    return (
        <div className="mobile-page">
            {/* Profile Header */}
            <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 24 }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ position: 'relative', display: 'inline-block' }}
                >
                    <div style={{
                        width: 100, height: 100, borderRadius: 35,
                        background: 'linear-gradient(135deg, #1034A6, #4F83EE)',
                        margin: '0 auto 20px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 44, boxShadow: '0 20px 40px rgba(16, 52, 166, 0.25)'
                    }}>
                        {user?.avatar || '🎓'}
                    </div>
                    <div style={{ position: 'absolute', bottom: 15, right: -5, width: 32, height: 32, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                        <Settings size={18} color="#64748B" />
                    </div>
                </motion.div>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0A2463', margin: '0 0 4px' }}>{user?.name || 'Student Name'}</h2>
                <div style={{ fontSize: 14, color: '#64748B', fontWeight: 600, marginBottom: 24 }}>{user?.class || 'Class XII-A'} · Roll No: {user?.roll || '04'}</div>
            </div>

            {/* Live Stats Block (Real-time Sync) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
                <div className="premium-card" style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Fee Status</div>
                    <span style={{
                        padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 900,
                        background: user?.fee === 'Paid' ? '#D1FAE5' : user?.fee === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                        color: user?.fee === 'Paid' ? '#059669' : user?.fee === 'Pending' ? '#D97706' : '#DC2626'
                    }}>
                        {user?.fee || 'Loading...'}
                    </span>
                </div>
                <div className="premium-card" style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Attendance</div>
                    <div style={{ fontWeight: 900, fontSize: 20, color: '#1034A6' }}>{user?.attendance || '--'}%</div>
                </div>
            </div>

            {/* Digital ID Block */}
            <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePage('digital-id')}
                className="premium-card"
                style={{
                    background: 'linear-gradient(135deg, #0A2463, #1E50E2)',
                    color: 'white', padding: '24px', cursor: 'pointer', marginBottom: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 850, fontSize: 18 }}>Digital School ID</div>
                        <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 700 }}>Tap to view QR Code</div>
                    </div>
                </div>
                <ChevronRight size={24} />
            </motion.div>

            {/* Menu Sections */}
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16, color: '#0A2463' }}>Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {sections.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 8 }}
                        className="premium-card"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 20,
                            padding: '16px 20px', cursor: 'pointer'
                        }}
                    >
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <s.icon size={20} color={s.color} />
                        </div>
                        <span style={{ flex: 1, fontWeight: 800, fontSize: 15, color: '#0F172A' }}>{s.label}</span>
                        <ChevronRight size={18} color="#CBD5E1" />
                    </motion.div>
                ))}
            </div>

            {/* Logout */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="premium-card"
                style={{
                    width: '100%', padding: '20px', border: '1.5px solid #FEE2E2',
                    background: '#FFF1F2', color: '#EF4444', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 12,
                    fontWeight: 900, fontSize: 16, cursor: 'pointer', marginBottom: 40
                }}
            >
                <LogOut size={20} /> Sign Out of Portal
            </motion.button>

        </div>
    )
}
