import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { HiChat, HiX, HiPaperAirplane, HiKey } from 'react-icons/hi';
import { useGemini } from '../hooks/useGemini';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [apiKey, setApiKey] = useState(() => {
        return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';
    });
    const [showApiKeyInput, setShowApiKeyInput] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { sendMessage, isLoading } = useGemini();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: "Greetings, explorer! 🚀 I'm Ashish's AI co-pilot. Ask me anything about his missions, tech stack, or cosmic journey!"
            }]);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        if (!apiKey) {
            setShowApiKeyInput(true);
            return;
        }

        const userMessage: Message = { role: 'user', content: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const response = await sendMessage([...messages, userMessage], apiKey);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Unknown error';
            console.error('Chatbot Error:', err);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `⚠️ Error: ${errorMsg}. Please check your API key or try again.`
            }]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const saveApiKey = () => {
        if (apiKey) {
            localStorage.setItem('gemini_api_key', apiKey);
            setShowApiKeyInput(false);
        }
    };

    return (
        <>
            {/* Chat toggle button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 bg-gradient-to-r from-nebula-purple to-cosmic-blue rounded-full text-white shadow-lg nebula-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <HiX className="w-5 h-5 sm:w-6 sm:h-6" /> : <HiChat className="w-5 h-5 sm:w-6 sm:h-6" />}
                </motion.div>
            </motion.button>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-50 sm:w-80 md:w-96 max-h-[70vh] sm:max-h-[500px] cosmic-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl aurora-border"
                    >
                        {/* Header */}
                        <div className="p-3 sm:p-4 bg-gradient-to-r from-nebula-purple/20 to-cosmic-blue/20 border-b border-[var(--border-color)]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-nebula-purple to-cosmic-blue flex items-center justify-center text-white font-bold text-sm sm:text-base">
                                    🛸
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base">AI Co-Pilot</h3>
                                    <p className="text-xs text-[var(--text-muted)]">Powered by Gemini</p>
                                </div>
                            </div>
                        </div>

                        {/* API Key Input */}
                        {showApiKeyInput && (
                            <div className="p-3 sm:p-4 bg-solar-orange/10 border-b border-solar-orange/30">
                                <p className="text-xs sm:text-sm text-solar-light mb-2 flex items-center gap-2">
                                    <HiKey /> Enter your Gemini API key
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="API Key"
                                        className="flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm"
                                    />
                                    <button
                                        onClick={saveApiKey}
                                        className="px-3 py-2 bg-nebula-purple/20 text-nebula-light rounded-lg text-xs sm:text-sm font-medium"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 min-h-[200px] sm:min-h-[250px] max-h-[250px] sm:max-h-[300px]">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-nebula-purple to-cosmic-blue text-white'
                                            : 'cosmic-glass text-[var(--text-primary)]'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="cosmic-glass px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl flex gap-1.5">
                                        <span className="w-2 h-2 bg-nebula-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-nebula-light rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-nebula-light rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 sm:p-4 border-t border-[var(--border-color)]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Send a transmission..."
                                    className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 sm:p-2.5 bg-gradient-to-r from-nebula-purple to-cosmic-blue rounded-lg sm:rounded-xl text-white disabled:opacity-50"
                                >
                                    <HiPaperAirplane className="w-4 h-4 sm:w-5 sm:h-5 rotate-45" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
