import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, ArrowRight, Github, Chrome, ShieldCheck } from 'lucide-react'

export default function Login() {
    const { login, loading } = useApp()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && pass) login(email, pass)
    }

    return (
        <div className="login-container" style={{
            minHeight: '100vh',
            background: '#FAFBFF',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 24px'
        }}>
            {/* Brand Section */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ textAlign: 'center', marginBottom: 40, marginTop: 40 }}
            >
                <div style={{
                    width: 72, height: 72, background: 'linear-gradient(135deg, #1034A6, #4F83EE)',
                    borderRadius: 22, margin: '0 auto 16px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: 'white',
                    fontSize: 32, fontWeight: 900, boxShadow: '0 10px 25px rgba(16, 52, 166, 0.2)'
                }}>A</div>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0A2463', margin: '0 0 8px' }}>Amalorpavam</h1>
                <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>The Future of Learning is Here</p>
            </motion.div>

            {/* Login Form */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    background: 'white', padding: 32, borderRadius: 32,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1.5px solid #F1F5F9'
                }}
            >
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: '#0F172A' }}>Welcome Back</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: 14, top: 14, color: '#94A3B8' }} size={18} />
                        <input
                            className="input"
                            type="email"
                            placeholder="Student Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 16, background: '#F8FAFC', border: '1.5px solid #E2E8F0', outline: 'none' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: 14, top: 14, color: '#94A3B8' }} size={18} />
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 16, background: '#F8FAFC', border: '1.5px solid #E2E8F0', outline: 'none' }}
                        />
                    </div>

                    <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#1E50E2' }}>
                        Forgot Password?
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: 10, padding: 16, borderRadius: 16,
                            background: 'linear-gradient(135deg, #1034A6, #1E50E2)',
                            color: 'white', border: 'none', fontWeight: 800, fontSize: 16,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            boxShadow: '0 10px 20px rgba(16, 52, 166, 0.2)', cursor: 'pointer'
                        }}
                    >
                        {loading ? <div className="spinner-small" /> : <>Sign In <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, height: 1, background: '#F1F5F9' }} />
                    <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>OR CONTINUE WITH</span>
                    <div style={{ flex: 1, height: 1, background: '#F1F5F9' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <button style={{ padding: 12, borderRadius: 14, background: '#F8FAFC', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                        <Chrome size={18} /> Google
                    </button>
                    <button style={{ padding: 12, borderRadius: 14, background: '#F8FAFC', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                        <Github size={18} /> Github
                    </button>
                </div>
            </motion.div>

            {/* Footer info */}
            <div style={{ marginTop: 'auto', textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: 14, color: '#64748B' }}>
                    New student? <span style={{ color: '#1E50E2', fontWeight: 800 }}>Create Account</span>
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, opacity: 0.6 }}>
                    <ShieldCheck size={14} />
                    <span style={{ fontSize: 11, fontWeight: 600 }}>Secure Campus Access</span>
                </div>
            </div>

            <style>{`
        .spinner-small {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    )
}
