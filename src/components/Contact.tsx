import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { HiMail, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormStatus {
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

const contactInfo = [
    {
        icon: HiMail,
        label: 'Transmission',
        value: '2001.ashish.official@gmail.com',
        href: 'mailto:2001.ashish.official@gmail.com',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        value: 'ashish-gusain',
        href: 'https://www.linkedin.com/in/ashish-gusain-aa279a280/',
    },
    {
        icon: FaGithub,
        label: 'GitHub',
        value: 'agusain2001',
        href: 'https://github.com/agusain2001',
    },
    {
        icon: FaXTwitter,
        label: 'X/Twitter',
        value: '@2001agusain',
        href: 'https://x.com/2001agusain',
    },
];

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Transmitting...' });

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus({ type: 'success', message: 'Transmission successful! I\'ll respond soon.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);
        } catch {
            setStatus({ type: 'error', message: 'Transmission failed. Please retry.' });
        }
    };

    return (
        <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="text-gradient">📡 Establish Contact</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Ready to launch a new mission? Send a transmission!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="cosmic-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 aurora-border">
                            <div className="space-y-4 sm:space-y-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base"
                                    placeholder="Your Callsign"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base"
                                    placeholder="Transmission Frequency (Email)"
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base"
                                    placeholder="Mission Subject"
                                />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl resize-none text-sm sm:text-base"
                                    placeholder="Your Message to the Cosmos"
                                />

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <motion.button
                                        type="submit"
                                        disabled={status.type === 'loading'}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-nebula-purple to-cosmic-blue rounded-lg sm:rounded-xl font-semibold text-white flex items-center justify-center gap-2 nebula-glow transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                                    >
                                        {status.type === 'loading' ? (
                                            <>
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Transmitting...
                                            </>
                                        ) : (
                                            <>
                                                <HiPaperAirplane className="w-4 h-4 sm:w-5 sm:h-5 rotate-45" />
                                                Launch Transmission
                                            </>
                                        )}
                                    </motion.button>

                                    <motion.a
                                        href="https://calendly.com/2001-ashish-official"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 py-3 sm:py-4 cosmic-card border border-nebula-purple/40 rounded-lg sm:rounded-xl font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 hover:bg-nebula-purple/10 transition-all duration-300 text-sm sm:text-base"
                                    >
                                        ☕ Book a 15-min Chat
                                    </motion.a>
                                </div>

                                {status.type !== 'idle' && status.type !== 'loading' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-center py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm ${status.type === 'success'
                                            ? 'bg-cosmic-blue/20 text-cosmic-light border border-cosmic-blue/30'
                                            : 'bg-solar-orange/20 text-solar-light border border-solar-orange/30'
                                            }`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-3 sm:space-y-4 lg:space-y-5"
                    >
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={info.label}
                                href={info.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ x: 8 }}
                                className="cosmic-card rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 group cursor-pointer"
                            >
                                <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-nebula-purple/20 shrink-0">
                                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-nebula-light" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs sm:text-sm text-[var(--text-muted)]">{info.label}</div>
                                    <div className="text-[var(--text-primary)] font-medium group-hover:text-nebula-light transition-colors text-sm sm:text-base truncate">
                                        {info.value}
                                    </div>
                                </div>
                            </motion.a>
                        ))}

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="cosmic-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6"
                        >
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <div className="p-2.5 sm:p-3 bg-solar-orange/20 rounded-lg sm:rounded-xl shrink-0">
                                    <HiLocationMarker className="w-5 h-5 sm:w-6 sm:h-6 text-solar-orange" />
                                </div>
                                <div>
                                    <div className="text-xs sm:text-sm text-[var(--text-muted)]">Base Station</div>
                                    <div className="text-[var(--text-primary)] font-medium text-sm sm:text-base">Kotdwara, Uttarakhand, India 🇮🇳</div>
                                </div>
                            </div>
                            <p className="text-[var(--text-muted)] text-xs sm:text-sm">
                                Open to interstellar collaborations and remote missions!
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
