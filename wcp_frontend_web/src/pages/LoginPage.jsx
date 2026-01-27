import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WCPButton from '../components/atoms/WCPButton';
import { Mail, Lock, Building2, ShieldCheck, ArrowRight, Search, Users } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('tenant');
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    // Auto-redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated && user) {
            const redirectMap = {
                admin: '/admin',
                owner: '/owner',
                tenant: '/tenant',
                apporteur: '/dashboard',
                agent: '/dashboard'
            };
            navigate(redirectMap[user.role] || '/', { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const roles = [
        { value: 'tenant', label: 'Locataire', icon: 'User' },
        { value: 'owner', label: 'Propriétaire', icon: 'Home' },
        { value: 'admin', label: 'Administrateur', icon: 'Shield' },
        { value: 'apporteur', label: 'Apporteur d\'Affaires', icon: 'Users' },
        { value: 'agent', label: 'Chargé d\'Affaires', icon: 'Briefcase' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (login(email, password, role)) {
            // Determine redirect path based on role if no 'from' state
            if (from === '/') {
                const redirectMap = {
                    admin: '/admin',
                    owner: '/owner',
                    tenant: '/tenant',
                    apporteur: '/dashboard', // Adjust as needed
                    agent: '/dashboard'     // Adjust as needed
                };
                navigate(redirectMap[role] || '/');
            } else {
                navigate(from);
            }
        } else {
            setError('Identifiants incorrects. Veuillez réessayer.');
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-primary/20">
            {/* LEFT SIDE: Immersive Brand Experience (Desktop Only) */}
            <div className="hidden lg:flex lg:w-[45%] relative bg-slate-900 overflow-hidden flex-col justify-between p-16">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110 opacity-60"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                            <Building2 className="text-white" size={28} />
                        </div>
                        <span className="text-2xl font-black text-white tracking-widest uppercase">West Coast</span>
                    </div>

                    <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
                        L'Excellence <br /> <span className="text-primary italic">Immobilière</span> <br /> à votre portée.
                    </h2>
                    <p className="text-slate-300 text-lg max-w-sm font-medium leading-relaxed">
                        Gérez vos actifs, suivez vos demandes et collaborez avec nos experts sur une plateforme unique.
                    </p>
                </div>

                {/* Glassmorphism Quick Actions */}
                <div className="relative z-10 space-y-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-white/20"></span>
                        Services Publics
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        <GlassAction
                            icon={<Search size={18} />}
                            title="Rechercher"
                            onClick={() => navigate('/rechercher-un-bien')}
                        />
                        <GlassAction
                            icon={<Building2 size={18} />}
                            title="Faire estimer mon bien"
                            onClick={() => navigate('/ajouter-un-bien')}
                        />
                        <GlassAction
                            icon={<Users size={18} />}
                            title="Partenariat Business"
                            onClick={() => navigate('/apporter-des-affaires')}
                        />
                    </div>
                </div>

                <div className="relative z-10 pt-8 flex items-center gap-6 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    <span>© {new Date().getFullYear()} West Coast Property</span>
                    <span>•</span>
                    <span>Premium Assets Management</span>
                </div>
            </div>

            {/* RIGHT SIDE: Minimalist Login Area */}
            <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-8 lg:p-24 bg-slate-50/50 relative overflow-hidden">
                {/* Subtle Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>

                <div className="max-w-md w-full relative z-10">
                    {/* Back to Homepage Link */}
                    <button
                        onClick={() => navigate('/')}
                        className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-semibold">Retour à l'accueil</span>
                    </button>

                    {/* Header for Mobile */}
                    <div className="lg:hidden text-center mb-12">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/20">
                            <Building2 size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">West Coast Property</h1>
                    </div>

                    <div className="mb-10 text-center lg:text-left text-left">
                        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Bienvenue.</h3>
                        <p className="text-slate-500 font-medium">Connectez-vous pour accéder à votre espace sécurisé.</p>
                    </div>

                    {/* Agency Restricted Info - MOVED ABOVE FORM */}
                    <div className="mb-8 p-6 bg-blue-50/50 border border-blue-100/50 rounded-3xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 flex-shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <p className="text-[11px] text-blue-800/70 leading-relaxed font-semibold">
                            <span className="font-bold text-blue-900 block mb-0.5 uppercase tracking-wider">ACCÈS PRIVÉ ET SÉCURISÉ</span>
                            Les accès sont gérés exclusivement par nos conseillers. Un identifiant est requis pour continuer.
                        </p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100">
                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center animate-in zoom-in-95">
                                <ShieldCheck size={18} className="mr-3 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Role Select - Custom Styled */}
                            <div className="space-y-3 text-left">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">VOTRE PROFIL</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-bold appearance-none cursor-pointer hover:bg-slate-100/50"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        {roles.map(r => (
                                            <option key={r.value} value={r.value}>{r.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ArrowRight size={16} className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-left focus-within:text-primary transition-colors">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">IDENTIFIANT</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="email@agence.wcp"
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-300"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 text-left focus-within:text-primary transition-colors">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">MOT DE PASSE</label>
                                    <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Oublié ?</button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-300"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <WCPButton
                                type="submit"
                                className="w-full py-6 text-lg font-black group bg-slate-900 hover:bg-slate-800 text-white shadow-2xl transition-all duration-300"
                            >
                                SE CONNECTER
                                <ArrowRight size={22} className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </WCPButton>
                        </form>
                    </div>

                </div>

                {/* Mobile Public Links Overlay */}
                <div className="lg:hidden mt-8 w-full max-w-md grid grid-cols-1 gap-3">
                    <button
                        onClick={() => navigate('/rechercher-un-bien')}
                        className="p-4 bg-white rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 flex items-center justify-between shadow-sm"
                    >
                        Rechercher un bien <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={() => navigate('/ajouter-un-bien')}
                        className="p-4 bg-white rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 flex items-center justify-between shadow-sm"
                    >
                        Estimer mon bien <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={() => navigate('/apporter-des-affaires')}
                        className="p-4 bg-white rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 flex items-center justify-between shadow-sm"
                    >
                        Affaires & Apporteur <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const GlassAction = ({ icon, title, onClick }) => (
    <button
        onClick={onClick}
        className="group flex items-center justify-between p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left w-full"
    >
        <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                {icon}
            </div>
            <span className="text-sm font-bold text-white tracking-wide">{title}</span>
        </div>
        <ArrowRight size={18} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
    </button>
);

const ProspectiveAction = ({ icon, title, label, onClick, color }) => (
    <button
        onClick={onClick}
        className="group flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all text-left w-full"
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${color}`}>
            {icon}
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{label}</p>
        </div>
        <ArrowRight size={16} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </button>
);

export default LoginPage;
