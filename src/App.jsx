import { useApp } from './context/AppContext'
import Toast from './components/Toast'
import BottomNav from './components/BottomNav'

// Mobile Pages
import MobileHome from './pages/MobileHome'
import MobileLearning from './pages/MobileLearning'
import MobileSchedule from './pages/MobileSchedule'
import MobileProfile from './pages/MobileProfile'
import DigitalID from './pages/DigitalID'

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
    const normalizedPage = activePage.startsWith('mobile-') || activePage === 'digital-id' ? activePage : 'mobile-home'

    const pageContent = {
        'mobile-home': <MobileHome />,
        'mobile-learning': <MobileLearning />,
        'mobile-schedule': <MobileSchedule />,
        'mobile-profile': <MobileProfile />,
        'digital-id': <DigitalID />,
    }

    // Hide bottom nav if on Digital ID for a cleaner look
    const showNav = activePage !== 'digital-id'

    return (
        <div className="mobile-shell">
            {pageContent[normalizedPage] || <MobileHome />}
            {showNav && <BottomNav />}
            <ModalDispatcher />
            <Toast />
        </div>
    )
}
