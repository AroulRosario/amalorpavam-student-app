import { useApp } from '../context/AppContext'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const iconMap = {
    success: <CheckCircle size={20} color="#10B981" />,
    error: <XCircle size={20} color="#EF4444" />,
    warning: <AlertTriangle size={20} color="#F59E0B" />,
    info: <Info size={20} color="#1E50E2" />,
}

export default function Toast() {
    const { toasts, addToast } = useApp()

    return (
        <div className="toast-container">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="toast"
                    >
                        {iconMap[t.type]}
                        <span style={{ fontSize: 13, fontWeight: 800 }}>{t.msg}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
