import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play, Pause, SkipBack, SkipForward, Volume2,
    Settings, Maximize, FileText, HelpCircle, ArrowLeft,
    CheckCircle2, Star, Download, Bookmark
} from 'lucide-react'

export default function CoursePlayer() {
    const { setActivePage, gainXp } = useApp()
    const [isPlaying, setIsPlaying] = useState(false)
    const [activeTab, setActiveTab] = useState('video')
    const [completed, setCompleted] = useState(false)

    const handleComplete = () => {
        setCompleted(true)
        gainXp(150)
        setTimeout(() => setActivePage('mobile-learning'), 3000)
    }

    return (
        <div className="mobile-page" style={{ padding: 0, background: '#0F172A', color: 'white' }}>
            {/* Header Bar */}
            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActivePage('mobile-learning')}
                    style={{
                        width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)',
                        border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <ArrowLeft size={20} />
                </motion.button>
                <div>
                    <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>Mathematics · Unit 4</h2>
                    <p style={{ fontSize: 13, color: '#94A3B8', margin: '4px 0 0' }}>Introduction to Calculus</p>
                </div>
            </div>

            {/* Video Canvas */}
            <div style={{ position: 'relative', background: 'black', aspectRatios: '16/9', overflow: 'hidden' }}>
                <img
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
                    alt="Video Mockup"
                    style={{ width: '100%', height: 'auto', opacity: 0.6, display: 'block' }}
                />

                {/* Playback Controls Overlay */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        style={{
                            width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 52, 166, 0.9)',
                            border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 30px rgba(16, 52, 166, 0.5)'
                        }}
                    >
                        {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" style={{ marginLeft: 4 }} />}
                    </motion.button>
                </div>

                {/* Bottom Progress Bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
                        <div style={{ width: '65%', height: '100%', background: '#1E50E2' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <SkipBack size={18} />
                            <SkipForward size={18} />
                            <Volume2 size={18} />
                        </div>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <Settings size={18} />
                            <Maximize size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Tabs */}
            <div style={{ background: '#1E293B', padding: '24px', borderRadius: '32px 32px 0 0', marginTop: -20, position: 'relative', minHeight: '50vh' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
                    {['video', 'notes', 'quiz'].map(tab => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1, padding: '12px', borderRadius: 16, border: 'none',
                                background: activeTab === tab ? 'white' : 'rgba(255,255,255,0.05)',
                                color: activeTab === tab ? '#0A2463' : '#94A3B8',
                                fontWeight: 800, fontSize: 13, textTransform: 'capitalize',
                                transition: 'all 0.3s'
                            }}
                        >
                            {tab}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'video' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 12 }}>Module 04: The Tangent Line</h3>
                            <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: 14 }}>In this module, we explore the concept of derivatives and how they relate to the slope of a curve. Understand how instantaneous rate of change forms the basis of calculus.</p>
                            <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
                                <motion.button whileTap={{ scale: 0.95 }} style={{ flex: 1, padding: '16px', borderRadius: 16, background: '#334155', border: 'none', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <Bookmark size={18} /> Bookmark
                                </motion.button>
                                <motion.button whileTap={{ scale: 0.95 }} style={{ flex: 1, padding: '16px', borderRadius: 16, background: '#334155', border: 'none', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <Download size={18} /> Offline
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'notes' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                    <FileText size={32} color="#1E50E2" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, fontSize: 16 }}>Calculus_Unit04_Summary.pdf</div>
                                        <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>12.4 MB · Updated Today</div>
                                    </div>
                                    <Download size={20} />
                                </div>
                                <button style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(30, 80, 226, 0.1)', border: '1.5px solid #1E50E2', color: '#1E50E2', fontWeight: 800, fontSize: 14 }}>Open Reader</button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'quiz' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <Star size={48} color="#F59E0B" fill="#F59E0B" style={{ marginBottom: 16 }} />
                                <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Topic Review Quiz</h3>
                                <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>Answer 5 questions to unlock **150 XP** bonus points!</p>
                                <motion.button
                                    onClick={handleComplete}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ width: '100%', padding: '20px', borderRadius: 20, background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', color: 'white', fontWeight: 900, fontSize: 16 }}
                                >
                                    Complete Lesson & Earn XP
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Completion Modal Overlay */}
            <AnimatePresence>
                {completed && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(10, 36, 99, 0.95)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}
                    >
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                            <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                                <CheckCircle2 size={64} color="white" />
                            </div>
                            <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Lesson Mastered!</h2>
                            <div style={{ fontSize: 20, fontWeight: 900, color: '#F59E0B', marginBottom: 8 }}>+150 XP AWARDED</div>
                            <p style={{ color: '#94A3B8', fontWeight: 600 }}>Returning to hub...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
