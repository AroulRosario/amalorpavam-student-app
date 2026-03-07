import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Mail, Phone, Calendar, User, Download, Share2 } from 'lucide-react'

export default function DigitalID() {
    const { user, setActivePage } = useApp()

    return (
        <div className="mobile-page" style={{
            background: 'linear-gradient(135deg, #0A2463 0%, #0F172A 100%)',
            minHeight: '100vh', padding: '24px', position: 'relative', overflow: 'hidden'
        }}>
            {/* Dynamic Aura Background */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ position: 'absolute', top: '-10%', left: '-10%', width: '80%', aspectRatio: '1/1', background: 'radial-gradient(circle, #1E50E2 0%, transparent 70%)', borderRadius: '50%' }}
            />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, position: 'relative', zIndex: 10 }}>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActivePage('mobile-profile')}
                    style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ArrowLeft size={24} />
                </motion.button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#94A3B8', letterSpacing: 2 }}>SECURITY TOKEN</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>Digital School ID</div>
                </div>
                <div style={{ width: 48 }} />
            </div>

            {/* Premium ID Card */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(40px)',
                    borderRadius: 40, padding: '40px 32px', position: 'relative', zIndex: 10,
                    boxShadow: '0 40px 80px rgba(0,0,0,0.5)', overflow: 'hidden'
                }}
            >
                {/* Glow Detail */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: 'linear-gradient(90deg, #1034A6, #4F83EE, #1034A6)' }} />

                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <motion.div
                        initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                        style={{
                            width: 140, height: 140, borderRadius: 32,
                            background: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
                            margin: '0 auto 20px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: 64, border: '6px solid white',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.05)'
                        }}
                    >
                        {user?.avatar || '🎓'}
                    </motion.div>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', margin: '0 0 4px' }}>{user?.name || 'Kavya Nair'}</h2>
                    <div style={{ fontSize: 14, color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>{user?.class || 'Class XII-A'} · Student</div>
                </div>

                {/* Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40, background: '#F8FAFC', padding: 24, borderRadius: 28 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 900, color: '#94A3B8', marginBottom: 4 }}>ROLL NUMBER</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A' }}>{user?.roll || '04'}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 900, color: '#94A3B8', marginBottom: 4 }}>ID VALID UNTIL</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A' }}>MAY 2026</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 900, color: '#94A3B8', marginBottom: 4 }}>HOUSE</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#1034A6' }}>NEPTUNE</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 900, color: '#94A3B8', marginBottom: 4 }}>BLOOD GROUP</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#EF4444' }}>O+ POS</div>
                    </div>
                </div>

                {/* QR Code Placeholder */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 160, height: 160, background: 'white', margin: '0 auto 24px',
                        borderRadius: 20, padding: 12, border: '1.5px solid #F1F5F9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {/* Mock QR SVG */}
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#0A2463" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3h4v4H3zM17 3h4v4h-4zM3 17h4v4H3zM9 3h2v2H9zM13 3h2v2h-2zM9 9h2v2H9zM13 9h2v2h-2zM17 9h2v2h-2zM9 13h2v2H9zM13 13h2v2h-2zM17 13h2v2h-2zM9 17h2v2H9zM13 17h2v2h-2zM17 17h2v2h-2z" />
                            <rect x="7" y="7" width="2" height="2" fill="currentColor" />
                            <rect x="15" y="15" width="2" height="2" fill="currentColor" />
                        </svg>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#10B981', background: '#D1FAE5', padding: '10px 20px', borderRadius: 100 }}>
                        <ShieldCheck size={18} />
                        <span style={{ fontSize: 12, fontWeight: 900 }}>AUTHENTICATED BY AHSS</span>
                    </div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <div style={{ marginTop: 40, display: 'flex', gap: 16, position: 'relative', zIndex: 10 }}>
                <motion.button whileTap={{ scale: 0.95 }} style={{ flex: 1, padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <Download size={18} /> Download
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} style={{ flex: 1, padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <Share2 size={18} /> Share ID
                </motion.button>
            </div>

            {/* Campus Logo Detail */}
            <div style={{ marginTop: 40, textAlign: 'center', opacity: 0.4 }}>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: 'white', margin: 0, opacity: 0.2 }}>AMALORPAVAM</h3>
            </div>
        </div>
    )
}
