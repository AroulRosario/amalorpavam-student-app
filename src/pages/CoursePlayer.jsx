import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play, Pause, SkipBack, SkipForward, Volume2,
    Settings, Maximize, FileText, HelpCircle, ArrowLeft,
    CheckCircle2, Star, Download, Bookmark
} from 'lucide-react'

export default function CoursePlayer() {
    const { setActivePage, gainXp, syllabus } = useApp()
    const subject = localStorage.getItem('amal_selected_subject') || 'Mathematics'
    const subjectUnits = syllabus.filter(s => s.subject === subject).sort((a, b) => a.unitId.localeCompare(b.unitId))

    const [activeUnitIdx, setActiveUnitIdx] = useState(0)
    const unit = subjectUnits[activeUnitIdx]

    const [isPlaying, setIsPlaying] = useState(false)
    const [activeTab, setActiveTab] = useState('video')
    const [completed, setCompleted] = useState(false)

    const isLocked = unit?.status !== 'Completed'

    const handleComplete = () => {
        setCompleted(true)
        gainXp(150)
        setTimeout(() => setActivePage('mobile-learning'), 2500)
    }

    if (!unit) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: 'white', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontWeight: 900 }}>No Syllabus Found</h2>
            <button onClick={() => setActivePage('mobile-learning')} className="btn-primary">Return Home</button>
        </div>
    )

    return (
        <div className="mobile-page" style={{ padding: 0, background: '#0F172A', color: 'white', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <button onClick={() => setActivePage('mobile-learning')} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeft size={20} /></button>
                <div>
                    <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>{subject}</h2>
                    <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Unit {unit.unitId}: {unit.title}</p>
                </div>
            </div>

            {/* Main Interactive Stage */}
            <div style={{ position: 'relative', background: 'black', aspectRatio: '16/9', overflow: 'hidden' }}>
                {isLocked ? (
                    <div style={{ position: 'absolute', inset: 0, zisIndex: 10, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 30 }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                            <Settings size={32} color="#94A3B8" />
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Lesson Locked</h3>
                        <p style={{ fontSize: 13, color: '#94A3B8' }}>Your teacher is currently preparing this module. It will unlock once completed in class.</p>
                    </div>
                ) : (
                    <>
                        <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80" alt="Video" style={{ width: '100%', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsPlaying(!isPlaying)} style={{ width: 70, height: 70, borderRadius: '50%', background: '#1E50E2', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(30, 80, 226, 0.5)' }}>
                                {isPlaying ? <Pause size={30} fill="white" /> : <Play size={30} fill="white" style={{ marginLeft: 4 }} />}
                            </motion.button>
                        </div>
                    </>
                )}
            </div>

            {/* Unit Selector Strip */}
            <div style={{ padding: '16px 20px', display: 'flex', gap: 10, overflowX: 'auto', background: '#1E293B' }}>
                {subjectUnits.map((u, i) => (
                    <button key={i} onClick={() => { setActiveUnitIdx(i); setIsPlaying(false); setActiveTab('video') }} style={{
                        flexShrink: 0, padding: '8px 16px', borderRadius: 12, border: 'none', background: activeUnitIdx === i ? '#1E50E2' : 'rgba(255,255,255,0.05)', color: activeUnitIdx === i ? 'white' : '#94A3B8', fontSize: 12, fontWeight: 800
                    }}>
                        Unit {u.unitId} {u.status !== 'Completed' ? '🔒' : '✓'}
                    </button>
                ))}
            </div>

            {/* Content Tabs */}
            <div style={{ background: '#111827', padding: '32px 24px', borderRadius: '40px 40px 0 0', marginTop: -20, minHeight: '50vh' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
                    {['video', 'notes', 'ppt', 'quiz'].map(tab => (
                        <button key={tab} onClick={() => !isLocked && setActiveTab(tab)} style={{
                            flex: 1, padding: '12px', borderRadius: 16, border: 'none', background: activeTab === tab ? 'white' : 'transparent', color: activeTab === tab ? '#0F172A' : '#64748B', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', opacity: isLocked ? 0.3 : 1
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {!isLocked && activeTab === 'video' && (
                        <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>{unit.title}</h3>
                            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{unit.desc}</p>
                            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                                <button style={{ flex: 1, padding: 18, borderRadius: 16, background: '#1F2937', border: 'none', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Bookmark size={18} /> Bookmark</button>
                                <button style={{ flex: 1, padding: 18, borderRadius: 16, background: '#1F2937', border: 'none', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Download size={18} /> Offline</button>
                            </div>
                        </motion.div>
                    )}
                    {!isLocked && activeTab === 'notes' && (
                        <motion.div key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                <FileText size={32} color="#1E50E2" />
                                <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 16 }}>{unit.title}_Notes.pdf</div><div style={{ fontSize: 12, color: '#94A3B8' }}>Available for Reading</div></div>
                            </div>
                            <button style={{ width: '100%', padding: 16, borderRadius: 14, background: '#1E50E2', border: 'none', color: 'white', fontWeight: 900 }}>Read Document</button>
                        </motion.div>
                    )}
                    {!isLocked && activeTab === 'quiz' && (
                        <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '10px 0' }}>
                            <Star size={48} color="#F59E0B" fill="#F59E0B" style={{ marginBottom: 16 }} />
                            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Unit Mastery Quiz</h3>
                            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 32 }}>Test your understanding and earn bonus XP!</p>
                            <button onClick={handleComplete} style={{ width: '100%', padding: 22, borderRadius: 20, background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', color: 'white', fontWeight: 900, fontSize: 16 }}>Complete Unit & Earn 150 XP</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Completion Overlay */}
            <AnimatePresence>
                {completed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(10, 36, 99, 0.98)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
                        <div><CheckCircle2 size={80} color="#10B981" style={{ marginBottom: 32 }} /><h2 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Excellent!</h2><p style={{ fontSize: 18, color: '#F59E0B', fontWeight: 900, marginTop: 12 }}>+150 XP AWARDED</p></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
