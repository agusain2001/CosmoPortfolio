import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Skills', href: '/skills' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#hero');
    const [isScrolled, setIsScrolled] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { scrollY } = useScroll();

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Track scroll position for navbar background
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Track active section using Intersection Observer
    useEffect(() => {
        // Only run intersection observer on home page
        if (location.pathname !== '/') {
            setActiveSection(location.pathname);
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        }, observerOptions);

        // Observe all sections
        navItems.forEach((item) => {
            if (item.href.startsWith('#')) {
                const element = document.getElementById(item.href.replace('#', ''));
                if (element) observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [location.pathname]);

    const scrollToSection = useCallback((href: string) => {
        setIsOpen(false);

        // Handle Page Navigation (non-hash links)
        if (!href.startsWith('#')) {
            navigate(href);
            return;
        }

        // Handle Scroll to Section
        const targetId = href.replace('#', '');
        
        if (location.pathname !== '/') {
            // If not on home page, navigate to home then scroll
            navigate('/');
            // Small delay to allow navigation to occur before scrolling
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            }, 100);
        } else {
            // Already on home page, just scroll
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        }
    }, [prefersReducedMotion, navigate, location.pathname]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('change', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-[var(--bg-card)] backdrop-blur-xl shadow-lg border-b border-[var(--border-color)]'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <motion.a
                            href="#hero"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#hero');
                            }}
                            className="relative z-50 flex items-center gap-2"
                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-3xl md:text-5xl font-bold text-gradient">
                                AG
                            </span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1 lg:gap-2">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href);
                                    }}
                                    className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${activeSection === item.href
                                        ? 'text-[var(--text-primary)]'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                        }`}
                                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}

                                    {/* Active indicator */}
                                    {activeSection === item.href && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-nebula-purple/10 rounded-lg border border-nebula-purple/30"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-50 md:hidden p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <HiX className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <HiMenu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="fixed top-0 right-0 z-40 h-full w-72 bg-[var(--bg-primary)] border-l border-[var(--border-color)] md:hidden"
                        >
                            <div className="flex flex-col pt-24 px-6">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{
                                            delay: index * 0.05,
                                            duration: 0.3,
                                        }}
                                        className={`py-4 text-lg font-medium border-b border-[var(--border-color)] transition-colors ${activeSection === item.href
                                            ? 'text-nebula-light'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            {activeSection === item.href && (
                                                <motion.span
                                                    layoutId="mobileActiveIndicator"
                                                    className="w-2 h-2 rounded-full bg-nebula-light"
                                                />
                                            )}
                                            {item.label}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
