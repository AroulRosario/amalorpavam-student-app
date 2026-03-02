import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, Video, Users, ChevronRight } from 'lucide-react'

export default function MobileSchedule() {
    const { liveClasses } = useApp()

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const selectedDay = 'Mon'

    const schedule = [
        { time: '08:30 AM', subject: 'Mathematics', teacher: 'Ms. Anitha K.', room: 'Room 302', type: 'Offline' },
        { time: '10:00 AM', subject: 'Physics', teacher: 'Mr. Rajan S.', room: 'Lab 1', type: 'Offline' },
        { time: '11:30 AM', subject: 'English', teacher: 'Ms. Sarah J.', room: 'Room 405', type: 'Offline' },
        { time: '02:00 PM', subject: 'Computer Science', teacher: 'Mr. Vignesh', room: 'Online', type: 'Live' },
    ]

    return (
        <div className="mobile-page">
            {/* Schedule Header */}
            <div style={{ marginBottom: 32, marginTop: 12 }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', margin: 0 }}>My Schedule</h2>
                <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Stay on track with your daily classes</p>
            </div>

            {/* Day Selector */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }}>
                {days.map(d => (
                    <motion.div
                        key={d}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            minWidth: 64, height: 80, borderRadius: 20,
                            background: d === selectedDay ? '#1034A6' : 'white',
                            color: d === selectedDay ? 'white' : '#64748B',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', gap: 4, cursor: 'pointer',
                            boxShadow: d === selectedDay ? '0 10px 20px rgba(16, 52, 166, 0.2)' : 'none',
                            border: d === selectedDay ? 'none' : '1.5px solid #F1F5F9'
                        }}
                    >
                        <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>{d}</span>
                        <span style={{ fontSize: 18, fontWeight: 900 }}>{d === 'Mon' ? '02' : '0' + (days.indexOf(d) + 2)}</span>
                    </motion.div>
                ))}
            </div>

            {/* Live Indicator */}
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

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {schedule.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="premium-card"
                        style={{
                            display: 'flex', gap: 20, padding: '20px 24px',
                            borderLeft: item.type === 'Live' ? '5px solid #EF4444' : '5px solid #1034A6'
                        }}
                    >
                        <div style={{ minWidth: 70, borderRight: '1.5px solid #F1F5F9', paddingRight: 12 }}>
                            <div style={{ fontSize: 14, fontWeight: 900, color: '#0A2463' }}>{item.time.split(' ')[0]}</div>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>{item.time.split(' ')[1]}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#0F172A' }}>{item.subject}</h4>
                                {item.type === 'Live' ? <Video size={16} color="#EF4444" /> : <Users size={16} color="#1034A6" />}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                                    <Users size={12} /> {item.teacher}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                                    <MapPin size={12} /> {item.room}
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={20} color="#CBD5E1" />
                    </motion.div>
                ))}
            </div>

            {/* Bottom Spacer */}
            <div style={{ height: 40 }} />
        </div>
    )
}
