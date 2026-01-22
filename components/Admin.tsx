import React, { useState, useEffect } from 'react';
import { Product, Order } from '../types';
import { 
    Lock, Plus, Trash2, Image as ImageIcon, LayoutGrid, DollarSign, 
    FileText, CheckCircle, Package, LogOut, Search, 
    LayoutDashboard, ShoppingBag, Users, TrendingUp, MapPin, 
    MoreHorizontal, ArrowUpRight, ArrowDownRight, Bell, ChevronLeft, Shield, ChevronDown,
    Clock, Truck, XCircle, Loader2, Calendar, User, CreditCard
} from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Logo } from './Logo';

interface AdminProps {
    products: Product[];
    onAddProduct: (product: Product) => void;
    onDeleteProduct: (id: number) => void;
    onClose: () => void;
}

const AVAILABLE_SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

// --- MOCK DATA (Initial State) ---
const INITIAL_ORDERS: Order[] = [
    { id: '#ORD-7829', customerName: 'علي محمد', date: '2024-03-10', total: 145000, status: 'pending', itemsCount: 3, location: 'بغداد، المنصور' },
    { id: '#ORD-7830', customerName: 'سارة أحمد', date: '2024-03-09', total: 42000, status: 'processing', itemsCount: 1, location: 'البصرة، الجزائر' },
    { id: '#ORD-7831', customerName: 'حسين كريم', date: '2024-03-09', total: 85000, status: 'shipped', itemsCount: 2, location: 'أربيل، دريم سيتي' },
    { id: '#ORD-7832', customerName: 'نور الهدى', date: '2024-03-08', total: 28000, status: 'delivered', itemsCount: 1, location: 'بغداد، الدورة' },
    { id: '#ORD-7833', customerName: 'مصطفى سعد', date: '2024-03-08', total: 110000, status: 'cancelled', itemsCount: 2, location: 'النجف، حي الأمير' },
    { id: '#ORD-7834', customerName: 'زينب علي', date: '2024-03-07', total: 55000, status: 'delivered', itemsCount: 1, location: 'كربلاء، المركز' },
    { id: '#ORD-7835', customerName: 'أحمد جاسم', date: '2024-03-06', total: 210000, status: 'pending', itemsCount: 4, location: 'بغداد، زيونة' },
];

type AdminTab = 'dashboard' | 'inventory' | 'add-product' | 'orders';

