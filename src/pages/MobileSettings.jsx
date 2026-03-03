import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import {
    Shield, Bell, Moon, Smartphone,
    ChevronLeft, Lock, Eye, Trash2,
    Sun, Monitor, Smartphone as PhoneIcon
} from 'lucide-react'

export default function MobileSettings({ type, onBack }) {
    const { addToast } = useApp()

    // --- Appearance Logic ---
    const [theme, setTheme] = useState('light')

    const settingsMap = {
        security: {
            title: 'Security & Privacy',
            icon: Shield,
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h4 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}><Lock size={18} /> Password</h4>
                        <button className="btn-premium" style={{ width: '100%', justifyContent: 'center', background: '#F1F5F9', color: '#0F172A' }} onClick={() => addToast('Password reset link sent to registered email.', 'info')}>Change Password</button>
                    </div>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h4 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}><Eye size={18} /> Data Privacy</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: 14 }}>Profile Visibility</span>
                            <input type="checkbox" defaultChecked />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 14 }}>Share Analytics</span>
                            <input type="checkbox" />
                        </div>
                    </div>
                </div>
            )
        },
        notifications: {
            title: 'Notifications',
            icon: Bell,
            content: (
                <div className="premium-card" style={{ padding: 20 }}>
                    {['Exam Alerts', 'Homework Reminders', 'Fee Statements', 'School News'].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i === 3 ? 'none' : '1.5px solid #F1F5F9' }}>
                            <span style={{ fontWeight: 600 }}>{item}</span>
                            <div style={{ width: 44, height: 24, background: '#10B981', borderRadius: 20, position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: 18, height: 18, background: 'white', borderRadius: '50%', position: 'absolute', right: 3, top: 3 }} />
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        appearance: {
            title: 'Appearance',
            icon: Moon,
            content: (
                <div className="premium-card" style={{ padding: 20 }}>
                    <h4 style={{ margin: '0 0 20px' }}>Theme Preference</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                        {[
                            { id: 'light', icon: Sun, label: 'Light' },
                            { id: 'dark', icon: Moon, label: 'Dark' },
                            { id: 'system', icon: Monitor, label: 'System' }
                        ].map(t => (
                            <button key={t.id} onClick={() => { setTheme(t.id); addToast(`Theme set to ${t.label}`, 'success') }} style={{
                                padding: '16px 8px', borderRadius: 16, border: '2px solid',
                                borderColor: theme === t.id ? '#1034A6' : '#F1F5F9',
                                background: theme === t.id ? '#E8EFFD' : 'white',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.2s'
                            }}>
                                <t.icon size={20} color={theme === t.id ? '#1034A6' : '#64748B'} />
                                <span style={{ fontSize: 11, fontWeight: 800, color: theme === t.id ? '#1034A6' : '#64748B' }}>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )
        },
        device: {
            title: 'Device Settings',
            icon: Smartphone,
            content: (
                <div className="premium-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PhoneIcon size={24} color="#64748B" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800 }}>Primary Device</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}>iPhone 15 Pro · Active Now</div>
                        </div>
                    </div>
                    <button className="btn-premium" style={{ width: '100%', justifyContent: 'center', background: '#FFF1F2', color: '#EF4444', height: 50 }} onClick={() => addToast('Logged out of other devices.', 'success')}>Remove Other Devices</button>
                </div>
            )
        }
    }

    const current = settingsMap[type] || settingsMap.security

    return (
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="mobile-page">
            <header className="mobile-header" style={{ background: 'transparent', padding: '24px 0', border: 'none' }}>
                <button onClick={onBack} style={{ width: 44, height: 44, borderRadius: 12, border: ' none', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <ChevronLeft size={20} />
                </button>
                <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0, flex: 1, textAlign: 'center', marginRight: 44 }}>{current.title}</h2>
            </header>

            {current.content}

            <div style={{ marginTop: 40, textAlign: 'center', opacity: 0.4, fontSize: 11, fontWeight: 800 }}>
                AMALORPAVAM v4.0.2 · SECURED
            </div>
        </motion.div>
    )
}
