import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, ArrowRight, ShieldCheck, Sparkles, Fingerprint } from 'lucide-react'

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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            position: 'relative',
        }}>
            <div style={{ maxWidth: 440, width: '100%', position: 'relative', zIndex: 10 }}>
                {/* Brand Header */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: 48 }}
                >
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            style={{ position: 'absolute', inset: -8, border: '2px dashed #1034A6', opacity: 0.2, borderRadius: 28 }}
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
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="premium-card"
                    style={{ padding: 40, border: '1.5px solid rgba(255, 255, 255, 0.8)' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', margin: 0 }}>Portal Login</h2>
                        <div style={{ padding: '6px 12px', background: '#E8EFFD', borderRadius: 12, color: '#1E50E2', fontSize: 11, fontWeight: 900 }}>v3.0 READY</div>
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
                                className="input-premium"
                                type="text"
                                placeholder="Email or Roll Number"
                                value={identifier}
                                onFocus={() => setFocused('id')}
                                onBlur={() => setFocused(null)}
                                onChange={e => setIdentifier(e.target.value)}
                                style={{ paddingLeft: 52 }}
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
                                className="input-premium"
                                type="password"
                                placeholder="Secret Password"
                                value={pass}
                                onFocus={() => setFocused('pass')}
                                onBlur={() => setFocused(null)}
                                onChange={e => setPass(e.target.value)}
                                style={{ paddingLeft: 52 }}
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
                            className="btn-premium"
                            style={{ width: '100%', justifyContent: 'center', fontSize: 18, padding: 20 }}
                        >
                            {loading ? (
                                <div className="spinner-ultra" />
                            ) : (
                                <>Access Dashboard <ArrowRight size={20} /></>
                            )}
                        </motion.button>
                    </form>

                    {/* Test credentials highlight */}
                    <div style={{
                        marginTop: 32, padding: 20, background: 'rgba(30, 80, 226, 0.05)',
                        borderRadius: 24, border: '1.5px solid rgba(16, 52, 166, 0.1)', display: 'flex', gap: 14
                    }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1034A6', flexShrink: 0, boxShadow: '0 8px 16px rgba(0,0,0,0.03)' }}>
                            <Fingerprint size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 900, color: '#1034A6', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>TEST CREDENTIALS</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>User: <span style={{ color: '#1034A6' }}>04</span> / Pass: <span style={{ color: '#1034A6' }}>password123</span></div>
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
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', background: 'rgba(255,255,255,0.6)', borderRadius: 100, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                        <ShieldCheck size={16} color="#10B981" />
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#0A2463', opacity: 0.8 }}>Campus Authentication Protcol v4.2</span>
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
      `}</style>
        </div>
    )
}
