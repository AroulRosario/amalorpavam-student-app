import { useApp } from '../context/AppContext'
import { ChevronLeft, Play, FileText, HelpCircle, CheckCircle, ArrowRight, Star, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CoursePlayer() {
    const { setActivePage, gainXp, addToast } = useApp()
    const [tab, setTab] = useState('video')
    const [completed, setCompleted] = useState(false)

    const handleComplete = () => {
        setCompleted(true)
        gainXp(150)
        addToast('Lesson Completed! +150 XP', 'success')
    }

    return (
        <div className="mobile-page" style={{ padding: 0, background: '#F8FAFC' }}>
            {/* Video Section */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
                <button
                    onClick={() => setActivePage('mobile-learning')}
                    style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Mock Video UI */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Play size={32} fill="white" />
                    </div>
                </div>

                {/* Video Progress Bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, height: 4, width: '100%', background: 'rgba(255,255,255,0.2)' }}>
                    <div style={{ height: '100%', width: '45%', background: '#1E50E2' }} />
                </div>
            </div>

            {/* Lesson Header */}
            <div style={{ padding: 24, background: 'white', borderBottom: '1.5px solid #F1F5F9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ background: '#E8EFFD', color: '#1E50E2', fontSize: 10, fontWeight: 900, padding: '4px 8px', borderRadius: 6, letterSpacing: 0.5 }}>MATHEMATICS · UNIT 4</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B', fontWeight: 800, fontSize: 12 }}>
                        <Star size={14} fill="#F59E0B" /> 4.9
                    </div>
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0A2463', margin: '0 0 8px' }}>Calculus: Advanced Derivatives</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#94A3B8', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={16} /> 45 mins</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FileText size={16} /> 12 Resources</div>
                </div>
            </div>

            {/* Interactive Tabs */}
            <div style={{ display: 'flex', background: 'white', padding: '0 24px', position: 'sticky', top: 0, zIndex: 10 }}>
                {['video', 'notes', 'quiz'].map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                            flex: 1, padding: '16px 0', border: 'none', background: 'transparent',
                            fontSize: 14, fontWeight: 800, color: tab === t ? '#1E50E2' : '#94A3B8',
                            borderBottom: tab === t ? '3px solid #1E50E2' : '3px solid transparent',
                            transition: 'all 0.2s', textTransform: 'capitalize'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: 24, paddingBottom: 100 }}>
                <AnimatePresence mode="wait">
                    {tab === 'video' && (
                        <motion.div
                            key="video"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        >
                            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Class Overview</h3>
                            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>
                                In this session, we dive deep into the first principle of derivatives and explore how calculus forms the bedrock of modern engineering and physics.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { title: 'The Power Rule', duration: '12:45', done: true },
                                    { title: 'Product & Quotient Rules', duration: '15:20', done: false },
                                    { title: 'Chain Rule Mastery', duration: '18:10', done: false }
                                ].map((item, i) => (
                                    <div key={i} style={{ padding: 16, background: 'white', borderRadius: 20, border: '1.5px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 10, background: item.done ? '#D1FAE5' : '#F8FAFC', color: item.done ? '#059669' : '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.done ? <CheckCircle size={18} /> : <span>{i + 1}</span>}
                                        </div>
                                        <div style={{ flex: 1, fontWeight: 800, fontSize: 14, color: item.done ? '#94A3B8' : '#0F172A' }}>{item.title}</div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>{item.duration}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {tab === 'notes' && (
                        <motion.div
                            key="notes"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            style={{ textAlign: 'center', padding: '40px 0' }}
                        >
                            <FileText size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                            <h3 style={{ fontSize: 18, fontWeight: 800 }}>Download Study Material</h3>
                            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Get the PDF summary of today's lecture.</p>
                            <button className="btn btn-primary" style={{ margin: '0 auto' }}>Download PDF</button>
                        </motion.div>
                    )}

                    {tab === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        >
                            <div style={{ padding: 24, background: '#E8EFFD', borderRadius: 24, border: '1.5px solid #D1E0FB', textAlign: 'center' }}>
                                <HelpCircle size={40} color="#1E50E2" style={{ marginBottom: 16 }} />
                                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0A2463' }}>Module Quiz</h3>
                                <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>Answer 5 questions to unlock XP bonuses.</p>
                                <button className="btn btn-primary" style={{ margin: '0 auto', width: '100%', justifyContent: 'center' }}>Start Quiz</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Complete Button */}
            {!completed && (
                <div style={{ position: 'fixed', bottom: 24, left: 24, right: 24, zIndex: 100 }}>
                    <button
                        onClick={handleComplete}
                        style={{
                            width: '100%', padding: '18px', borderRadius: 20,
                            background: 'linear-gradient(135deg, #1034A6, #1E50E2)',
                            color: 'white', border: 'none', fontWeight: 900, fontSize: 16,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            boxShadow: '0 20px 40px rgba(16, 52, 166, 0.2)'
                        }}
                    >
                        Complete Lesson <ArrowRight size={20} />
                    </button>
                </div>
            )}

        </div>
    )
}
