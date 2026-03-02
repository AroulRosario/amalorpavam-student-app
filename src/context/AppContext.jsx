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
    const [news, setNews] = useState([
        { id: 1, title: 'Term 2 Schedule Out', date: 'Mar 02, 2026', type: 'Academic', content: 'Check the schedule tab for updated exam timings.', urgent: true },
        { id: 2, title: 'Annual Day Rehearsals', date: 'Mar 01, 2026', type: 'Event', content: 'Auditorium sessions start Monday.', urgent: false }
    ])
    const [liveClasses, setLiveClasses] = useState([
        { id: 1, subject: 'Mathematics', teacher: 'Ms. Anitha K.', time: '09:30 AM', status: 'Live', link: '#' },
        { id: 2, subject: 'Physics', teacher: 'Mr. Rajan S.', time: '11:00 AM', status: 'Scheduled', link: '#' }
    ])
    const [appConfig, setAppConfig] = useState({
        studentAppBroadcast: 'Welcome to the Amalorpavam Student Portal!'
    })

    // --- UI State ---
    const [activePage, setActivePage] = useState(user ? 'mobile-home' : 'login')
    const [toasts, setToasts] = useState([])
    const [modal, setModal] = useState(null)

    useEffect(() => {
        // Splash delay
        setTimeout(() => setLoading(false), 1500)
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
            // 1. Check Student Database
            const dbStr = localStorage.getItem(STUDENT_DB_KEY)
            let db = dbStr ? JSON.parse(dbStr) : []

            // 2. HARDCODED FALLBACK (To ensure demo always works)
            const fallbackUser = {
                id: 999,
                name: 'Kavya Nair',
                email: 'kavya@student.ahss.edu',
                roll: '04',
                password: 'password123',
                class: 'XII-A',
                avatar: '👩‍🎓'
            }

            // Merge fallback if not exists
            if (!db.find(s => s.roll === '04')) {
                db.push(fallbackUser)
            }

            // 3. Search for matching student
            const student = db.find(s =>
                (s.email?.toLowerCase() === identifier.toLowerCase() || s.roll === identifier) &&
                s.password === password
            )

            if (student) {
                // Success
                setUser(student)
                localStorage.setItem('amal_active_user', JSON.stringify(student))
                setActivePage('mobile-home')
                addToast(`Welcome back, ${student.name}!`, 'success')
            } else {
                // Failure
                addToast('Invalid credentials. Check Email/Roll & Password.', 'error')
            }
            setLoading(false)
        }, 1500)
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
