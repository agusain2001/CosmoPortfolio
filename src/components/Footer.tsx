import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiChevronUp } from 'react-icons/hi';
import { STATIC_VALUES } from '../utils/values';

const socialLinks = [
    { icon: FaLinkedin, href: STATIC_VALUES.url.socialMedia.linkedin, label: 'LinkedIn' },
    { icon: FaGithub, href: STATIC_VALUES.url.socialMedia.github, label: 'GitHub' },
    { icon: HiMail, href: STATIC_VALUES.url.gmail, label: 'Email' },
    { icon: FaXTwitter, href: STATIC_VALUES.url.socialMedia.x, label: 'X/Twitter' },
];

const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Resume', href: '#resume' },
    { label: 'Skills', href: '#skills-radar' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'Contact', href: '#contact' },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative py-8 sm:py-10 lg:py-12 bg-[var(--bg-card)] backdrop-blur-xl border-t border-[var(--border-color)]">
            {/* Aurora divider */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-nebula-purple via-cosmic-blue to-solar-orange" />

            <div className="container mx-auto px-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-gradient mb-3 sm:mb-4">Ashish Gusain</h3>
                        <p className="text-[var(--text-secondary)] mb-3 sm:mb-4 text-sm sm:text-base">
                            AI Explorer charting new courses through the technology cosmos.
                        </p>
                        <div className="flex gap-2 sm:gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 sm:p-2.5 cosmic-card rounded-lg sm:rounded-xl text-[var(--text-secondary)] hover:text-nebula-light transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-3 sm:mb-4">Navigation</h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--text-secondary)] hover:text-nebula-light transition-colors duration-300 text-sm sm:text-base"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="sm:col-span-2 md:col-span-1"
                    >
                        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-3 sm:mb-4">Built With</h4>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <span className="tech-badge text-xs">
                                <FaHeart className="text-solar-orange" /> Passion
                            </span>
                            <span className="tech-badge text-xs">☕ Coffee</span>
                            <span className="tech-badge text-xs">⚛️ React</span>
                            <span className="tech-badge text-xs">🌌 Stardust</span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-[var(--border-color)] gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[var(--text-muted)] text-xs sm:text-sm text-center sm:text-left"
                    >
                        © 2026 Ashish Gusain. Crafted with <FaHeart className="inline text-solar-orange mx-1" /> and ☕
                    </motion.p>

                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -3 }}
                        className="p-2.5 sm:p-3 cosmic-card rounded-full text-[var(--text-secondary)] hover:text-nebula-light transition-all duration-300 group"
                        aria-label="Scroll to top"
                    >
                        <HiChevronUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
