import { useApp } from './context/AppContext'
import Toast from './components/Toast'
import BottomNav from './components/BottomNav'

// Mobile Pages
import MobileHome from './pages/MobileHome'
import MobileLearning from './pages/MobileLearning'
import MobileSchedule from './pages/MobileSchedule'
import MobileProfile from './pages/MobileProfile'

// Modals
import {
    UploadContentModal, FeeReminderModal, AppointmentModal, SystemSettingsModal
} from './components/Modals'

// ── Modal dispatcher (Reduced for Student) ──────────────────────
function ModalDispatcher() {
    const { modal } = useApp()
    if (!modal) return null
    const map = {
        uploadContent: <UploadContentModal />,
        feeReminder: <FeeReminderModal />,
        addAppointment: <AppointmentModal />,
        systemSettings: <SystemSettingsModal />,
    }
    return map[modal.type] || null
}

// ── App Shell (Purely Mobile Student) ───────────────────────────
export default function App() {
    const { activePage } = useApp()

    // Default to mobile-home if not set or if admin page accidentally triggered
    const normalizedPage = activePage.startsWith('mobile-') ? activePage : 'mobile-home'

    const pageContent = {
        'mobile-home': <MobileHome />,
        'mobile-learning': <MobileLearning />,
        'mobile-schedule': <MobileSchedule />,
        'mobile-profile': <MobileProfile />,
    }

    return (
        <div className="mobile-shell">
            {pageContent[normalizedPage] || <MobileHome />}
            <BottomNav />
            <ModalDispatcher />
            <Toast />
        </div>
    )
}
