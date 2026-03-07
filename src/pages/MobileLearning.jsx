import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import {
    Play, FileText, ChevronRight, Zap, Clock
} from 'lucide-react'

export default function MobileLearning() {
    const { setActivePage, myTeachers, syllabus } = useApp()

    const subjectData = myTeachers.map(t => {
        const subSyllabus = syllabus.filter(s => s.subject === t.assignedSubject)
        const completed = subSyllabus.filter(s => s.status === 'Completed').length
        const total = subSyllabus.length || 1
        const progress = Math.round((completed / total) * 100)
        const next = subSyllabus.find(s => s.status !== 'Completed') || { title: 'All Units Completed!' }

        return {
            id: t.id,
            title: t.assignedSubject,
            instructor: t.name,
            progress,
            next: next.title,
            image: t.assignedSubject === 'Mathematics' ? '📐' : t.assignedSubject === 'Physics' ? '🧪' : '⚗️',
            units: subSyllabus
        }
    })

    const resources = [
        { title: 'Video Lectures', icon: Play, desc: 'Watch recorded unit sessions', color: '#1E50E2', bg: '#E8EFFD' },
        { title: 'Study Materials', icon: FileText, desc: 'Download PDFs & Notes', color: '#10B981', bg: '#D1FAE5' },
        { title: 'Unit Quizzes', icon: Zap, desc: 'Assess your knowledge', color: '#F59E0B', bg: '#FEF3C7' },
    ]

    return (
        <div className="mobile-page">
            <div style={{ marginBottom: 32, marginTop: 12 }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', margin: 0 }}>Learning Hub</h2>
                <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Structured lessons from your teachers</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 40 }}>
                {resources.map((r, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        className="premium-card"
                        style={{ display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer', padding: '20px 24px' }}
                    >
                        <div style={{ width: 56, height: 56, borderRadius: 18, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 20, color: '#0A2463' }}>Your Subjects</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {subjectData.map(c => (
                    <motion.div
                        key={c.id}
                        className="premium-card"
                        style={{ padding: '24px' }}
                        onClick={() => {
                            localStorage.setItem('amal_selected_subject', c.title)
                            setActivePage('course-player')
                        }}
                    >
                        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                            <div style={{ fontSize: 40 }}>{c.image}</div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: '#0F172A' }}>{c.title}</h4>
                                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{c.instructor}</div>
                            </div>
                        </div>
                        <div style={{ background: '#F8FAFC', borderRadius: 20, padding: '16px 20px', marginBottom: 20, border: '1px solid #F1F5F9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <Clock size={14} color="#64748B" />
                                <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>NEXT UP</span>
                            </div>
                            <div style={{ fontWeight: 800, fontSize: 15, color: '#1E50E2' }}>{c.next}</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>SYLLABUS PROGRESS</span>
                                <span style={{ fontSize: 11, fontWeight: 900, color: '#1E50E2' }}>{c.progress}%</span>
                            </div>
                            <div style={{ height: 8, background: '#F1F5F9', borderRadius: 8, overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${c.progress}%` }}
                                    transition={{ duration: 1 }}
                                    style={{ height: '100%', background: 'linear-gradient(90deg, #1E50E2, #6366F1)', borderRadius: 8 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
                {subjectData.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8', fontWeight: 600 }}>No classes assigned yet.</div>}
            </div>
        </div>
    )
}
