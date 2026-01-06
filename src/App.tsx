import { useTheme } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import ScrollEffects from './components/ScrollEffects';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import About from './components/About';
import ResumeTimeline from './components/ResumeTimeline';
import SkillsRadar from './components/SkillsRadar';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import GitHubStats from './components/GitHubStats';
import GitHubActivityFeed from './components/GitHubActivityFeed';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CommandPalette from './components/CommandPalette';
import MusicPlayer from './components/MusicPlayer';
import EasterEggs from './components/EasterEggs';

export default function App() {
    useTheme(); // Initialize theme context

    // Check if device supports hover (not mobile)
    const isTouchDevice = typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return (
        <div className={`relative min-h-screen ${!isTouchDevice ? 'cursor-none' : ''}`}>
            {/* Background effects - reduced in light mode via CSS */}
            <ParticleBackground />

            {/* Parallax scroll effects - hidden on mobile via CSS */}
            <ScrollEffects />

            {/* Custom cursor with hover states - only on non-touch devices */}
            {!isTouchDevice && <CustomCursor />}

            {/* Modern sticky navigation bar */}
            <Navbar />

            {/* Theme toggle button */}
            <ThemeToggle />

            {/* Scroll progress */}
            <ScrollProgress />

            {/* Command palette (Cmd+K) */}
            <CommandPalette />

            {/* Music player */}
            <MusicPlayer />

            {/* Easter eggs */}
            <EasterEggs />

            {/* Main content */}
            <main>
                <Hero />
                <About />
                <ResumeTimeline />
                <SkillsRadar />
                <TechStack />
                <Projects />
                <Testimonials />
                <GitHubStats />
                <GitHubActivityFeed />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* AI Chatbot */}
            <Chatbot />
        </div>
    );
}
