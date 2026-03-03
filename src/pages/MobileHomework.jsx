import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Clock, BookOpen, AlertCircle, ChevronRight, Check } from 'lucide-react'

export default function MobileHomework() {
    const { homework, toggleHomeworkStatus, gainXp } = useApp()
    const [filter, setFilter] = useState('pending')

    const filteredHw = homework.filter(hw => {
        if (filter === 'pending') return !hw.done
        if (filter === 'completed') return hw.done
        return true
    })

    const handleToggle = (id, wasDone) => {
        toggleHomeworkStatus(id)
        if (!wasDone) {
            gainXp(50) // Small reward for finishing homework
        }
    }

    return (
        <div className="mobile-page">
            <header className="mobile-header">
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Homework Hub</h1>
                    <p style={{ opacity: 0.6, fontSize: 13, fontWeight: 600 }}>Stay on top of your assignments</p>
                </div>
                <div className="premium-card" style={{ padding: '12px 20px', borderRadius: 20 }}>
                    <span style={{ fontWeight: 800, color: '#1034A6' }}>{homework.filter(h => !h.done).length} Pending</span>
                </div>
            </header>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24, padding: '0 8px' }}>
                {['pending', 'completed', 'all'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: 16,
                            border: 'none',
                            background: filter === f ? '#1034A6' : 'rgba(255,255,255,0.6)',
                            color: filter === f ? 'white' : '#64748B',
                            fontWeight: 800,
                            fontSize: 12,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <AnimatePresence mode="popLayout">
                    {filteredHw.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key="empty"
                            style={{ textAlign: 'center', padding: '40px 20px' }}
                        >
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                            <h3 style={{ fontWeight: 800 }}>All Caught Up!</h3>
                            <p style={{ opacity: 0.6, fontSize: 14 }}>No assignments found in this category.</p>
                        </motion.div>
                    ) : (
                        filteredHw.map((hw, idx) => (
                            <motion.div
                                key={hw.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`premium-card homework-card ${hw.done ? 'done' : ''}`}
                                style={{ padding: 20 }}
                            >
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 16,
                                        background: hw.done ? '#D1FAE5' : '#E0F2FE',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {hw.done ? <CheckCircle size={24} color="#10B981" /> : <BookOpen size={24} color="#1034A6" />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                                            <span className="hw-tag" style={{
                                                background: hw.done ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 52, 166, 0.1)',
                                                color: hw.done ? '#059669' : '#1034A6'
                                            }}>
                                                {hw.sub}
                                            </span>
                                            {!hw.done && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EF4444', fontSize: 11, fontWeight: 800 }}>
                                                    <Clock size={12} /> {hw.deadline}
                                                </div>
                                            )}
                                        </div>
                                        <h3 style={{ fontSize: 17, fontWeight: 800, margin: '4px 0' }}>{hw.topic}</h3>
                                        <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: '8px 0' }}>{hw.desc}</p>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                                            <button
                                                onClick={() => handleToggle(hw.id, hw.done)}
                                                style={{
                                                    background: hw.done ? 'rgba(16, 185, 129, 0.1)' : '#1034A6',
                                                    color: hw.done ? '#059669' : 'white',
                                                    border: 'none',
                                                    padding: '10px 20px',
                                                    borderRadius: 14,
                                                    fontWeight: 800,
                                                    fontSize: 12,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {hw.done ? (
                                                    <> <Check size={14} /> Completed</>
                                                ) : (
                                                    <>Mark as Done</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

        </div>
    )
}
