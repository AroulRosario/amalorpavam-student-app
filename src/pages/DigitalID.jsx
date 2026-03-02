import { useApp } from '../context/AppContext'
import { ChevronLeft, Share2, Download, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DigitalID() {
    const { setActivePage } = useApp()

    return (
        <div className="mobile-page" style={{ background: '#F8FAFC', paddingBottom: 40 }}>
            <header className="mobile-header" style={{ background: 'transparent' }}>
                <button className="header-btn" onClick={() => setActivePage('mobile-profile')}>
                    <ChevronLeft size={20} />
                </button>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0A2463', margin: 0, flex: 1, textAlign: 'center' }}>Digital ID Card</h2>
                <button className="header-btn">
                    <Share2 size={18} />
                </button>
            </header>

            <div style={{ padding: '0 30px' }}>
                {/* The Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        background: 'linear-gradient(135deg, #1034A6, #0A2463)',
                        borderRadius: 28,
                        padding: 24,
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(10, 36, 99, 0.2)',
                        marginTop: 20
                    }}
                >
                    {/* Decorative pattern */}
                    <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                    {/* School Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'white', color: '#1034A6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>A</div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.5 }}>AMALORPAAVAM</div>
                            <div style={{ fontSize: 9, opacity: 0.8 }}>HIGHER SECONDARY SCHOOL</div>
                        </div>
                    </div>

                    {/* Student Info */}
                    <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                        <div style={{ width: 100, height: 100, borderRadius: 20, background: '#F1F5F9', border: '3px solid rgba(255,255,255,0.2)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 32 }}>👩‍🎓</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Kavya Nair</div>
                            <div style={{ fontSize: 13, opacity: 0.9 }}>Class XII-A</div>
                            <div style={{ fontSize: 13, opacity: 0.9 }}>Roll No: 04</div>
                        </div>
                    </div>

                    {/* Secondary Details */}
                    <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: 16, padding: '16px 0', borderTop: '1.5px solid rgba(255,255,255,0.1)' }}>
                        <div>
                            <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>VALID THRU</div>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>MAY 2026</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>BLOOD GRP</div>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>O+ POSITIVE</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                        <div style={{ background: 'white', padding: 12, borderRadius: 16 }}>
                            {/* Simulated QR Code */}
                            <div style={{ width: 120, height: 120, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 2 }}>
                                {Array.from({ length: 100 }).map((_, i) => (
                                    <div key={i} style={{ background: Math.random() > 0.5 ? '#000' : 'transparent', width: '100%', height: '100%' }} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 11, marginTop: 12, opacity: 0.7, fontWeight: 600 }}>ID: AHSS-2026-0421</div>
                </motion.div>

                {/* Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 30 }}>
                    <button className="btn btn-outline" style={{ background: 'white', justifyContent: 'center', height: 52 }}>
                        <Download size={18} /> Save PDF
                    </button>
                    <button className="btn btn-primary" style={{ height: 52, justifyContent: 'center' }}>
                        <Share2 size={18} /> Share Key
                    </button>
                </div>

                {/* Security Info */}
                <div style={{ marginTop: 30, padding: 20, background: '#E0F2FE', borderRadius: 20, border: '1.5px solid #BAE6FD', display: 'flex', gap: 12 }}>
                    <ShieldCheck size={24} color="#0284C7" />
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: '#075985' }}>Security Verified</div>
                        <div style={{ fontSize: 12, color: '#0369A1', lineHeight: 1.4 }}>This ID is a legally valid form of identification within campus premises.</div>
                    </div>
                </div>

                {/* Contact info list */}
                <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                        { icon: Mail, label: 'Email', val: 'kavya.nair@student.ahss.edu' },
                        { icon: Phone, label: 'Phone', val: '+91 98765 43210' },
                        { icon: MapPin, label: 'Emergency Contact', val: '0413-2211445' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid #E2E8F0' }}>
                            <div style={{ color: '#64748B' }}><item.icon size={18} /></div>
                            <div>
                                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{item.label}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{item.val}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