export const Admin: React.FC<AdminProps> = ({ products, onAddProduct, onDeleteProduct, onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'completed'>('all');
    const [error, setError] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' }));
    
    // State for Orders
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' }));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        category: 'men',
        rating: 5,
        isNew: true,
        sizes: [40, 41, 42, 43, 44]
    });

    // --- HANDLERS ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') setIsAuthenticated(true);
        else setError('رمز الدخول غير صحيح');
    };

    const toggleSize = (size: number) => {
        setNewProduct(prev => {
            const currentSizes = prev.sizes || [];
            return currentSizes.includes(size)
                ? { ...prev, sizes: currentSizes.filter(s => s !== size).sort((a, b) => a - b) }
                : { ...prev, sizes: [...currentSizes, size].sort((a, b) => a - b) };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            alert('الرجاء إكمال البيانات الأساسية');
            return;
        }
        const product: Product = {
            id: Date.now(),
            name: newProduct.name!,
            price: Number(newProduct.price),
            image: newProduct.image!,
            category: newProduct.category as any || 'men',
            description: newProduct.description || 'إصدار حصري بجودة الماستر.',
            rating: 5,
            isNew: true,
            sizes: newProduct.sizes?.length ? newProduct.sizes : [40, 41, 42]
        };
        onAddProduct(product);
        setNewProduct({ category: 'men', rating: 5, isNew: true, name: '', price: 0, image: '', description: '', sizes: [40, 41, 42, 43, 44] });
        setActiveTab('inventory');
    };

    const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusConfig = (status: string) => {
        switch(status) {
            case 'pending': return { color: 'text-amber-500', border: 'border-amber-500/30', bg: 'bg-amber-500/10', icon: Clock, label: 'قيد الانتظار' };
            case 'processing': return { color: 'text-blue-500', border: 'border-blue-500/30', bg: 'bg-blue-500/10', icon: Loader2, label: 'جاري التجهيز' };
            case 'shipped': return { color: 'text-purple-500', border: 'border-purple-500/30', bg: 'bg-purple-500/10', icon: Truck, label: 'تم الشحن' };
            case 'delivered': return { color: 'text-emerald-500', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', icon: CheckCircle, label: 'تم التوصيل' };
            case 'cancelled': return { color: 'text-rose-500', border: 'border-rose-500/30', bg: 'bg-rose-500/10', icon: XCircle, label: 'ملغي' };
            default: return { color: 'text-slate-500', border: 'border-slate-500/30', bg: 'bg-slate-500/10', icon: Clock, label: status };
        }
    };

    const filteredOrders = orders.filter(order => {
        if (orderFilter === 'pending') return ['pending', 'processing'].includes(order.status);
        if (orderFilter === 'completed') return ['delivered', 'cancelled'].includes(order.status);
        return true;
    });

    // --- LOGIN SCREEN ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
                 
                 <div className="w-full max-w-[380px] bg-[#0a0f1c]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative z-10 animate-fade-in-up text-center">
                    <div className="mb-8 flex justify-center transform scale-90"><Logo /></div>
                    
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-white font-cinzel tracking-widest mb-1">لوحة التحكم</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">مصادقة الدخول</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group">
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] outline-none text-center text-lg tracking-[0.3em] transition-all placeholder:text-slate-700 font-bold"
                                placeholder="••••••"
                            />
                            <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-gold-500 transition-colors" />
                        </div>
                        
                        {error && <div className="text-rose-400 text-[10px] font-bold bg-rose-500/10 py-2 rounded-lg border border-rose-500/10 flex items-center justify-center gap-2"><Shield size={10}/>{error}</div>}
                        
                        <button type="submit" className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-black py-3 rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-[0.98] tracking-widest text-xs uppercase">
                            دخول
                        </button>
                    </form>
                    <button onClick={onClose} className="mt-6 text-slate-500 text-[10px] font-bold hover:text-white transition-colors border-b border-transparent hover:border-slate-500 pb-0.5">العودة للمتجر</button>
                 </div>
            </div>
        );
    }

    // --- MAIN DASHBOARD LAYOUT ---
    return (
        <div className="min-h-screen bg-[#020617] text-right font-cairo flex overflow-hidden selection:bg-gold-500 selection:text-navy-900" dir="rtl">
            
            {/* SIDEBAR - Fixed Width for consistency */}
            <aside className="w-20 lg:w-[260px] bg-[#0a0f1c]/95 backdrop-blur-xl border-l border-white/5 flex flex-col z-30 shadow-2xl transition-all duration-300">
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-center lg:justify-start px-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent gap-4">
                    <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-navy-950 shadow-[0_0_15px_rgba(212,175,55,0.4)] shrink-0">
                        <Lock size={20} strokeWidth={2.5} />
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <h1 className="font-black text-white font-cinzel tracking-wider text-base">NEXUS</h1>
                        <p className="text-[9px] text-gold-500 font-bold tracking-[0.2em] uppercase">SYSTEM V2.0</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="hidden lg:block text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2 mb-3 opacity-60">القائمة الرئيسية</p>
                    {[
                        { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
                        { id: 'orders', label: 'الطلبات', icon: ShoppingBag, badge: orders.filter(o => o.status === 'pending').length },
                        { id: 'inventory', label: 'المخزون', icon: Package },
                        { id: 'add-product', label: 'إضافة منتج', icon: Plus },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as AdminTab)}
                            className={`w-full flex items-center justify-center lg:justify-start px-3 lg:px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                                activeTab === item.id 
                                ? 'bg-gradient-to-r from-gold-500/10 to-transparent border border-gold-500/20 text-white' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                            }`}
                        >
                            {/* Active Indicator Line */}
                            {activeTab === item.id && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gold-500 rounded-l-full shadow-[0_0_10px_#d4af37]"></div>}
                            
                            <div className="flex items-center gap-3 relative z-10 w-full">
                                <item.icon size={20} className={activeTab === item.id ? "text-gold-500" : "group-hover:text-white"} />
                                <span className="hidden lg:block font-bold text-sm">{item.label}</span>
                                {item.badge ? (
                                    <span className={`mr-auto hidden lg:flex w-5 h-5 items-center justify-center rounded-md text-[10px] font-black ${activeTab === item.id ? 'bg-gold-500 text-navy-950' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'}`}>
                                        {item.badge}
                                    </span>
                                ) : null}
                            </div>
                             {/* Mobile Badge */}
                             {item.badge ? (
                                <span className="lg:hidden absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-[#0a0f1c]"></span>
                            ) : null}
                        </button>
                    ))}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-white/5 bg-[#050810]/50">
                    <button onClick={onClose} className="w-full flex items-center justify-center lg:justify-start gap-3 text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 border border-transparent px-4 py-3 rounded-xl transition-all font-bold text-sm group">
                        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> {/* RTL: translate-x-1 moves right */}
                        <span className="hidden lg:inline">خروج آمن</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 relative flex flex-col h-screen overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-navy-900 to-transparent pointer-events-none opacity-50"></div>

                {/* Header */}
                <header className="px-6 lg:px-10 py-5 flex justify-between items-center z-20 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md">
                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] lg:text-xs mb-1 font-bold">
                            <span>لوحة التحكم</span>
                            <ChevronLeft size={10} />
                            <span className="text-gold-500">{activeTab === 'dashboard' ? 'الرئيسية' : activeTab === 'orders' ? 'إدارة الطلبات' : activeTab === 'inventory' ? 'المخزون' : 'إضافة منتج'}</span>
                        </div>
                        <h2 className="text-lg lg:text-xl font-black text-white">
                             مرحباً، المدير العام 👋
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-6">
                        <div className="text-right hidden sm:block bg-white/5 px-4 py-1.5 rounded-lg border border-white/5">
                            <p className="text-gold-500 font-bold font-mono text-sm tracking-widest">{currentTime}</p>
                        </div>
                        <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020617]"></span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10">
                    
                    {/* --- TAB: DASHBOARD --- */}
                    {activeTab === 'dashboard' && (
                        <div className="animate-fade-in space-y-8 max-w-7xl mx-auto">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { title: 'إجمالي المبيعات', val: '12.5M', sub: 'د.ع', inc: '+12%', icon: DollarSign, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-500/5' },
                                    { title: 'الطلبات الجديدة', val: orders.length, sub: 'طلب', inc: '+5', icon: ShoppingBag, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-500/5' },
                                    { title: 'العملاء النشطين', val: '1,240', sub: 'عميل', inc: '+18%', icon: Users, color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-500/5' },
                                    { title: 'منتجات بالمخزن', val: products.length, sub: 'موديل', inc: '0%', icon: Package, color: 'text-gold-400', bg: 'from-gold-500/20 to-gold-500/5' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-[#0a0f1c] p-6 rounded-[1.5rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.bg} blur-[40px] rounded-full -mr-10 -mt-10 opacity-50`}></div>
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-white">
                                                <stat.icon size={20} />
                                            </div>
                                            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 ${stat.inc.includes('-') ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                {stat.inc} {stat.inc.includes('-') ? <ArrowDownRight size={10}/> : <ArrowUpRight size={10}/>}
                                            </span>
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</h3>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl lg:text-3xl font-black text-white font-mono">{stat.val}</span>
                                                <span className="text-xs text-slate-500 font-bold">{stat.sub}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chart & Recent Activity Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Chart Area */}
                                <div className="lg:col-span-2 bg-[#0a0f1c] border border-white/5 rounded-[1.5rem] p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <TrendingUp className="text-gold-500" size={18} />
                                            الأداء المالي
                                        </h3>
                                        <div className="flex gap-2">
                                            {['أسبوعي', 'شهري'].map(p => (
                                                <button key={p} className="px-3 py-1 text-[10px] font-bold rounded-lg bg-white/5 text-slate-400 hover:bg-gold-500 hover:text-navy-950 transition-colors">{p}</button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="h-64 w-full relative flex items-end justify-between gap-4 px-2">
                                        {/* Background Grid */}
                                        <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                                            {[...Array(5)].map((_,i) => <div key={i} className="border-b border-white w-full h-full"></div>)}
                                        </div>
                                        
                                        {/* Smooth Curve SVG */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
                                            <path d="M0 220 C 150 220, 200 100, 350 150 S 550 50, 700 100 S 900 20, 1200 80" stroke="url(#gold-gradient)" strokeWidth="3" fill="none" className="drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                                            <defs>
                                                <linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#4f46e5" />
                                                    <stop offset="50%" stopColor="#d4af37" />
                                                    <stop offset="100%" stopColor="#ec4899" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        {/* Pillars */}
                                        {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                                            <div key={i} className="relative group flex-1 flex flex-col justify-end items-center gap-2 z-10">
                                                <div className="w-full max-w-[24px] bg-white/5 rounded-t-sm transition-all duration-500 hover:bg-gold-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]" style={{ height: `${h}%` }}></div>
                                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{['Sat','Sun','Mon','Tue','Wed','Thu','Fri'][i]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Orders Mini */}
                                <div className="bg-[#0a0f1c] border border-white/5 rounded-[1.5rem] p-6 shadow-xl flex flex-col">
                                    <h3 className="text-lg font-bold text-white mb-6">أحدث العمليات</h3>
                                    <div className="space-y-4 overflow-y-auto flex-1 custom-scrollbar pr-2 max-h-[300px]">
                                        {orders.slice(0, 5).map(order => {
                                            const status = getStatusConfig(order.status);
                                            return (
                                                <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-gold-500/30 transition-colors group">
                                                    <div className="w-10 h-10 rounded-full bg-[#020617] flex items-center justify-center text-xs font-bold text-slate-300 border border-white/10 group-hover:border-gold-500/50 group-hover:text-gold-500 transition-colors">
                                                        {order.customerName.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-white font-bold text-sm truncate">{order.customerName}</h4>
                                                        <p className="text-[10px] text-slate-500 font-mono truncate">{order.id}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`block text-[10px] font-bold ${status.color}`}>{status.label}</span>
                                                        <span className="text-xs font-bold text-white font-mono">{order.total.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <button onClick={() => setActiveTab('orders')} className="w-full mt-4 py-3 rounded-xl bg-white/5 text-slate-300 text-xs font-bold hover:bg-gold-500 hover:text-navy-950 transition-all">
                                        عرض كل الطلبات
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: ORDERS (REDESIGNED) --- */}
                    {activeTab === 'orders' && (
                        <div className="animate-fade-in flex flex-col h-full max-w-7xl mx-auto">
                            {/* New Header Logic */}
                            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-white/5 pb-6">
                                <div>
                                    <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                                        سجل الطلبات
                                        <span className="bg-gold-500 text-navy-950 text-xs px-2 py-1 rounded-md font-bold">{orders.length}</span>
                                    </h1>
                                    <p className="text-slate-400 text-sm">نظام تتبع وإدارة الطلبات المتقدم</p>
                                </div>
                                <div className="flex bg-[#0a0f1c] p-1.5 rounded-full border border-white/10 shadow-lg">
                                    {[
                                        { id: 'all', label: 'الكل' },
                                        { id: 'pending', label: 'قيد التنفيذ' },
                                        { id: 'completed', label: 'الأرشيف' }
                                    ].map(f => (
                                        <button 
                                            key={f.id} 
                                            onClick={() => setOrderFilter(f.id as any)}
                                            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${orderFilter === f.id ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-lg shadow-gold-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* New Floating Cards Layout (Legendary Table) */}
                            <div className="grid gap-4">
                                {/* Table Header (Hidden on mobile, stylized on desktop) */}
                                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#0a0f1c]/50 rounded-2xl border border-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
                                    <div className="col-span-2 text-right">رقم الطلب / العميل</div>
                                    <div className="col-span-2">الموقع</div>
                                    <div className="col-span-2">تاريخ الطلب</div>
                                    <div className="col-span-2">الإجمالي</div>
                                    <div className="col-span-3">حالة الطلب</div>
                                    <div className="col-span-1">إجراءات</div>
                                </div>

                                {/* Rows */}
                                {filteredOrders.map((order) => {
                                    const status = getStatusConfig(order.status);
                                    const StatusIcon = status.icon;

                                    return (
                                        <div 
                                            key={order.id} 
                                            className="group relative md:grid md:grid-cols-12 gap-4 items-center bg-[#0a0f1c] hover:bg-[#0f172a] border border-white/5 hover:border-gold-500/30 rounded-2xl p-4 md:px-6 md:py-5 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col"
                                        >
                                            {/* Glow Effect on Hover */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${status.bg.replace('/10','')} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                                            {/* 1. ID & Customer */}
                                            <div className="col-span-2 flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                                                    <span className="font-bold text-white text-sm">{order.customerName.charAt(0)}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-sm">{order.customerName}</span>
                                                    <span className="font-mono text-[10px] text-gold-500 tracking-wider bg-gold-500/5 px-1.5 rounded w-fit mt-1">{order.id}</span>
                                                </div>
                                            </div>

                                            {/* 2. Location */}
                                            <div className="col-span-2 flex items-center gap-2 text-slate-400 w-full md:w-auto mb-2 md:mb-0 md:justify-center">
                                                <MapPin size={14} className="text-slate-500" />
                                                <span className="text-xs font-bold truncate">{order.location}</span>
                                            </div>

                                            {/* 3. Date */}
                                            <div className="col-span-2 flex items-center gap-2 text-slate-500 w-full md:w-auto mb-2 md:mb-0 md:justify-center">
                                                <Calendar size={14} />
                                                <span className="text-xs font-mono">{order.date}</span>
                                            </div>

                                            {/* 4. Total */}
                                            <div className="col-span-2 w-full md:w-auto mb-4 md:mb-0 flex md:justify-center items-center gap-2 bg-[#020617] md:bg-transparent p-2 md:p-0 rounded-lg">
                                                <CreditCard size={14} className="md:hidden text-slate-500" />
                                                <span className="text-white font-black text-sm md:text-base font-mono">{order.total.toLocaleString()}</span>
                                                <span className="text-[10px] text-gold-500 font-bold">د.ع</span>
                                            </div>

                                            {/* 5. Status Selector (The Star Show) */}
                                            <div className="col-span-3 w-full md:w-auto flex md:justify-center relative group/status z-20">
                                                <div className={`relative flex items-center gap-3 px-1 pl-1 pr-4 py-1.5 rounded-full border ${status.border} ${status.bg} transition-all w-full md:w-auto`}>
                                                    {/* Animated Icon Box */}
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#020617] shadow-lg ${status.color}`}>
                                                        <StatusIcon size={14} className={order.status === 'processing' ? 'animate-spin' : ''} />
                                                    </div>
                                                    
                                                    {/* Select */}
                                                    <select 
                                                        value={order.status}
                                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value as any)}
                                                        className={`bg-transparent text-xs font-bold outline-none cursor-pointer w-full appearance-none ${status.color}`}
                                                    >
                                                        <option className="bg-navy-900 text-slate-300" value="pending">قيد الانتظار</option>
                                                        <option className="bg-navy-900 text-blue-400" value="processing">جاري التجهيز</option>
                                                        <option className="bg-navy-900 text-purple-400" value="shipped">تم الشحن</option>
                                                        <option className="bg-navy-900 text-emerald-400" value="delivered">تم التوصيل</option>
                                                        <option className="bg-navy-900 text-rose-400" value="cancelled">ملغي</option>
                                                    </select>
                                                    <ChevronDown size={12} className={`absolute left-3 ${status.color} opacity-50 pointer-events-none`} />
                                                </div>
                                            </div>

                                            {/* 6. Actions */}
                                            <div className="col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
                                                <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold-500 hover:text-navy-950 text-slate-400 transition-all flex items-center justify-center">
                                                    <ArrowUpRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* --- TAB: INVENTORY --- */}
                    {activeTab === 'inventory' && (
                        <div className="animate-fade-in max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                                <div>
                                    <h1 className="text-3xl font-black text-white">إدارة المنتجات</h1>
                                    <p className="text-slate-400 text-sm mt-1">عرض وتحرير {products.length} منتج</p>
                                </div>
                                <div className="relative w-full md:w-96 group">
                                    {/* RTL: Icon right, padding right */}
                                    <input 
                                        type="text" 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="بحث عن منتج..."
                                        className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl pr-12 pl-4 py-3.5 text-white focus:border-gold-500 outline-none transition-all shadow-inner text-sm group-hover:border-white/20"
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.filter(p => p.name.includes(searchTerm)).map(product => (
                                    <div key={product.id} className="bg-[#0a0f1c] border border-white/5 rounded-[1.5rem] p-4 flex flex-col group hover:border-gold-500/30 transition-all hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">
                                        
                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                                            <span className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">{product.category}</span>
                                            {product.isNew && <span className="bg-gold-500 text-navy-950 text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg shadow-gold-500/20">NEW</span>}
                                        </div>

                                        {/* Image Area */}
                                        <div className="relative aspect-[4/3] bg-[#020617] rounded-2xl overflow-hidden mb-4 border border-white/5 flex items-center justify-center group-hover:bg-[#050810] transition-colors">
                                            <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
                                            <img src={product.image} alt={product.name} className="h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-2xl" />
                                        </div>
                                        
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-white font-bold text-base leading-snug w-3/4 truncate">{product.name}</h3>
                                                <div className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded-md">
                                                    <span className="text-gold-500 font-bold text-xs">{product.rating}</span>
                                                    <span className="text-[8px] text-gold-500">★</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {product.sizes?.slice(0, 4).map(s => (
                                                    <span key={s} className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[9px] font-bold text-slate-400 border border-white/5">{s}</span>
                                                ))}
                                                {(product.sizes?.length || 0) > 4 && <span className="text-[10px] text-slate-500 flex items-center px-1">+{(product.sizes?.length || 0) - 4}</span>}
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                                                <div>
                                                    <span className="block text-[10px] text-slate-500">سعر البيع</span>
                                                    <span className="text-lg font-black text-white font-mono">{product.price.toLocaleString()} <span className="text-[10px] font-normal text-slate-400 font-cairo">د.ع</span></span>
                                                </div>
                                                
                                                {/* Hidden Actions that appear on hover */}
                                                <div className="flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                    <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                                                        <FileText size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => { if(window.confirm('حذف المنتج نهائياً؟')) onDeleteProduct(product.id); }}
                                                        className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- TAB: ADD PRODUCT --- */}
                    {activeTab === 'add-product' && (
                        <div className="animate-fade-in max-w-5xl mx-auto py-4">
                             <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h1 className="text-3xl font-black text-white mb-2">إضافة منتج جديد</h1>
                                    <p className="text-slate-400 text-sm">أدخل تفاصيل المنتج بدقة لضمان عرض مثالي</p>
                                </div>
                                <div className="hidden md:block h-px w-32 bg-gradient-to-r from-gold-500/50 to-transparent"></div>
                             </div>

                             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column: Inputs */}
                                <div className="lg:col-span-2 bg-[#0a0f1c] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">اسم الموديل</label>
                                            <input 
                                                type="text" 
                                                value={newProduct.name || ''}
                                                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                                                className="w-full bg-[#020617] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-gold-500 outline-none transition-all placeholder:text-slate-700"
                                                placeholder="مثال: Nike Air Max 90"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">السعر (د.ع)</label>
                                                <div className="relative">
                                                    <input 
                                                        type="number" 
                                                        value={newProduct.price || ''}
                                                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                                                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-5 py-4 pl-12 text-white focus:border-gold-500 outline-none font-mono"
                                                        placeholder="00"
                                                    />
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">IQD</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">القسم</label>
                                                <div className="relative">
                                                    <select 
                                                        value={newProduct.category}
                                                        onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                                                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-gold-500 outline-none appearance-none cursor-pointer"
                                                    >
                                                        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                                        ))}
                                                    </select>
                                                    <LayoutGrid size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-4 border-t border-white/5">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide flex justify-between">
                                                <span>المقاسات المتوفرة</span>
                                                <span className="text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded text-[10px]">{newProduct.sizes?.length || 0} محدد</span>
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {AVAILABLE_SIZES.map(size => (
                                                    <button
                                                        type="button"
                                                        key={size}
                                                        onClick={() => toggleSize(size)}
                                                        className={`w-11 h-11 rounded-xl text-sm font-bold transition-all border ${
                                                            newProduct.sizes?.includes(size)
                                                            ? 'bg-gold-500 border-gold-500 text-navy-950 scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                                            : 'bg-[#020617] border-white/10 text-slate-400 hover:border-gold-500/50 hover:text-white'
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Right Column: Media & Actions */}
                                <div className="flex flex-col gap-6">
                                    <div className="bg-[#0a0f1c] border border-white/10 rounded-[2rem] p-6 shadow-2xl h-full flex flex-col">
                                        <h3 className="text-sm font-bold text-white mb-4">صورة المنتج</h3>
                                        
                                        <div className="relative group mb-4">
                                            <input 
                                                type="text" 
                                                value={newProduct.image || ''}
                                                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                                                className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 pl-10 text-white focus:border-gold-500 outline-none dir-ltr text-right text-xs placeholder:text-slate-600"
                                                placeholder="https://image-url..."
                                            />
                                            {/* Icon on left because input is dir-ltr */}
                                            <ImageIcon size={14} className="absolute left-3 top-3.5 text-slate-500" />
                                        </div>

                                        <div className="flex-1 bg-[#020617] border border-white/5 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden group min-h-[200px]">
                                            {newProduct.image ? (
                                                <img src={newProduct.image} alt="Preview" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="text-center text-slate-600">
                                                    <ImageIcon size={32} className="mx-auto mb-2 opacity-20" />
                                                    <span className="text-[10px]">معاينة الصورة</span>
                                                </div>
                                            )}
                                            {newProduct.image && <div className="absolute inset-0 bg-gold-500/5 pointer-events-none"></div>}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleSubmit}
                                        className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-black py-5 rounded-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 text-lg hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <CheckCircle size={22} strokeWidth={2.5} />
                                        نشر المنتج فوراً
                                    </button>
                                </div>
                             </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};