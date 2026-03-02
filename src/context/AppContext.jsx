import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    // --- Auth & User State ---
    const [user, setUser] = useState(null) // null = not logged in
    const [loading, setLoading] = useState(true)

    // --- Gamification ---
    const [xp, setXp] = useState(1250)
    const [level, setLevel] = useState(12)
    const [streak, setStreak] = useState(5)
    const [points, setPoints] = useState(450)

    // --- Mock Data ---
    const [students] = useState([
        { id: 1, name: 'Kavya Nair', class: 'XII-A', roll: '04', fee: 'Paid', status: 'Active' },
    ])

    const [news, setNews] = useState([
        { id: 1, title: 'School Reopens after Holidays', date: 'Mar 01, 2026', type: 'General', content: 'We welcome all students back for the new term!', urgent: true },
        { id: 2, title: 'Volleyball District Champions!', date: 'Feb 28, 2026', type: 'Sports', content: 'Our senior boys team clinced the trophy.', image: true },
    ])

    const [liveClasses, setLiveClasses] = useState([
        { id: 1, subject: 'Mathematics', teacher: 'Ms. Anitha K.', time: '09:30 AM', status: 'Live', link: '#' },
        { id: 2, subject: 'Physics', teacher: 'Mr. Rajan S.', time: '11:00 AM', status: 'Scheduled', link: '#' }
    ])

    const [homework, setHomework] = useState([
        { id: 1, sub: 'Mathematics', topic: 'Exercise 8.2', deadline: 'Mar 04', done: false },
        { id: 2, sub: 'Physics', topic: 'Ray Diagrams', deadline: 'Mar 05', done: true },
    ])

    const [appConfig] = useState({
        studentAppBroadcast: 'Final Exams start in 15 days! Keep pushing! 🔥'
    })

    // --- UI State ---
    const [activePage, setActivePage] = useState('login')
    const [toasts, setToasts] = useState([])
    const [modal, setModal] = useState(null)

    useEffect(() => {
        // Simulate initial load
        setTimeout(() => setLoading(false), 1000)
    }, [])

    const addToast = (msg, type = 'success') => {
        const id = Date.now()
        setToasts(t => [...t, { id, msg, type }])
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
    }

    const login = (email, password) => {
        setLoading(true)
        setTimeout(() => {
            setUser({ name: 'Kavya Nair', email: 'kavya.nair@student.ahss.edu', avatar: '👩‍🎓' })
            setActivePage('mobile-home')
            setLoading(false)
            addToast('Welcome back, Kavya!', 'success')
        }, 1500)
    }

    const logout = () => {
        setUser(null)
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
            news, liveClasses, homework, appConfig,
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
