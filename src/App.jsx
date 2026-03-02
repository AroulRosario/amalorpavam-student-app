import { useApp } from './context/AppContext'
import Toast from './components/Toast'
import BottomNav from './components/BottomNav'

// Pages
import Login from './pages/Login'
import MobileHome from './pages/MobileHome'
import MobileLearning from './pages/MobileLearning'
import MobileSchedule from './pages/MobileSchedule'
import MobileProfile from './pages/MobileProfile'
import MobileCanteen from './pages/MobileCanteen'
import DigitalID from './pages/DigitalID'
import CoursePlayer from './pages/CoursePlayer'

// Modals
import {
    UploadContentModal, FeeReminderModal, AppointmentModal, SystemSettingsModal
} from './components/Modals'

// ── Modal dispatcher ──────────────────────
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

// ── App Shell ───────────────────────────
export default function App() {
    const { activePage, user, loading } = useApp()

    // Loading screen for 'proper' app feel
    if (loading) {
        return (
            <div className="mobile-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 80, height: 80, background: 'linear-gradient(135deg, #1034A6, #4F83EE)',
                        borderRadius: 24, margin: '0 auto 24px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', color: 'white',
                        fontSize: 40, fontWeight: 900, boxShadow: '0 20px 40px rgba(16, 52, 166, 0.15)',
                        animation: 'float 2s ease-in-out infinite'
                    }}>A</div>
                    <div className="spinner-small" style={{ margin: '0 auto', borderColor: 'rgba(16, 52, 166, 0.1)', borderTopColor: '#1034A6' }} />
                </div>
                <style>{`
          @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
          .spinner-small { width: 24px; height: 24px; border: 3px solid; border-radius: 50%; animation: spin 0.8s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
            </div>
        )
    }

    // Handle routing
    const pageContent = {
        login: <Login />,
        'mobile-home': <MobileHome />,
        'mobile-learning': <MobileLearning />,
        'mobile-schedule': <MobileSchedule />,
        'mobile-profile': <MobileProfile />,
        'mobile-canteen': <MobileCanteen />,
        'digital-id': <DigitalID />,
        'course-player': <CoursePlayer />,
    }

    // Proper Auth Protection
    const activeView = (user || activePage === 'login') ? pageContent[activePage] : <Login />

    // Conditionally show Nav (Hide on ID and Player for full screen content)
    const showNav = user && activePage !== 'login' && activePage !== 'digital-id' && activePage !== 'course-player'

    return (
        <div className="mobile-shell">
            {activeView || <MobileHome />}
            {showNav && <BottomNav />}
            <ModalDispatcher />
            <Toast />
        </div>
    )
}
