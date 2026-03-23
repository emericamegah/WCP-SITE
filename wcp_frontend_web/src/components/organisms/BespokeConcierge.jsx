import React, { useEffect, useRef, useState } from 'react';
import Icon from '../atoms/Icon';

const FadeInWhenVisible = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisible(true);
                // observer.unobserve(domRef.current); // Disable unobserve if we want it to trigger every time, but best practice is unobserve for performance unless requested otherwise. We'll stick to unobserve.
            }
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const BespokeConcierge = () => {
    return (
        <section className="relative bg-surface-100 py-16 md:py-32 overflow-hidden" id="conciergerie">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-200/50 z-0"></div>

            <div className="container mx-auto px-4 sm:px-8 md:px-[8.5rem] relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    
                    {/* Left Column: Overlapping Images */}
                    <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
                        <FadeInWhenVisible delay={100} className="absolute left-0 top-12 md:top-24 w-2/3 h-[400px] z-10">
                            <img 
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Luxury Interior" 
                                className="w-full h-full object-cover shadow-[0_20px_50px_rgba(25,28,29,0.15)] rounded-2xl"
                            />
                        </FadeInWhenVisible>
                        <FadeInWhenVisible delay={300} className="absolute right-0 bottom-12 md:bottom-24 w-2/3 h-[350px] z-20">
                            <img 
                                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Concierge Details" 
                                className="w-full h-full object-cover shadow-[0_30px_60px_rgba(25,28,29,0.2)] rounded-3xl border-4 border-white"
                            />
                        </FadeInWhenVisible>
                        
                        {/* Decorative Badge */}
                        <FadeInWhenVisible delay={500} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                            <div className="glass w-24 h-24 rounded-full flex items-center justify-center shadow-xl">
                                <Icon name="Key" className="text-wcp-blue-600 w-8 h-8" />
                            </div>
                        </FadeInWhenVisible>
                    </div>

                    {/* Right Column: Editorial Text */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <FadeInWhenVisible delay={200}>
                            <h4 className="tech-label mb-6 text-wcp-blue-600">Service Signature</h4>
                        </FadeInWhenVisible>
                        
                        <FadeInWhenVisible delay={400}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-wcp-dark-900 leading-tight mb-8">
                                L'art de vivre, <br/> sur mesure.
                            </h2>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={600}>
                            <p className="text-lg md:text-xl text-wcp-grey-700 font-sans font-light leading-relaxed mb-6">
                                Notre service de conciergerie privée redéfinit les standards du luxe. De la gestion complète de votre domaine à l'organisation de vos événements privés, nos experts dévoués anticipent vos moindres désirs.
                            </p>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={800}>
                            <blockquote className="border-l-2 border-wcp-blue-600 pl-6 py-2 my-10 bg-wcp-blue-50/30 rounded-r-xl">
                                <p className="font-cursive text-2xl text-wcp-dark-800 leading-relaxed italic">
                                    "La perfection n'est pas un détail, c'est une exigence quotidienne."
                                </p>
                            </blockquote>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={1000}>
                            <button className="group inline-flex items-center gap-4 text-wcp-blue-600 font-sans font-bold uppercase tracking-widest text-sm hover:text-wcp-blue-700 transition-colors">
                                Découvrir nos services
                                <span className="w-12 h-px bg-wcp-blue-600 group-hover:w-16 transition-all duration-300"></span>
                            </button>
                        </FadeInWhenVisible>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BespokeConcierge;
