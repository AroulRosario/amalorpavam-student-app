import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

// Shared key for cross-app "database" simulation
const STUDENT_DB_KEY = 'amal_student_db'

export function AppProvider({ children }) {
    // --- Auth & User State ---
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('amal_active_user')
        return saved ? JSON.parse(saved) : null
    })
    const [loading, setLoading] = useState(true)

    // --- Gamification ---
    const [xp, setXp] = useState(1250)
    const [level, setLevel] = useState(12)
    const [streak, setStreak] = useState(5)
    const [points, setPoints] = useState(450)

    // --- News & Classes (Sync'd from Admin) ---
    const [news, setNews] = useState([])
    const [liveClasses, setLiveClasses] = useState([])
    const [appConfig, setAppConfig] = useState({
        studentAppBroadcast: 'Welcome to the Amalorpavam Student Portal!'
    })

    // --- UI State ---
    const [activePage, setActivePage] = useState(user ? 'mobile-home' : 'login')
    const [toasts, setToasts] = useState([])
    const [modal, setModal] = useState(null)

    useEffect(() => {
        // Simulate initial load / Splash
        setTimeout(() => setLoading(false), 1200)

        // In a real app, we'd fetch these from an API. 
        // Here we wrap it in an effect to show "live" feel.
        const syncData = () => {
            // Mock data if no admin sync yet, but normally would read from localStorage/API
            // For this demo, let's keep some defaults but allow Admin to overwrite
        }
        syncData()
    }, [])

    const addToast = (msg, type = 'success') => {
        const id = Date.now()
        setToasts(t => [...t, { id, msg, type }])
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
    }

    const login = (identifier, password) => {
        setLoading(true)

        // Simulate network delay
        setTimeout(() => {
            const db = JSON.parse(localStorage.getItem(STUDENT_DB_KEY) || '[]')

            // Look for matching student (Email or Roll Number)
            const student = db.find(s =>
                (s.email?.toLowerCase() === identifier.toLowerCase() || s.roll === identifier) &&
                s.password === password
            )

            if (student) {
                const userData = { ...student, avatar: '👩‍🎓' }
                setUser(userData)
                localStorage.setItem('amal_active_user', JSON.stringify(userData))
                setActivePage('mobile-home')
                addToast(`Welcome back, ${student.name}!`, 'success')
            } else {
                addToast('Invalid credentials. Please check Email/Roll and Password.', 'error')
            }
            setLoading(false)
        }, 1000)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('amal_active_user')
        setActivePage('login')
        addToast('Logged out successfully', 'info')
    }

    const gainXp = (amount) => {
        setXp(prev => prev + amount)
        addToast(`+${amount} XP Gained!`, 'info')
    }

    return (
        <AppContext.Provider value={{
            user, login, logout, xp, level, streak, points, gainXp,
            news, liveClasses, appConfig,
            activePage, setActivePage,
            toasts, addToast,
            modal, setModal,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
