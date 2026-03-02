import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus, X, ArrowRight, Utensils, Coffee, Pizza } from 'lucide-react'

export default function MobileCanteen() {
    const { canteenMenu, cart, addToCart, removeFromCart, clearCart, addToast } = useApp()
    const [filter, setFilter] = useState('All')
    const [showCart, setShowCart] = useState(false)

    const categories = ['All', 'Snacks', 'Meals', 'Drinks']
    const filteredItems = filter === 'All' ? canteenMenu : canteenMenu.filter(i => i.category === filter)

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)

    const handleCheckout = () => {
        addToast('Order placed successfully! Pick up at the counter.', 'success')
        clearCart()
        setShowCart(false)
    }

    return (
        <div className="mobile-page">
            {/* Canteen Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 12 }}>
                <div>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', margin: 0 }}>Campus Canteen</h2>
                    <p style={{ fontSize: 14, color: '#64748B', margin: '4px 0 0' }}>Fresh meals, delivered to your break</p>
                </div>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCart(true)}
                    style={{
                        width: 56, height: 56, borderRadius: 20, background: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1.5px solid #F1F5F9',
                        position: 'relative'
                    }}
                >
                    <ShoppingCart size={24} color="#1034A6" />
                    {cart.length > 0 && (
                        <span style={{ position: 'absolute', top: -5, right: -5, background: '#EF4444', color: 'white', fontSize: 10, fontWeight: 900, padding: '4px 8px', borderRadius: 10, border: '3px solid white' }}>
                            {cart.reduce((a, b) => a + b.qty, 0)}
                        </span>
                    )}
                </motion.button>
            </div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }}>
                {categories.map(cat => (
                    <motion.button
                        key={cat}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '12px 24px', borderRadius: 16, border: 'none',
                            background: filter === cat ? '#1034A6' : 'white',
                            color: filter === cat ? 'white' : '#64748B',
                            fontWeight: 800, fontSize: 14, cursor: 'pointer',
                            boxShadow: filter === cat ? '0 10px 20px rgba(16, 52, 166, 0.2)' : 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="canteen-grid">
                {filteredItems.map(item => (
                    <motion.div
                        key={item.id}
                        layout
                        className="premium-card"
                        style={{ padding: 16, textAlign: 'center' }}
                    >
                        <div style={{ fontSize: 44, marginBottom: 16 }}>{item.image}</div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 4px', color: '#0F172A' }}>{item.name}</h3>
                        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>{item.category}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                            <span style={{ fontSize: 18, fontWeight: 900, color: '#1034A6' }}>₹{item.price}</span>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addToCart(item)}
                                style={{
                                    width: 36, height: 36, borderRadius: 12, border: 'none',
                                    background: '#E8EFFD', color: '#1034A6', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <Plus size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Cart Modal / Drawer */}
            <AnimatePresence>
                {showCart && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowCart(false)}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', zIndex: 2100 }}
                        />
                        <motion.div
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed', bottom: 0, left: 0, right: 0,
                                background: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40,
                                padding: '32px 24px 40px', zIndex: 2200, maxHeight: '80vh', overflowY: 'auto'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0A2463', margin: 0 }}>Your Order</h2>
                                <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none' }}><X size={24} color="#64748B" /></button>
                            </div>

                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <ShoppingCart size={48} color="#CBD5E1" style={{ marginBottom: 16 }} />
                                    <p style={{ color: '#64748B', fontWeight: 600 }}>Your cart is empty.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {cart.map(item => (
                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: '#F8FAFC', borderRadius: 20 }}>
                                            <span style={{ fontSize: 32 }}>{item.image}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 800, fontSize: 16 }}>{item.name}</div>
                                                <div style={{ fontWeight: 600, fontSize: 14, color: '#1034A6' }}>₹{item.price}</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', color: '#64748B' }}><Minus size={16} /></button>
                                                <span style={{ fontWeight: 900, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                                                <button onClick={() => addToCart(item)} style={{ border: 'none', background: 'none', color: '#1034A6' }}><Plus size={16} /></button>
                                            </div>
                                        </div>
                                    ))}

                                    <div style={{ borderTop: '2px dashed #E2E8F0', marginTop: 12, paddingTop: 24 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                            <span style={{ color: '#64748B', fontWeight: 600 }}>Total Amount</span>
                                            <span style={{ fontSize: 24, fontWeight: 900, color: '#0A2463' }}>₹{cartTotal}</span>
                                        </div>
                                        <button
                                            onClick={handleCheckout}
                                            className="btn-premium"
                                            style={{ width: '100%', justifyContent: 'center', padding: 20, fontSize: 18 }}
                                        >
                                            Confirm Order <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
