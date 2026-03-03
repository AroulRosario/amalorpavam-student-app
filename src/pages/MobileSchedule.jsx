import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, Video, Users, ChevronRight } from 'lucide-react'

const FULL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const SHORT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function MobileSchedule() {
    const { timetable, liveClasses } = useApp()
    const [dayIdx, setDayIdx] = useState(new Date().getDay() === 0 ? 0 : Math.min(new Date().getDay() - 1, 5))

    const selectedDay = FULL_DAYS[dayIdx]
    const dayEntry = timetable.find(t => t.day === selectedDay)
    const periods = dayEntry?.periods || []

    return (
        <div className="mobile-page">
            <div style={{ marginBottom: 32, marginTop: 12 }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', margin: 0 }}>My Schedule</h2>
                <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Your class timetable · synced from Admin</p>
            </div>

            {/* Day Selector */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }}>
                {SHORT_DAYS.map((d, i) => (
                    <motion.div
                        key={d}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDayIdx(i)}
                        style={{
                            minWidth: 64, height: 80, borderRadius: 20,
                            background: i === dayIdx ? '#1034A6' : 'white',
                            color: i === dayIdx ? 'white' : '#64748B',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', gap: 4, cursor: 'pointer',
                            boxShadow: i === dayIdx ? '0 10px 20px rgba(16, 52, 166, 0.2)' : 'none',
                            border: i === dayIdx ? 'none' : '1.5px solid #F1F5F9'
                        }}
                    >
                        <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>{d}</span>
                        <span style={{ fontSize: 18, fontWeight: 900 }}>{String(i + 1).padStart(2, '0')}</span>
                    </motion.div>
                ))}
            </div>

            {/* Live Indicator */}
            {liveClasses?.some(c => c.status === 'Live') && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0, color: '#0A2463' }}>Current Sessions</h3>
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FEE2E2', padding: '6px 12px', borderRadius: 100 }}
                    >
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                        <span style={{ fontSize: 11, fontWeight: 900, color: '#EF4444' }}>LIVE NOW</span>
                    </motion.div>
                </div>
            )}

            {/* Timeline */}
            {periods.length === 0 ? (
                <div className="premium-card" style={{ textAlign: 'center', padding: 48 }}>
                    <CalendarIcon size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                    <div style={{ fontWeight: 800, color: '#94A3B8', fontSize: 16 }}>No classes on {selectedDay}</div>
                    <div style={{ fontSize: 13, color: '#CBD5E1', marginTop: 4 }}>Check another day or ask your Admin to publish the schedule.</div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {periods.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card"
                            style={{
                                display: 'flex', gap: 20, padding: '20px 24px',
                                borderLeft: '5px solid #1034A6'
                            }}
                        >
                            <div style={{ minWidth: 70, borderRight: '1.5px solid #F1F5F9', paddingRight: 12 }}>
                                <div style={{ fontSize: 14, fontWeight: 900, color: '#0A2463' }}>{item.time.split('–')[0]?.trim() || item.time}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#0F172A' }}>{item.subject}</h4>
                                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginTop: 4 }}>
                                    <Clock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />{item.time}
                                </div>
                            </div>
                            <ChevronRight size={20} color="#CBD5E1" />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
