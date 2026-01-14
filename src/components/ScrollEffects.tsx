import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollEffects() {
    const { scrollY } = useScroll();
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Smooth scroll progress
    const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

    // Parallax transforms
    const y1 = useTransform(smoothScrollY, [0, 3000], [0, -300]);
    const y2 = useTransform(smoothScrollY, [0, 3000], [0, -500]);
    const y3 = useTransform(smoothScrollY, [0, 3000], [0, -200]);
    const rotate1 = useTransform(smoothScrollY, [0, 3000], [0, 360]);
    const rotate2 = useTransform(smoothScrollY, [0, 3000], [0, -180]);

    // Detect scroll direction with throttle
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScrollDir = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY) > 10) { // Threshold to avoid jitter
                if (currentScrollY > lastScrollY) {
                    setScrollDirection('down');
                } else if (currentScrollY < lastScrollY) {
                    setScrollDirection('up');
                }
                lastScrollY = currentScrollY;
            }
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide on mobile
    if (isMobile) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
            {/* Parallax floating orbs */}
            <motion.div
                className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full opacity-20"
                style={{
                    y: y1,
                    rotate: rotate1,
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
                }}
            />

            <motion.div
                className="absolute top-[30%] right-[10%] w-48 h-48 rounded-full opacity-25"
                style={{
                    y: y2,
                    rotate: rotate2,
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
                }}
            />

            <motion.div
                className="absolute top-[60%] left-[15%] w-32 h-32 rounded-full opacity-20"
                style={{
                    y: y3,
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)'
                }}
            />

            {/* Scroll direction indicators */}
            {scrollDirection === 'down' && (
                <>
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={`down-${i}`}
                            className="absolute right-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: [0, 1, 0], y: [0, 100, 200] }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.1,
                                repeat: Infinity,
                                ease: 'easeOut'
                            }}
                            style={{ top: `${20 + i * 10}%` }}
                        >
                            <div className="w-1 h-8 bg-gradient-to-b from-nebula-purple to-transparent rounded-full" />
                        </motion.div>
                    ))}
                </>
            )}

            {scrollDirection === 'up' && (
                <>
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={`up-${i}`}
                            className="absolute left-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: [0, 1, 0], y: [0, -100, -200] }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.1,
                                repeat: Infinity,
                                ease: 'easeOut'
                            }}
                            style={{ top: `${60 - i * 10}%` }}
                        >
                            <div className="w-1 h-8 bg-gradient-to-t from-cosmic-blue to-transparent rounded-full" />
                        </motion.div>
                    ))}
                </>
            )}

            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-[20%] right-[20%] w-8 h-8"
                style={{ y: y1, rotate: rotate1 }}
            >
                <div className="w-full h-full border border-nebula-purple/30 rotate-45" />
            </motion.div>

            <motion.div
                className="absolute top-[50%] left-[8%] w-6 h-6"
                style={{ y: y2, rotate: rotate2 }}
            >
                <div className="w-full h-full border border-cosmic-blue/30 rounded-full" />
            </motion.div>

            <motion.div
                className="absolute top-[70%] right-[15%] w-4 h-4"
                style={{ y: y3 }}
            >
                <div
                    className="w-full h-full bg-solar-orange/20"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
            </motion.div>
        </div>
    );
}
