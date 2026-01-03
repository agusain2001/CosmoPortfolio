import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

const secrets = [
    { id: 'matrix', title: '🔴 Matrix Mode Activated!', message: 'You found the red pill. Welcome to the real code.' },
    { id: 'rocket', title: '🚀 Launch Sequence Initiated!', message: "T-minus 10 seconds to blast off!" },
    { id: 'space', title: '👽 Alien Contact Established!', message: 'Greetings, fellow explorer of the cosmos!' },
];

export default function EasterEggs() {
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const [showSecret, setShowSecret] = useState<typeof secrets[0] | null>(null);
    const [matrixMode, setMatrixMode] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
        setInputSequence(newSequence);

        // Check if Konami code is entered
        if (newSequence.join(',') === KONAMI_CODE.join(',')) {
            setMatrixMode(true);
            setShowSecret(secrets[0]);
            setInputSequence([]);

            // Reset after 10 seconds
            setTimeout(() => {
                setMatrixMode(false);
                setShowSecret(null);
            }, 10000);
        }
    }, [inputSequence]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Secret click counter (click logo 7 times)
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        const handleLogoClick = () => {
            setClickCount((prev) => prev + 1);
        };

        const logo = document.querySelector('[data-logo]');
        logo?.addEventListener('click', handleLogoClick);
        return () => logo?.removeEventListener('click', handleLogoClick);
    }, []);

    useEffect(() => {
        if (clickCount === 7) {
            setShowSecret(secrets[1]);
            setClickCount(0);
            setTimeout(() => setShowSecret(null), 5000);
        }
    }, [clickCount]);

    return (
        <>
            {/* Matrix rain effect */}
            <AnimatePresence>
                {matrixMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
                    >
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-green-500 font-mono text-sm"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: -100,
                                    opacity: Math.random()
                                }}
                                animate={{
                                    y: window.innerHeight + 100,
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            >
                                {String.fromCharCode(0x30A0 + Math.random() * 96)}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Secret modal */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[101] cosmic-card rounded-2xl p-6 aurora-border text-center max-w-sm"
                    >
                        <h3 className="text-xl font-bold text-gradient mb-2">{showSecret.title}</h3>
                        <p className="text-[var(--text-secondary)]">{showSecret.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint for discoverers */}
            <div className="hidden">
                {/* Hint: Try the Konami Code! ↑↑↓↓←→←→BA */}
                {/* Or click the logo 7 times... */}
            </div>
        </>
    );
}
