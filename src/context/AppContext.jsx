import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

// Shared keys — must exactly match Admin and Teacher app keys
const STUDENT_DB_KEY = 'amal_student_db'
const TEACHER_DB_KEY = 'amal_teacher_db'
const HOMEWORK_DB_KEY = 'amal_homework_db'
const NEWS_DB_KEY = 'amal_news_db'
const LIVE_CLASSES_DB_KEY = 'amal_live_classes_db'
const APP_CONFIG_DB_KEY = 'amal_app_config_db'
const TIMETABLE_DB_KEY = 'amal_timetable_db'
const EXAM_DB_KEY = 'amal_exam_db'
const CIRCULARS_DB_KEY = 'amal_circulars_db'
const ACHIEVEMENTS_DB_KEY = 'amal_achievements_db'
const CLASS_MAPPINGS_DB_KEY = 'amal_class_mappings_db'
const ATTENDANCE_DB_KEY = 'amal_attendance_db'
const SYLLABUS_DB_KEY = 'amal_syllabus_db'
const NOTIFICATIONS_DB_KEY = 'amal_notifications_db'

export function AppProvider({ children }) {
    // ── Auth ─────────────────────────────────────────
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('amal_active_user')
        return saved ? JSON.parse(saved) : null
    })
    const [loading, setLoading] = useState(true)

    const [allStudents, setAllStudents] = useState(() => JSON.parse(localStorage.getItem(STUDENT_DB_KEY)) || [])
    const [teachers, setTeachers] = useState(() => JSON.parse(localStorage.getItem(TEACHER_DB_KEY)) || [])
    const [homework, setHomework] = useState(() => JSON.parse(localStorage.getItem(HOMEWORK_DB_KEY)) || [])
    const [exams, setExams] = useState(() => JSON.parse(localStorage.getItem(EXAM_DB_KEY)) || [])
    const [timetable, setTimetable] = useState(() => JSON.parse(localStorage.getItem(TIMETABLE_DB_KEY)) || [])
    const [news, setNews] = useState(() => JSON.parse(localStorage.getItem(NEWS_DB_KEY)) || [])
    const [liveClasses, setLiveClasses] = useState(() => JSON.parse(localStorage.getItem(LIVE_CLASSES_DB_KEY)) || [])
    const [appConfig, setAppConfig] = useState(() => JSON.parse(localStorage.getItem(APP_CONFIG_DB_KEY)) || {})
    const [circulars, setCirculars] = useState(() => JSON.parse(localStorage.getItem(CIRCULARS_DB_KEY)) || [])
    const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem(ACHIEVEMENTS_DB_KEY)) || [])
    const [classMappings, setClassMappings] = useState(() => JSON.parse(localStorage.getItem(CLASS_MAPPINGS_DB_KEY)) || [])
    const [attendance, setAttendance] = useState(() => JSON.parse(localStorage.getItem(ATTENDANCE_DB_KEY)) || {})
    const [syllabus, setSyllabus] = useState(() => JSON.parse(localStorage.getItem(SYLLABUS_DB_KEY)) || [])
    const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem(NOTIFICATIONS_DB_KEY)) || [])

    // UI & Gamification
    const [xp, setXp] = useState(1340)
    const [level, setLevel] = useState(13)
    const [streak, setStreak] = useState(6)
    const [points, setPoints] = useState(520)
    const [activePage, setActivePage] = useState(user ? 'mobile-home' : 'login')
    const [toasts, setToasts] = useState([])
    const [modal, setModal] = useState(null)
    const [cart, setCart] = useState([])

    const canteenMenu = [
        { id: 1, name: 'Samosa (2pcs)', price: 25, category: 'Snacks', image: '🥟', stock: 50 },
        { id: 2, name: 'Veg Sandwich', price: 45, category: 'Meals', image: '🥪', stock: 30 },
        { id: 3, name: 'Mango Juice', price: 35, category: 'Drinks', image: '🧃', stock: 40 },
        { id: 4, name: 'Chicken Puffs', price: 30, category: 'Snacks', image: '🥐', stock: 25 },
        { id: 5, name: 'Curd Rice', price: 55, category: 'Meals', image: '🍚', stock: 20 },
        { id: 6, name: 'Cold Coffee', price: 50, category: 'Drinks', image: '🧋', stock: 15 },
    ]

    useEffect(() => { setTimeout(() => setLoading(false), 1200) }, [])

    // Sync
    useEffect(() => {
        const handleSync = (e) => {
            if (!e.newValue) return
            try {
                const parsed = JSON.parse(e.newValue)
                switch (e.key) {
                    case STUDENT_DB_KEY:
                        setAllStudents(parsed)
                        if (user) {
                            const up = parsed.find(s => s.id === user.id)
                            if (up) { setUser(up); localStorage.setItem('amal_active_user', JSON.stringify(up)) }
                        }
                        break
                    case TEACHER_DB_KEY: setTeachers(parsed); break
                    case HOMEWORK_DB_KEY: setHomework(parsed); break
                    case EXAM_DB_KEY: setExams(parsed); break
                    case TIMETABLE_DB_KEY: setTimetable(parsed); break
                    case NEWS_DB_KEY: setNews(parsed); break
                    case LIVE_CLASSES_DB_KEY: setLiveClasses(parsed); break
                    case APP_CONFIG_DB_KEY: setAppConfig(parsed); break
                    case CIRCULARS_DB_KEY: setCirculars(parsed); break
                    case ACHIEVEMENTS_DB_KEY: setAchievements(parsed); break
                    case CLASS_MAPPINGS_DB_KEY: setClassMappings(parsed); break
                    case ATTENDANCE_DB_KEY: setAttendance(parsed); break
                    case SYLLABUS_DB_KEY: setSyllabus(parsed); break
                    case NOTIFICATIONS_DB_KEY: setNotifications(parsed); break
                }
            } catch (err) { }
        }
        window.addEventListener('storage', handleSync)
        return () => window.removeEventListener('storage', handleSync)
    }, [user])

    const addToast = (msg, type = 'success') => {
        const id = Date.now()
        setToasts(t => [...t, { id, msg, type }])
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
    }

    const login = (identifier, password) => {
        setLoading(true)
        setTimeout(() => {
            const db = JSON.parse(localStorage.getItem(STUDENT_DB_KEY)) || []
            const s = db.find(x => (x.email?.toLowerCase() === identifier.toLowerCase() || x.roll === identifier) && x.password === password)
            if (s) {
                setUser(s); localStorage.setItem('amal_active_user', JSON.stringify(s))
                setActivePage('mobile-home'); addToast(`Welcome back, ${s.name}!`, 'success')
            } else addToast('Invalid credentials', 'error')
            setLoading(false)
        }, 800)
    }

    const logout = () => { setUser(null); localStorage.removeItem('amal_active_user'); setActivePage('login'); addToast('Logged out', 'info') }

    const gainXp = (amount) => { setXp(p => p + amount); addToast(`+${amount} XP!`, 'info') }
    const addToCart = (it) => { setCart(p => { const ex = p.find(i => i.id === it.id); return ex ? p.map(i => i.id === it.id ? { ...i, qty: i.qty + 1 } : i) : [...p, { ...it, qty: 1 }] }); addToast(`${it.name} added!`, 'success') }

    // Derived State
    const myHomework = user ? homework.filter(h => h.class === user.class && (!h.assignedTo?.length || h.assignedTo.includes(user.id))) : []
    const myTimetable = user ? timetable.filter(t => t.class === user.class) : []
    const myExams = user ? exams.filter(ex => ex.class === user.class) : []
    const mySyllabus = user ? syllabus.filter(sy => sy.class === user.class) : []

    // Model V3 Teachers
    const myClassMap = user ? classMappings.find(m => m.class === user.class) : null
    const myTeachers = myClassMap ? (myClassMap.subjects || []).map(sm => {
        const t = teachers.find(tr => Number(tr.id) === Number(sm.teacherId))
        return t ? { ...t, assignedSubject: sm.name } : null
    }).filter(Boolean) : []

    const myNotifications = user ? notifications.filter(n => {
        if (n.userId === user.id) return true
        if (n.userId === 'all' && (!n.filter?.class || n.filter.class === user.class)) return true
        return false
    }) : []

    return (
        <AppContext.Provider value={{
            user, login, logout, xp, level, streak, points, gainXp,
            homework: myHomework,
            timetable: myTimetable,
            exams: myExams,
            syllabus: mySyllabus,
            notifications: myNotifications,
            teachers, myTeachers,
            news, liveClasses, appConfig, circulars, achievements, classMappings, attendance,
            activePage, setActivePage, toasts, addToast, modal, setModal, loading,
            canteenMenu, cart, addToCart, removeFromCart: (id) => setCart(p => p.filter(i => i.id !== id)), clearCart: () => setCart([])
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
