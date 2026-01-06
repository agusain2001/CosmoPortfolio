import { ReactNode, useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Hook for reduced motion preference
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

// Animated Button with lift and shadow effect
interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
}

export function AnimatedButton({
    children,
    variant = 'primary',
    className = '',
    ...props
}: AnimatedButtonProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const baseStyles = {
        primary: 'bg-gradient-to-r from-nebula-purple to-cosmic-blue text-white',
        secondary: 'cosmic-card border border-[var(--border-color)] text-[var(--text-primary)]',
        ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
    };

    return (
        <motion.button
            className={`relative px-6 py-3 rounded-xl font-medium overflow-hidden ${baseStyles[variant]} ${className}`}
            whileHover={
                prefersReducedMotion
                    ? {}
                    : {
                        y: -3,
                        boxShadow: variant === 'primary'
                            ? '0 10px 30px rgba(139, 92, 246, 0.4)'
                            : '0 10px 20px rgba(0, 0, 0, 0.2)',
                    }
            }
            whileTap={{ scale: 0.97 }}
            transition={{
                duration: 0.2,
                ease: 'easeOut',
            }}
            {...props}
        >
            {/* Shimmer effect on hover */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

// Animated Card with tilt/depth effect
interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    enableTilt?: boolean;
    glowOnHover?: boolean;
}

export function AnimatedCard({
    children,
    className = '',
    enableTilt = true,
    glowOnHover = true,
}: AnimatedCardProps) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion || !enableTilt) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -5;
        const rotateYValue = ((x - centerX) / centerX) * 5;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
            }}
            transition={{
                duration: 0.1,
                ease: 'linear',
            }}
            whileHover={
                prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.02,
                        boxShadow: glowOnHover
                            ? '0 20px 40px rgba(139, 92, 246, 0.15)'
                            : '0 20px 40px rgba(0, 0, 0, 0.15)',
                    }
            }
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {children}
        </motion.div>
    );
}

// Animated Icon with rotation/scale on hover
interface AnimatedIconProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: 'rotate' | 'scale' | 'bounce' | 'pulse';
}

export function AnimatedIcon({
    children,
    className = '',
    hoverEffect = 'scale',
}: AnimatedIconProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const getHoverAnimation = () => {
        if (prefersReducedMotion) return {};

        switch (hoverEffect) {
            case 'rotate':
                return { rotate: 15 };
            case 'scale':
                return { scale: 1.2 };
            case 'bounce':
                return { y: -3 };
            case 'pulse':
                return { scale: [1, 1.1, 1] };
            default:
                return { scale: 1.2 };
        }
    };

    return (
        <motion.span
            className={`inline-flex items-center justify-center ${className}`}
            whileHover={getHoverAnimation()}
            transition={{
                duration: hoverEffect === 'pulse' ? 0.5 : 0.2,
                ease: hoverEffect === 'bounce' ? 'easeOut' : 'easeInOut',
            }}
        >
            {children}
        </motion.span>
    );
}

// Animated Link with underline effect
interface AnimatedLinkProps extends Omit<HTMLMotionProps<"a">, 'children'> {
    children: ReactNode;
    underlineColor?: string;
}

export function AnimatedLink({
    children,
    className = '',
    underlineColor = 'var(--nebula-light)',
    ...props
}: AnimatedLinkProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <motion.a
            className={`relative inline-block ${className}`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            {...props}
        >
            {children}
            <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                style={{ backgroundColor: underlineColor }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: prefersReducedMotion ? 0 : 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            />
        </motion.a>
    );
}

// Magnetic wrapper for magnetic effect on hover
interface MagneticWrapperProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export function MagneticWrapper({
    children,
    className = '',
    strength = 0.3,
}: MagneticWrapperProps) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        setPosition({ x: x * strength, y: y * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}
