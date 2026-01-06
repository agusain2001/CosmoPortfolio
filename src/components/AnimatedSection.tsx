import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    stagger?: boolean;
    staggerDelay?: number;
    once?: boolean;
}

// Detect reduced motion preference
const usePrefersReducedMotion = () => {
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

    return prefersReducedMotion;
};

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    stagger = false,
    staggerDelay = 0.1,
    once = false,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        margin: '-10% 0px -10% 0px',
        amount: 0.1
    });
    const controls = useAnimation();
    const prefersReducedMotion = usePrefersReducedMotion();

    // Get initial position based on direction
    const getInitialPosition = () => {
        if (prefersReducedMotion) return { x: 0, y: 0 };

        switch (direction) {
            case 'up':
                return { x: 0, y: 60 };
            case 'down':
                return { x: 0, y: -60 };
            case 'left':
                return { x: 60, y: 0 };
            case 'right':
                return { x: -60, y: 0 };
            case 'none':
                return { x: 0, y: 0 };
            default:
                return { x: 0, y: 60 };
        }
    };

    const initialPosition = getInitialPosition();

    // Animation variants
    const containerVariants: Variants = {
        hidden: {
            opacity: prefersReducedMotion ? 1 : 0,
            ...initialPosition,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : delay,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easeOut
                staggerChildren: stagger ? staggerDelay : 0,
            },
        },
        exit: {
            opacity: prefersReducedMotion ? 1 : 0,
            ...initialPosition,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.55, 0.06, 0.68, 0.19], // Custom easeIn
            },
        },
    };

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        } else if (!once) {
            controls.start('exit');
        }
    }, [isInView, controls, once]);

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Child component for staggered animations
interface AnimatedItemProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function AnimatedItem({
    children,
    className = '',
    direction = 'up',
}: AnimatedItemProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const getInitialPosition = () => {
        if (prefersReducedMotion) return { x: 0, y: 0 };

        switch (direction) {
            case 'up':
                return { x: 0, y: 30 };
            case 'down':
                return { x: 0, y: -30 };
            case 'left':
                return { x: 30, y: 0 };
            case 'right':
                return { x: -30, y: 0 };
            case 'none':
                return { x: 0, y: 0 };
            default:
                return { x: 0, y: 30 };
        }
    };

    const initialPosition = getInitialPosition();

    const itemVariants: Variants = {
        hidden: {
            opacity: prefersReducedMotion ? 1 : 0,
            ...initialPosition,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        exit: {
            opacity: prefersReducedMotion ? 1 : 0,
            ...initialPosition,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.3,
                ease: [0.55, 0.06, 0.68, 0.19],
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}
