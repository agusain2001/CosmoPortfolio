import { motion } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed top-6 left-6 md:left-auto md:right-6 z-40 p-3 rounded-full theme-toggle-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <HiSun className="w-5 h-5 text-solar-orange" />
                ) : (
                    <HiMoon className="w-5 h-5 text-nebula-purple" />
                )}
            </motion.div>
        </motion.button>
    );
}

