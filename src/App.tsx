import { useTheme } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import ScrollEffects from './components/ScrollEffects';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CommandPalette from './components/CommandPalette';
import MusicPlayer from './components/MusicPlayer';
import EasterEggs from './components/EasterEggs';
import SEO from './components/SEO';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Error = lazy(() => import('./pages/Error'));

export default function App() {
    useTheme(); // Initialize theme context

    // Check if device supports hover (not mobile)
    const isTouchDevice = typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return (
        <div className={`relative min-h-screen ${!isTouchDevice ? 'cursor-none' : ''}`}>
            {/* SEO Meta Tags */}
            <SEO />

            {/* Background effects - reduced in light mode via CSS */}
            <ParticleBackground />

            {/* Parallax scroll effects - hidden on mobile via CSS */}
            <ScrollEffects />

            {/* Custom cursor with hover states - only on non-touch devices */}
            {!isTouchDevice && <CustomCursor />}

            {/* Modern sticky navigation bar */}
            <Navbar />

            {/* Scroll progress */}
            <ScrollProgress />

            {/* Command palette (Cmd+K) */}
            {!isTouchDevice && <CommandPalette />}

            {/* Music player */}
            <MusicPlayer />

            {/* Easter eggs */}
            {!isTouchDevice && <EasterEggs />}
    
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-10 h-10 border-4 border-nebula-purple border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Suspense>

            {/* Footer */}
            <Footer />

            {/* AI Chatbot */}
            <Chatbot />
        </div>
    );
}
