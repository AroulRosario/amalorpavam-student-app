import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, ArrowRight, ShieldCheck, Mail, Sparkles, Fingerprint } from 'lucide-react'

export default function Login() {
    const { login, loading, addToast } = useApp()
    const [identifier, setIdentifier] = useState('')
    const [pass, setPass] = useState('')
    const [focused, setFocused] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!identifier || !pass) {
            addToast('Enter both Email/Roll and Password', 'error')
            return
        }
        login(identifier, pass)
    }

    return (
        <div className="login-page" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Dynamic Background Elements */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(16, 52, 166, 0.08) 0%, transparent 70%)', borderRadius: '50%' }}
            />
            <motion.div
                animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '50%', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(79, 131, 238, 0.08) 0%, transparent 70%)', borderRadius: '50%' }}
            />

            <div style={{ maxWidth: 440, width: '100%', position: 'relative', zIndex: 10 }}>
                {/* Brand Header */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: 48 }}
                >
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            style={{ position: 'absolute', inset: -8, border: '2px dashed rgba(16, 52, 166, 0.2)', borderRadius: 28 }}
                        />
                        <div style={{
                            width: 80, height: 80, background: 'linear-gradient(135deg, #1034A6, #4F83EE)',
                            borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: 36, fontWeight: 900,
                            boxShadow: '0 20px 40px rgba(16, 52, 166, 0.3)'
                        }}>A</div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ position: 'absolute', top: -10, right: -10, color: '#F59E0B' }}
                        >
                            <Sparkles size={24} fill="#F59E0B" />
                        </motion.div>
                    </div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0A2463', margin: '24px 0 8px', letterSpacing: '-1px' }}>Amalorpavam</h1>
                    <p style={{ fontSize: 15, color: '#64748B', fontWeight: 600 }}>The Future of Learning</p>
                </motion.div>

                {/* glassmorphism Login Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(30px)',
                        padding: 40,
                        borderRadius: 40,
                        boxShadow: '0 30px 60px rgba(10, 36, 99, 0.1)',
                        border: '1.5px solid rgba(255, 255, 255, 0.6)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', margin: 0 }}>Portal Login</h2>
                        <div style={{ padding: '6px 12px', background: '#E8EFFD', borderRadius: 12, color: '#1E50E2', fontSize: 11, fontWeight: 900 }}>v2.0 LIVE</div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Identifier Input */}
                        <div style={{ position: 'relative' }}>
                            <motion.div
                                animate={{ color: focused === 'id' ? '#1E50E2' : '#94A3B8' }}
                                style={{ position: 'absolute', left: 16, top: 16 }}
                            >
                                <User size={20} />
                            </motion.div>
                            <input
                                className="input"
                                type="text"
                                placeholder="Email or Roll Number"
                                value={identifier}
                                onFocus={() => setFocused('id')}
                                onBlur={() => setFocused(null)}
                                onChange={e => setIdentifier(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 52px',
                                    borderRadius: 20, background: 'rgba(241, 245, 249, 0.5)',
                                    border: focused === 'id' ? '2px solid #1E50E2' : '2px solid transparent',
                                    outline: 'none', fontSize: 15, fontWeight: 600, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />
                        </div>

                        {/* Password Input */}
                        <div style={{ position: 'relative' }}>
                            <motion.div
                                animate={{ color: focused === 'pass' ? '#1E50E2' : '#94A3B8' }}
                                style={{ position: 'absolute', left: 16, top: 16 }}
                            >
                                <Lock size={20} />
                            </motion.div>
                            <input
                                className="input"
                                type="password"
                                placeholder="Secret Password"
                                value={pass}
                                onFocus={() => setFocused('pass')}
                                onBlur={() => setFocused(null)}
                                onChange={e => setPass(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 52px',
                                    borderRadius: 20, background: 'rgba(241, 245, 249, 0.5)',
                                    border: focused === 'pass' ? '2px solid #1E50E2' : '2px solid transparent',
                                    outline: 'none', fontSize: 15, fontWeight: 600, transition: 'all 0.3s'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>
                                <input type="checkbox" style={{ accentColor: '#1E50E2' }} /> Remember me
                            </label>
                            <div style={{ fontSize: 13, fontWeight: 800, color: '#1E50E2', cursor: 'pointer' }}>
                                Recover Key
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            style={{
                                marginTop: 8, padding: '18px', borderRadius: 20,
                                background: 'linear-gradient(135deg, #1034A6, #1E50E2)',
                                color: 'white', border: 'none', fontWeight: 900, fontSize: 17,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                boxShadow: '0 15px 35px rgba(16, 52, 166, 0.25)', cursor: 'pointer',
                                position: 'relative', overflow: 'hidden'
                            }}
                        >
                            {loading ? (
                                <div className="spinner-ultra" />
                            ) : (
                                <>
                                    Access Dashboard <ArrowRight size={20} />
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6 }}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                                    />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Test credentials highlight */}
                    <div style={{
                        marginTop: 32, padding: 20, background: 'linear-gradient(135deg, #E0F2FE, #F0F9FF)',
                        borderRadius: 24, border: '1.5px solid #BAE6FD', display: 'flex', gap: 14
                    }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369A1', flexShrink: 0 }}>
                            <Fingerprint size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 900, color: '#0369A1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>TEST CREDENTIALS</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Kavya Nair: <span style={{ color: '#0369A1' }}>04</span></div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Password: <span style={{ color: '#0369A1' }}>password123</span></div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Security Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{ marginTop: 40, textAlign: 'center' }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: 'rgba(255,255,255,0.4)', borderRadius: 100, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.6)' }}>
                        <ShieldCheck size={16} color="#10B981" />
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#0A2463', opacity: 0.8 }}>Campus Authentication Protcol v4.2</span>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .spinner-ultra {
          width: 24px;
          height: 24px;
          border: 4px solid rgba(255,255,255,0.1);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 0.6s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .input:hover { background: rgba(241, 245, 249, 0.8) !important; }
      `}</style>
        </div>
    )
}
