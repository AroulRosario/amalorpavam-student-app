import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import { User, Lock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'

export default function Login() {
    const { login, loading, addToast } = useApp()
    const [identifier, setIdentifier] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!identifier || !pass) {
            addToast('Please enter both Email/Roll and Password', 'error')
            return
        }
        login(identifier, pass)
    }

    return (
        <div className="login-container" style={{
            minHeight: '100vh',
            background: '#FAFBFF',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 24px',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ maxWidth: 400, width: '100%' }}>
                {/* Brand Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ textAlign: 'center', marginBottom: 40 }}
                >
                    <div style={{
                        width: 72, height: 72, background: 'linear-gradient(135deg, #1034A6, #4F83EE)',
                        borderRadius: 22, margin: '0 auto 16px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', color: 'white',
                        fontSize: 32, fontWeight: 900, boxShadow: '0 10px 25px rgba(16, 52, 166, 0.2)'
                    }}>A</div>
                    <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0A2463', margin: '0 0 8px' }}>Amalorpavam</h1>
                    <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>Student Learning Portal</p>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        background: 'white', padding: 32, borderRadius: 32,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1.5px solid #F1F5F9'
                    }}
                >
                    <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: '#0F172A' }}>Portal Login</h2>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: 14, top: 14, color: '#94A3B8' }} size={18} />
                            <input
                                className="input"
                                type="text"
                                placeholder="Email or Roll Number"
                                value={identifier}
                                onChange={e => setIdentifier(e.target.value)}
                                style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 16, background: '#F8FAFC', border: '1.5px solid #E2E8F0', outline: 'none', fontSize: 14 }}
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
                                style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 16, background: '#F8FAFC', border: '1.5px solid #E2E8F0', outline: 'none', fontSize: 14 }}
                            />
                        </div>

                        <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#1E50E2', cursor: 'pointer' }} onClick={() => addToast('Contact Admin for password reset', 'info')}>
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

                    <div style={{ marginTop: 24, padding: 16, background: '#F1F5F9', borderRadius: 14, display: 'flex', gap: 12 }}>
                        <HelpCircle size={18} color="#64748B" />
                        <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>
                            Login using the credentials provided by your teacher or from the CSV upload.
                        </div>
                    </div>
                </motion.div>

                {/* Footer info */}
                <div style={{ marginTop: 32, textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: 0.6 }}>
                        <ShieldCheck size={14} />
                        <span style={{ fontSize: 11, fontWeight: 600 }}>Amalorpavam Secure Access</span>
                    </div>
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
