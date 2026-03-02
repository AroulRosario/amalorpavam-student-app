import { useApp } from '../context/AppContext'
import { Search, Play, FileText, Lightbulb, MessageSquare, TrendingUp, BookOpen, Award, BarChart3, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

// Tiny performance chart for mobile
function PerformanceChart({ data }) {
    const max = Math.max(...data.map(d => d.score))
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, padding: '20px 0 10px' }}>
            {data.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                        width: '100%',
                        background: i === data.length - 1 ? 'linear-gradient(to top, #1034A6, #4F83EE)' : '#E2E8F0',
                        height: `${(d.score / max) * 100}%`,
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.3s ease'
                    }} />
                    <span style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700 }}>{d.month}</span>
                </div>
            ))}
        </div>
    )
}

export default function MobileLearning() {
    const { addToast, setActivePage, xp, level } = useApp()

    const studyResources = [
        { icon: Play, color: '#EF4444', bg: '#FEE2E2', label: 'Video Lectures', action: () => setActivePage('course-player') },
        { icon: FileText, color: '#1E50E2', bg: '#E8EFFD', label: 'Study Notes', action: () => addToast('Opening notes...', 'info') },
        { icon: Lightbulb, color: '#F59E0B', bg: '#FEF3C7', label: 'Flashcards', action: () => addToast('Starting flashcards...', 'info') },
        { icon: MessageSquare, color: '#10B981', bg: '#D1FAE5', label: 'AI Tutor', action: () => addToast('AI Tutor connecting...', 'info') },
    ]

    const perfData = [
        { month: 'Oct', score: 78 }, { month: 'Nov', score: 82 }, { month: 'Dec', score: 85 },
        { month: 'Jan', score: 89 }, { month: 'Feb', score: 91 }, { month: 'Mar', score: 94 }
    ]

    return (
        <div className="mobile-page">
            <header className="mobile-header">
                <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0A2463', margin: 0 }}>Learning Hub</h2>
                    <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Master your path to Unit 4</p>
                </div>
                <div style={{ padding: '8px 12px', background: 'white', border: '1.5px solid #F1F5F9', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <BarChart3 size={16} color="#1E50E2" />
                    <span style={{ fontSize: 12, fontWeight: 800 }}>Lvl {level}</span>
                </div>
            </header>

            {/* Performance Analytics */}
            <div style={{ margin: '0 24px 24px', padding: 24, background: 'white', borderRadius: 32, border: '1.5px solid #F1F5F9', boxShadow: '0 8px 16px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', letterSpacing: 1 }}>RANK #1 · ACADEMIC HUB</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A' }}>94.2% Overall</div>
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ padding: '6px 10px', background: '#D1FAE5', color: '#065F46', borderRadius: 10, fontSize: 11, fontWeight: 900 }}
                    >
                        +12% ↑
                    </motion.div>
                </div>
                <PerformanceChart data={perfData} />
            </div>

            {/* Resource Grid */}
            <div style={{ padding: '0 24px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {studyResources.map((res, i) => (
                        <motion.div
                            key={i}
                            whileTap={{ scale: 0.96 }}
                            className="module-card"
                            style={{ margin: 0, padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            onClick={res.action}
                        >
                            <div style={{ background: res.bg, width: 56, height: 56, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                <res.icon size={28} color={res.color} />
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 900, color: '#0F172A' }}>{res.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recommended Lessons */}
            <div style={{ padding: '0 24px 100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>For You</h2>
                    <span style={{ fontSize: 12, color: '#1E50E2', fontWeight: 800 }}>See All</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                        { title: 'Calculus: Derivatives', sub: 'Mathematics', xp: '150 XP', color: '#1E50E2', bg: '#E8EFFD' },
                        { title: 'Ray Optics: Part 2', sub: 'Physics', xp: '120 XP', color: '#F59E0B', bg: '#FEF3C7' },
                    ].map((lesson, i) => (
                        <motion.div
                            key={i}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActivePage('course-player')}
                            style={{ padding: 20, background: 'white', borderRadius: 28, border: '1.5px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 16 }}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: lesson.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: lesson.color }}>
                                <Play size={20} fill={lesson.color} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 10, fontWeight: 900, color: lesson.color, textTransform: 'uppercase' }}>{lesson.sub}</div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{lesson.title}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 11, fontWeight: 900, color: '#10B981' }}>{lesson.xp}</div>
                                <ChevronRight size={16} color="#CBD5E1" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    )
}
