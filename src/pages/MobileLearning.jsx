import { useApp } from '../context/AppContext'
import { Search, Play, FileText, Lightbulb, MessageSquare, TrendingUp, BookOpen, Award } from 'lucide-react'

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
    const { content, addToast } = useApp()

    const studyResources = [
        { icon: Play, color: '#EF4444', bg: '#FEE2E2', label: 'Video Lectures' },
        { icon: FileText, color: '#1E50E2', bg: '#E8EFFD', label: 'Study Notes' },
        { icon: Lightbulb, color: '#F59E0B', bg: '#FEF3C7', label: 'Flashcards' },
        { icon: MessageSquare, color: '#10B981', bg: '#D1FAE5', label: 'AI Tutor' },
    ]

    const perfData = [
        { month: 'Oct', score: 78 }, { month: 'Nov', score: 82 }, { month: 'Dec', score: 85 },
        { month: 'Jan', score: 89 }, { month: 'Feb', score: 91 }, { month: 'Mar', score: 94 }
    ]

    return (
        <div className="mobile-page">
            <header className="mobile-header">
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A2463', margin: 0 }}>Learning Hub</h2>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={20} color="#1E50E2" />
                </div>
            </header>

            {/* Performance Analytics */}
            <div style={{ margin: '0 20px 24px', padding: 20, background: 'white', borderRadius: 24, border: '1.5px solid #F1F5F9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 2 }}>ACADEMIC TREND</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A' }}>94.2% Overall</div>
                    </div>
                    <div style={{ padding: '4px 8px', background: '#D1FAE5', color: '#065F46', borderRadius: 6, fontSize: 10, fontWeight: 800 }}>+3.2% ↑</div>
                </div>
                <PerformanceChart data={perfData} />
            </div>

            {/* Resource Grid */}
            <div style={{ padding: '0 20px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {studyResources.map((res, i) => (
                        <div key={i} className="module-card" style={{ margin: 0, padding: 20, textAlign: 'center' }} onClick={() => addToast(`Opening ${res.label}...`, 'info')}>
                            <div style={{ background: res.bg, width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                                <res.icon size={24} color={res.color} />
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>{res.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subject Progress */}
            <div style={{ padding: '0 20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 800 }}>Subject Progress</h2>
                    <span style={{ fontSize: 12, color: '#1E50E2', fontWeight: 700 }}>Curriculum</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                        { sub: 'Mathematics', prog: 85, color: '#1E50E2' },
                        { sub: 'Physics', prog: 72, color: '#F59E0B' },
                        { sub: 'Chemistry', prog: 64, color: '#EF4444' }
                    ].map((s, i) => (
                        <div key={i} style={{ padding: 16, background: '#F8FAFC', borderRadius: 18, border: '1px solid #E2E8F0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <BookOpen size={16} color={s.color} />
                                    <span style={{ fontWeight: 800, fontSize: 14 }}>{s.sub}</span>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 800, color: s.color }}>{s.prog}%</span>
                            </div>
                            <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${s.prog}%`, background: s.color, borderRadius: 3 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Quiz CTA */}
            <div style={{ margin: '0 20px 100px', padding: 20, background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: 24, color: 'white', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={28} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>Weekend Mock Test</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>30 Questions · 45 Mins</div>
                </div>
                <button style={{ padding: '8px 16px', borderRadius: 10, background: 'white', color: '#059669', border: 'none', fontWeight: 800, fontSize: 12 }}>
                    Start
                </button>
            </div>

        </div>
    )
}
