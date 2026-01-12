import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
    isHovering: boolean;
    hoverType: 'default' | 'link' | 'button' | 'card';
}

export default function CustomCursor() {
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        hoverType: 'default'
    });

    // Check for reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Motion values for cursor position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Springs for smooth following effect
    const ringX = useSpring(mouseX, { stiffness: 400, damping: 28 });
    const ringY = useSpring(mouseY, { stiffness: 400, damping: 28 });
    const dotX = useSpring(mouseX, { stiffness: 800, damping: 35 });
    const dotY = useSpring(mouseY, { stiffness: 800, damping: 35 });

    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Event delegation for hover states
            // Check what element is under the cursor
            const target = e.target as HTMLElement;
            
            // Check if the target or its parents are interactive
            // using closest() is much more efficient than attaching thousands of listeners
            const link = target.closest('a');
            const button = target.closest('button');
            const card = target.closest('.cosmic-card, .cosmic-glass, [data-cursor="card"]');

            if (link) {
                setCursorState({ isHovering: true, hoverType: 'link' });
            } else if (button) {
                setCursorState({ isHovering: true, hoverType: 'button' });
            } else if (card) {
                setCursorState({ isHovering: true, hoverType: 'card' });
            } else {
                setCursorState({ isHovering: false, hoverType: 'default' });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY, prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    // Get cursor scale based on hover state
    const getRingScale = () => {
        if (!cursorState.isHovering) return 1;
        switch (cursorState.hoverType) {
            case 'link': return 1.5;
            case 'button': return 1.8;
            case 'card': return 2;
            default: return 1;
        }
    };

    const getDotScale = () => {
        if (!cursorState.isHovering) return 1;
        switch (cursorState.hoverType) {
            case 'link': return 0.5;
            case 'button': return 0.3;
            case 'card': return 1.2;
            default: return 1;
        }
    };

    const getRingColor = () => {
        if (!cursorState.isHovering) return 'rgba(192, 132, 252, 0.8)';
        switch (cursorState.hoverType) {
            case 'link': return 'rgba(139, 92, 246, 1)';
            case 'button': return 'rgba(59, 130, 246, 1)';
            case 'card': return 'rgba(139, 92, 246, 0.5)';
            default: return 'rgba(192, 132, 252, 0.8)';
        }
    };

    return (
        <>
            {/* Outer ring cursor */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="w-8 h-8 rounded-full border-2"
                    animate={{
                        scale: getRingScale(),
                        borderColor: getRingColor(),
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                />
            </motion.div>

            {/* Inner dot cursor */}
            <motion.div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{
                        scale: getDotScale(),
                    }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                />
            </motion.div>
        </>
    );
}
