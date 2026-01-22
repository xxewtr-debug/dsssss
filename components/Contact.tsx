import React from 'react';
import { MapPin, Phone, Send, Instagram, Facebook, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            
            {/* Background Ambience for this section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-navy-900/50 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold-500 text-sm font-bold tracking-[0.3em] uppercase mb-2 block">Customer Support</span>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 drop-shadow-xl">نحن هنا لخدمتك</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">فريق خدمة العملاء جاهز للرد على استفساراتك وتلبية طلباتك الخاصة على مدار الساعة</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
                    
                    {/* 1. Contact Info Card (Luxury Dark Card) */}
                    <div className="lg:w-1/3 flex flex-col">
                        <div className="flex-1 bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group hover:border-gold-500/30 transition-colors duration-500">
                            
                            {/* Decorative Shine */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-gold-500/20 transition-all"></div>

                            <h3 className="text-2xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gold-500 rounded-full"></span>
                                معلومات الاتصال
                            </h3>
                            
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-5 group/item">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold-500 border border-white/5 group-hover/item:bg-gold-500 group-hover/item:text-navy-900 transition-all duration-300 shadow-lg">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">اتصل بنا</p>
                                        <p className="text-xl font-black text-white dir-ltr text-right font-mono tracking-wide">0771 196 3103</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group/item">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold-500 border border-white/5 group-hover/item:bg-gold-500 group-hover/item:text-navy-900 transition-all duration-300 shadow-lg">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">الموقع</p>
                                        <p className="text-white font-bold leading-relaxed">العراق، بغداد<br/>الكرادة، شارع 62</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group/item">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold-500 border border-white/5 group-hover/item:bg-gold-500 group-hover/item:text-navy-900 transition-all duration-300 shadow-lg">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">البريد الإلكتروني</p>
                                        <p className="text-white font-bold font-mono text-sm">info@murtada-dubai.com</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-12 flex gap-3 relative z-10 pt-8 border-t border-white/5">
                                <button className="flex-1 py-3 bg-white/5 rounded-xl text-slate-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-white/5 group/social">
                                    <Instagram size={20} className="group-hover/social:scale-110 transition-transform" />
                                </button>
                                <button className="flex-1 py-3 bg-white/5 rounded-xl text-slate-300 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-white/5 group/social">
                                    <Facebook size={20} className="group-hover/social:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2. Contact Form (Dark Glass) */}
                    <div className="lg:w-2/3 bg-[#0a0f1c]/60 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden">
                        
                        {/* Glow Effect */}
                        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-slate-400 group-focus-within:text-gold-500 transition-colors uppercase tracking-wide">الاسم الكامل</label>
                                    <input type="text" className="w-full px-5 py-4 rounded-xl bg-[#020617]/80 border border-white/10 focus:border-gold-500/50 focus:bg-[#020617] focus:ring-1 focus:ring-gold-500/50 outline-none transition-all text-white placeholder-slate-600" placeholder="الاسم هنا" />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-slate-400 group-focus-within:text-gold-500 transition-colors uppercase tracking-wide">رقم الهاتف</label>
                                    <input type="tel" className="w-full px-5 py-4 rounded-xl bg-[#020617]/80 border border-white/10 focus:border-gold-500/50 focus:bg-[#020617] focus:ring-1 focus:ring-gold-500/50 outline-none transition-all text-white placeholder-slate-600 dir-rtl" placeholder="077..." />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <label className="text-xs font-bold text-slate-400 group-focus-within:text-gold-500 transition-colors uppercase tracking-wide">الرسالة</label>
                                <textarea rows={5} className="w-full px-5 py-4 rounded-xl bg-[#020617]/80 border border-white/10 focus:border-gold-500/50 focus:bg-[#020617] focus:ring-1 focus:ring-gold-500/50 outline-none transition-all text-white placeholder-slate-600 resize-none" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                            </div>
                            
                            <div className="pt-4">
                                <button className="w-full py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-black rounded-xl hover:from-gold-400 hover:to-gold-500 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.98]">
                                    <span className="text-lg">إرسال الرسالة</span>
                                    <Send size={20} className="group-hover:-translate-x-2 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};