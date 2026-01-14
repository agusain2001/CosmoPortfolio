import Hero from '../components/Hero';
import About from '../components/About';
import ResumeTimeline from '../components/ResumeTimeline';
import Blog from '../components/Blog';
import Testimonials from '../components/Testimonials';

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <ResumeTimeline />
            <Testimonials />
            <Blog />
        </main>
    );
}
