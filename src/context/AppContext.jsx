import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

// Shared key for cross-app "database" simulation
const STUDENT_DB_KEY = 'amal_student_db'
const HOMEWORK_DB_KEY = 'amal_homework_db'
const NEWS_DB_KEY = 'amal_news_db'
const LIVE_CLASSES_DB_KEY = 'amal_live_classes_db'
const APP_CONFIG_DB_KEY = 'amal_app_config_db'
const TIMETABLE_DB_KEY = 'amal_timetable_db'

export function AppProvider({ children }) {
    // --- Auth & User State ---
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('amal_active_user')
        return saved ? JSON.parse(saved) : null
    })
    const [loading, setLoading] = useState(true)

    // --- Gamification ---
    const [xp, setXp] = useState(1340)
    const [level, setLevel] = useState(13)
    const [streak, setStreak] = useState(6)
    const [points, setPoints] = useState(520)

    // --- Homework (Sync'd from Admin) ---
    const [homework, setHomework] = useState(() => {
        const saved = localStorage.getItem(HOMEWORK_DB_KEY)
        return saved ? JSON.parse(saved) : []
    })

    // Listen for cross-tab storage changes (Admin updates)
    useEffect(() => {
        const handleSync = (e) => {
            if (e.key === HOMEWORK_DB_KEY && e.newValue) {
                setHomework(JSON.parse(e.newValue))
            }
        }
        window.addEventListener('storage', handleSync)
        return () => window.removeEventListener('storage', handleSync)
    }, [])

    const toggleHomeworkStatus = (id) => {
        setHomework(prev => {
            const updated = prev.map(h => h.id === id ? { ...h, done: !h.done } : h)
            localStorage.setItem(HOMEWORK_DB_KEY, JSON.stringify(updated))
            return updated
        })
        addToast('Assignment status updated!', 'info')
    }

    // --- Canteen & Food Ordering ---
    const [cart, setCart] = useState([])
    const [canteenMenu] = useState([
        { id: 1, name: 'Samosa (2pcs)', price: 25, category: 'Snacks', image: '🥟', stock: 50 },
        { id: 2, name: 'Veg Sandwich', price: 45, category: 'Meals', image: '🥪', stock: 30 },
        { id: 3, name: 'Mango Juice', price: 35, category: 'Drinks', image: '🧃', stock: 40 },
        { id: 4, name: 'Chicken Puffs', price: 30, category: 'Snacks', image: '🥐', stock: 25 },
        { id: 5, name: 'Curd Rice', price: 55, category: 'Meals', image: '🍚', stock: 20 },
        { id: 6, name: 'Cold Coffee', price: 50, category: 'Drinks', image: '🧋', stock: 15 },
    ])

    // --- News & Classes (Sync'd from Admin) ---
    const [news, setNews] = useState(() => {
        const saved = localStorage.getItem(NEWS_DB_KEY)
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Term 2 Schedule Out', date: 'Mar 02, 2026', type: 'Academic', content: 'Check the schedule tab for updated exam timings.', urgent: true },
            { id: 2, title: 'Annual Day Rehearsals', date: 'Mar 01, 2026', type: 'Event', content: 'Auditorium sessions start Monday.', urgent: false }
        ]
    })
    const [liveClasses, setLiveClasses] = useState(() => {
        const saved = localStorage.getItem(LIVE_CLASSES_DB_KEY)
        return saved ? JSON.parse(saved) : [
            { id: 1, subject: 'Mathematics', teacher: 'Ms. Anitha K.', time: '09:30 AM', status: 'Live', link: '#' },
            { id: 2, subject: 'Physics', teacher: 'Mr. Rajan S.', time: '11:00 AM', status: 'Scheduled', link: '#' }
        ]
    })
    const [appConfig, setAppConfig] = useState(() => {
        const saved = localStorage.getItem(APP_CONFIG_DB_KEY)
        return saved ? JSON.parse(saved) : {
            studentAppBroadcast: 'Welcome to the Amalorpavam Student Portal!'
        }
    })
    const [timetable, setTimetable] = useState(() => {
        const saved = localStorage.getItem(TIMETABLE_DB_KEY)
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        const handleSync = (e) => {
            if (e.key === HOMEWORK_DB_KEY && e.newValue) setHomework(JSON.parse(e.newValue))
            if (e.key === NEWS_DB_KEY && e.newValue) setNews(JSON.parse(e.newValue))
            if (e.key === LIVE_CLASSES_DB_KEY && e.newValue) setLiveClasses(JSON.parse(e.newValue))
            if (e.key === APP_CONFIG_DB_KEY && e.newValue) setAppConfig(JSON.parse(e.newValue))
            if (e.key === TIMETABLE_DB_KEY && e.newValue) setTimetable(JSON.parse(e.newValue))

            if (e.key === STUDENT_DB_KEY && e.newValue && user) {
                const db = JSON.parse(e.newValue)
                const updatedUser = db.find(s => s.id === user.id || s.roll === user.roll)
                if (updatedUser) {
                    setUser(updatedUser)
                    localStorage.setItem('amal_active_user', JSON.stringify(updatedUser))
                }
            }
        }
        window.addEventListener('storage', handleSync)
        return () => window.removeEventListener('storage', handleSync)
    }, [user])

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
        setTimeout(() => {
            const dbStr = localStorage.getItem(STUDENT_DB_KEY)
            let db = dbStr ? JSON.parse(dbStr) : []
            const fallbackUser = { id: 999, name: 'Kavya Nair', email: 'kavya@student.ahss.edu', roll: '04', password: 'password123', class: 'XII-A', avatar: '👩‍🎓' }
            if (!db.find(s => s.roll === '04')) db.push(fallbackUser)
            const student = db.find(s => (s.email?.toLowerCase() === identifier.toLowerCase() || s.roll === identifier) && s.password === password)
            if (student) {
                setUser(student); localStorage.setItem('amal_active_user', JSON.stringify(student)); setActivePage('mobile-home'); addToast(`Welcome back, ${student.name}!`, 'success')
            } else {
                addToast('Invalid credentials. Check Email/Roll & Password.', 'error')
            }
            setLoading(false)
        }, 1500)
    }

    const logout = () => { setUser(null); localStorage.removeItem('amal_active_user'); setActivePage('login'); addToast('Logged out successfully', 'info') }
    const gainXp = (amount) => { setXp(prev => prev + amount); addToast(`+${amount} XP Gained!`, 'info') }

    // --- Cart Handlers ---
    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
            return [...prev, { ...item, qty: 1 }]
        })
        addToast(`${item.name} added to cart!`, 'success')
    }
    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
    const clearCart = () => setCart([])

    // Filtered homework: only items assigned to this student
    const myHomework = user ? homework.filter(h => !h.assignedTo || h.assignedTo.length === 0 || h.assignedTo.includes(user.id)) : homework
    // Filtered timetable: only for this student's class
    const myTimetable = user ? timetable.filter(t => t.class === user.class) : []

    return (
        <AppContext.Provider value={{
            user, login, logout, xp, level, streak, points, gainXp,
            homework: myHomework, toggleHomeworkStatus,
            timetable: myTimetable,
            news, liveClasses, appConfig,
            activePage, setActivePage,
            toasts, addToast,
            modal, setModal,
            loading,
            canteenMenu, cart, addToCart, removeFromCart, clearCart
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
