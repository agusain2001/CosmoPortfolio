import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiChevronDown } from 'react-icons/hi';
import { useTypewriter } from '../hooks/useTypewriter';
import { STATIC_VALUES } from '../utils/values';

const socialLinks = [
    { icon: FaLinkedin, href: STATIC_VALUES.url.socialMedia.linkedin, label: 'LinkedIn' },
    { icon: FaGithub, href: STATIC_VALUES.url.socialMedia.github, label: 'GitHub' },
    { icon: HiMail, href: STATIC_VALUES.url.gmail, label: 'Email' },
    { icon: FaStackOverflow, href: 'https://stackoverflow.com', label: 'Stack Overflow' },
    { icon: FaXTwitter, href: STATIC_VALUES.url.socialMedia.x, label: 'X/Twitter' },
];

const rotatingTexts = [
    '🚀 Exploring AI Galaxies',
    '✨ Building Intelligent Constellations',
    '🌌 Navigating Data Nebulas',
];

export default function Hero() {
    const { displayText } = useTypewriter({
        texts: rotatingTexts,
        typingSpeed: 80,
        deletingSpeed: 40,
        pauseTime: 2500,
    });

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
            {/* Floating planet - hidden on mobile */}
            <motion.div
                className="absolute top-20 right-20 w-32 h-32 planet opacity-60 hidden md:block"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute bottom-32 left-16 w-16 h-16 rounded-full bg-gradient-to-br from-solar-orange to-solar-light opacity-40 hidden lg:block"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}
            />

            {/* Content */}
            <div className="container relative z-20 text-center">
                {/* Animated greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 cosmic-card rounded-full text-nebula-light text-xs sm:text-sm font-medium">
                        🌟 Welcome to my universe
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
                >
                    <span className="text-gradient">ASHISH GUSAIN</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] mb-6 sm:mb-8 font-light"
                >
                    AI Engineer | Data Architect | Open Source Explorer
                </motion.p>

                {/* Typewriter text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="h-12 sm:h-16 flex items-center justify-center mb-8 sm:mb-12"
                >
                    <div className="cosmic-card px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl aurora-border">
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-cosmic-light">
                            {displayText}
                            <span className="animate-pulse ml-1 text-nebula-light">|</span>
                        </span>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
                >
                    <a
                        href="/projects"
                        className="px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-nebula-purple to-cosmic-blue rounded-full font-semibold text-white hover-lift nebula-glow transition-all duration-300 text-sm sm:text-base"
                    >
                        Explore Projects 🚀
                    </a>
                    <a
                        href={STATIC_VALUES.url.resumeView}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 sm:px-8 sm:py-3.5 cosmic-card rounded-full font-semibold text-[var(--text-primary)] hover:opacity-80 transition-all duration-300 text-sm sm:text-base"
                    >
                        Download Resume 📄
                    </a>
                </motion.div>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex justify-center gap-3 sm:gap-4"
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.15 }}
                            className="p-2.5 sm:p-3 cosmic-card rounded-lg sm:rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                            aria-label={social.label}
                        >
                            <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={scrollToAbout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 1.5 },
                    y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 text-[var(--text-muted)] hover:text-nebula-light transition-colors"
                aria-label="Scroll to About section"
            >
                <HiChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.button>

            {/* Orbiting elements - hidden on mobile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block">
                <motion.div
                    className="absolute w-3 h-3 bg-nebula-light rounded-full"
                    style={{ boxShadow: '0 0 10px var(--nebula-light)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    initial={{ x: 280, y: 0 }}
                />
                <motion.div
                    className="absolute w-2 h-2 bg-cosmic-light rounded-full"
                    style={{ boxShadow: '0 0 8px var(--cosmic-light)' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    initial={{ x: 200, y: 0 }}
                />
            </div>
        </section>
    );
}
