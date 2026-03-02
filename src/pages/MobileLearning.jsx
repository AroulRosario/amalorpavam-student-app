import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play, Book, FileText, CheckCircle2,
    ChevronRight, Search, Zap, Clock
} from 'lucide-react'

export default function MobileLearning() {
    const { setActivePage } = useApp()

    const courses = [
        { id: 1, title: 'Mathematics', instructor: 'Ms. Anitha K.', progress: 75, next: 'Calculus: Unit 4 Review', image: '📐' },
        { id: 2, title: 'Physics', instructor: 'Mr. Rajan S.', progress: 45, next: 'Optics: Reflection & Refraction', image: '🧪' },
        { id: 3, title: 'Chemistry', instructor: 'Ms. Priya M.', progress: 90, next: 'Organic: Benzene Rings', image: '⚗️' },
    ]

    const resources = [
        { title: 'Video Lectures', icon: Play, desc: 'Watch recorded unit sessions', color: '#1E50E2', bg: '#E8EFFD' },
        { title: 'Study Materials', icon: FileText, desc: 'Download PDFs & Notes', color: '#10B981', bg: '#D1FAE5' },
        { title: 'Unit Quizzes', icon: Zap, desc: 'Assess your knowledge', color: '#F59E0B', bg: '#FEF3C7' },
    ]

    return (
        <div className="mobile-page">
            {/* Learning Header */}
            <div style={{ marginBottom: 32, marginTop: 12 }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', margin: 0 }}>Learning Hub</h2>
                <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Level up your skills with immersive lessons</p>
            </div>

            {/* Resource Launchers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 40 }}>
                {resources.map((r, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActivePage('course-player')}
                        className="premium-card"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 20,
                            cursor: 'pointer', padding: '20px 24px'
                        }}
                    >
                        <div style={{
                            width: 56, height: 56, borderRadius: 18, background: r.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <r.icon size={26} color={r.color} fill={r.icon === Play ? r.color : 'none'} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A' }}>{r.title}</div>
                            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{r.desc}</div>
                        </div>
                        <ChevronRight size={20} color="#CBD5E1" />
                    </motion.div>
                ))}
            </div>

            {/* Active Courses */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0, color: '#0A2463' }}>Recent Courses</h3>
                <span style={{ fontSize: 13, color: '#1E50E2', fontWeight: 800, cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {courses.map(c => (
                    <motion.div
                        key={c.id}
                        className="premium-card"
                        style={{ padding: '24px' }}
                    >
                        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                            <div style={{ fontSize: 40 }}>{c.image}</div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: '#0F172A' }}>{c.title}</h4>
                                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{c.instructor}</div>
                            </div>
                        </div>
                        <div style={{ background: '#F1F5F9', borderRadius: 20, padding: '16px 20px', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <Clock size={14} color="#64748B" />
                                <span style={{ fontSize: 12, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Continue Next</span>
                            </div>
                            <div style={{ fontWeight: 800, fontSize: 15, color: '#1034A6' }}>{c.next}</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: 12, fontWeight: 800, color: '#64748B' }}>COURSE PROGRESS</span>
                                <span style={{ fontSize: 12, fontWeight: 900, color: '#1034A6' }}>{c.progress}%</span>
                            </div>
                            <div style={{ height: 10, background: '#E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${c.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    style={{ height: '100%', background: 'linear-gradient(90deg, #1034A6, #4F83EE)', borderRadius: 8 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Spacer */}
            <div style={{ height: 40 }} />
        </div>
    )
}
