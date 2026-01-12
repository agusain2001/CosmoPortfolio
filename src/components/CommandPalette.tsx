import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    HiSearch, HiHome, HiUser, HiCode, HiFolder, HiMail,
    HiDocumentText, HiMoon, HiSun, HiExternalLink, HiX
} from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { STATIC_VALUES } from '../utils/values';

interface Command {
    id: string;
    title: string;
    description?: string;
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    keywords: string[];
    category: 'navigation' | 'actions' | 'links';
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme, toggleTheme } = useTheme();

    const commands: Command[] = [
        // Navigation
        { id: 'home', title: 'Go to Home', icon: HiHome, action: () => scrollTo('#hero'), keywords: ['home', 'top', 'start'], category: 'navigation' },
        { id: 'about', title: 'Go to About', icon: HiUser, action: () => scrollTo('#about'), keywords: ['about', 'bio', 'mission'], category: 'navigation' },
        { id: 'skills', title: 'Go to Skills', icon: HiCode, action: () => scrollTo('#tech'), keywords: ['skills', 'tech', 'stack'], category: 'navigation' },
        { id: 'projects', title: 'Go to Projects', icon: HiFolder, action: () => scrollTo('#projects'), keywords: ['projects', 'work', 'portfolio'], category: 'navigation' },
        { id: 'contact', title: 'Go to Contact', icon: HiMail, action: () => scrollTo('#contact'), keywords: ['contact', 'email', 'message'], category: 'navigation' },
        { id: 'resume', title: 'Go to Resume', icon: HiDocumentText, action: () => scrollTo('#resume'), keywords: ['resume', 'cv', 'timeline'], category: 'navigation' },

        // Actions
        { id: 'theme', title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: theme === 'dark' ? HiSun : HiMoon, action: toggleTheme, keywords: ['theme', 'dark', 'light', 'mode'], category: 'actions' },
        { id: 'download-resume', title: 'Download Resume', icon: HiDocumentText, action: () => window.open('https://drive.google.com/uc?export=download&id=1hg-mI58L85e6ibo5GOl6Gwg4sMdSqOG_', '_blank'), keywords: ['download', 'resume', 'cv', 'pdf'], category: 'actions' },

        // Links
        { id: 'github', title: 'Open GitHub Profile', icon: FaGithub, action: () => window.open(STATIC_VALUES.url.socialMedia.github, '_blank'), keywords: ['github', 'code', 'repos'], category: 'links' },
        { id: 'linkedin', title: 'Open LinkedIn Profile', icon: FaLinkedin, action: () => window.open(STATIC_VALUES.url.socialMedia.linkedin, '_blank'), keywords: ['linkedin', 'connect', 'network'], category: 'links' },
    ];

    const scrollTo = (selector: string) => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    const filteredCommands = commands.filter(cmd => {
        const searchLower = search.toLowerCase();
        return cmd.title.toLowerCase().includes(searchLower) ||
            cmd.keywords.some(k => k.includes(searchLower));
    });

    const executeCommand = useCallback((command: Command) => {
        command.action();
        setIsOpen(false);
        setSearch('');
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Cmd/Ctrl + K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }

            if (!isOpen) return;

            // Close with Escape
            if (e.key === 'Escape') {
                setIsOpen(false);
                setSearch('');
            }

            // Navigate with arrows
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            }

            // Execute with Enter
            if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                executeCommand(filteredCommands[selectedIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, executeCommand]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Reset selection when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const categories = {
        navigation: 'Navigation',
        actions: 'Actions',
        links: 'External Links',
    };

    const groupedCommands = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
    }, {} as Record<string, Command[]>);

    return (
        <>
            {/* Trigger hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 hidden sm:block"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 cosmic-card rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <HiSearch className="w-4 h-4" />
                    <span>Press</span>
                    <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded text-[10px] font-mono">⌘ + K</kbd>
                </button>
            </motion.div>

            {/* Command palette modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.15 }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-[201] cosmic-card rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Search input */}
                            <div className="flex items-center gap-3 p-4 border-b border-[var(--border-color)]">
                                <HiSearch className="w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
                                >
                                    <HiX className="w-5 h-5 text-[var(--text-muted)]" />
                                </button>
                            </div>

                            {/* Commands list */}
                            <div className="max-h-80 overflow-y-auto p-2">
                                {filteredCommands.length === 0 ? (
                                    <p className="text-center text-[var(--text-muted)] py-8">No commands found</p>
                                ) : (
                                    Object.entries(groupedCommands).map(([category, cmds]) => (
                                        <div key={category} className="mb-2">
                                            <p className="text-xs text-[var(--text-muted)] px-3 py-2 uppercase tracking-wider">
                                                {categories[category as keyof typeof categories]}
                                            </p>
                                            {cmds.map((cmd) => {
                                                const globalIndex = filteredCommands.indexOf(cmd);
                                                return (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={() => executeCommand(cmd)}
                                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${globalIndex === selectedIndex
                                                                ? 'bg-nebula-purple/20 text-[var(--text-primary)]'
                                                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                                                            }`}
                                                    >
                                                        <cmd.icon className="w-5 h-5" />
                                                        <span className="flex-1">{cmd.title}</span>
                                                        {cmd.category === 'links' && (
                                                            <HiExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer hints */}
                            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded">↑↓</kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded">↵</kbd>
                                        Select
                                    </span>
                                </div>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded">Esc</kbd>
                                    Close
                                </span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
