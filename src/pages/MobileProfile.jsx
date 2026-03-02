import { useApp } from '../context/AppContext'
import { User, CreditCard, Shield, Settings, LogOut, ChevronRight, Bell, Smartphone, Award } from 'lucide-react'

export default function MobileProfile() {
    const { setActivePage, addToast } = useApp()

    const menuItems = [
        { icon: CreditCard, label: 'Fee Payments', color: '#10B981', bg: '#D1FAE5', action: () => addToast('Opening Fee Portal...', 'info') },
        { icon: Bell, label: 'Notifications', color: '#1E50E2', bg: '#E8EFFD', action: () => addToast('Notification settings...', 'info') },
        { icon: Shield, label: 'Security', color: '#F59E0B', bg: '#FEF3C7', action: () => addToast('Security settings...', 'info') },
        { icon: Settings, label: 'App Settings', color: '#64748B', bg: '#F1F5F9', action: () => addToast('App preferences...', 'info') },
    ]

    return (
        <div className="mobile-page">
            <header className="mobile-header">
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A2463', margin: 0 }}>My Profile</h2>
                <button className="header-btn" onClick={() => addToast('Logging out...', 'info')}>
                    <LogOut size={20} />
                </button>
            </header>

            {/* Profile Card */}
            <div style={{ padding: '0 20px 30px', textAlign: 'center' }}>
                <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px' }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, border: '4px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                        👩‍🎓
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#10B981', width: 28, height: 28, borderRadius: '50%', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 8, height: 8, background: 'white', borderRadius: '50%' }} />
                    </div>
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: '#0F172A' }}>Kavya Nair</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#64748B', fontWeight: 600 }}>kavya.nair@student.ahss.edu</p>
            </div>

            {/* Primary Action: Digital ID (NEW) */}
            <div style={{ padding: '0 20px 24px' }}>
                <button
                    onClick={() => setActivePage('digital-id')}
                    style={{ width: '100%', padding: '20px', background: 'linear-gradient(135deg, #1034A6, #1E50E2)', borderRadius: 24, border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 12px 24px rgba(16, 52, 166, 0.15)', cursor: 'pointer' }}
                >
                    <div style={{ background: 'rgba(255,255,255,0.2)', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Smartphone size={24} />
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 800, fontSize: 16 }}>Digital School ID</div>
                        <div style={{ fontSize: 12, opacity: 0.8 }}>Identity & Campus Access</div>
                    </div>
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Menu List */}
            <div style={{ padding: '0 20px 100px' }}>
                <div style={{ background: 'white', borderRadius: 24, border: '1.5px solid #F1F5F9', overflow: 'hidden' }}>
                    {menuItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={item.action}
                            style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, background: 'transparent', border: 'none', borderBottom: i === menuItems.length - 1 ? 'none' : '1px solid #F1F5F9', cursor: 'pointer' }}
                        >
                            <div style={{ background: item.bg, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <item.icon size={18} color={item.color} />
                            </div>
                            <span style={{ flex: 1, textAlign: 'left', fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{item.label}</span>
                            <ChevronRight size={16} color="#CBD5E1" />
                        </button>
                    ))}
                </div>

                {/* Support Section */}
                <div style={{ marginTop: 24, padding: '0 8px' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase' }}>Support & Information</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, fontWeight: 700, color: '#64748B' }}>
                            <Award size={18} /> Student Code of Conduct
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, fontWeight: 700, color: '#64748B' }}>
                            <Settings size={18} /> Privacy Policy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
