import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaQuoteLeft, FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Testimonial {
    name: string;
    role: string;
    company: string;
    image: string;
    text: string;
    linkedIn?: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Dr. Rajesh Kumar',
        role: 'Professor',
        company: 'G.B. Pant University',
        image: '👨‍🏫',
        text: "Ashish demonstrated exceptional aptitude in AI and machine learning during his Master's program. His dedication to learning cutting-edge technologies and applying them to real-world problems is commendable.",
    },
    {
        name: 'Priya Sharma',
        role: 'Senior AI Engineer',
        company: 'Tech Company',
        image: '👩‍💻',
        text: 'Working with Ashish on the ConnectAI project was a great experience. His understanding of LangChain and multi-agent systems is impressive, and he consistently delivers high-quality solutions.',
    },
    {
        name: 'Amit Patel',
        role: 'Team Lead',
        company: 'Data Analytics Firm',
        image: '👨‍💼',
        text: 'Ashish brought significant improvements to our ETL pipelines, achieving a 30% speed boost. His problem-solving skills and attention to detail make him a valuable team member.',
    },
    {
        name: 'Neha Gupta',
        role: 'Project Manager',
        company: 'Software Solutions',
        image: '👩‍💼',
        text: 'Ashish is a fast learner who quickly adapts to new technologies. His work on LLM applications and RAG systems has been instrumental in advancing our AI capabilities.',
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="text-gradient">⭐ Mission Reviews</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4">
                        What fellow explorers say about our collaborations
                    </p>
                </motion.div>

                {/* Main testimonial card */}
                <div className="max-w-4xl mx-auto relative">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="cosmic-card rounded-3xl p-6 sm:p-8 lg:p-10 aurora-border"
                    >
                        <FaQuoteLeft className="text-3xl sm:text-4xl text-nebula-purple/30 mb-4 sm:mb-6" />

                        <p className="text-base sm:text-lg lg:text-xl text-[var(--text-primary)] leading-relaxed mb-6 sm:mb-8 italic">
                            "{testimonials[currentIndex].text}"
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="text-4xl sm:text-5xl">
                                {testimonials[currentIndex].image}
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                                    {testimonials[currentIndex].name}
                                </h4>
                                <p className="text-sm sm:text-base text-nebula-light">
                                    {testimonials[currentIndex].role}
                                </p>
                                <p className="text-sm text-[var(--text-muted)]">
                                    {testimonials[currentIndex].company}
                                </p>
                            </div>
                            {testimonials[currentIndex].linkedIn && (
                                <a
                                    href={testimonials[currentIndex].linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto p-2 cosmic-card rounded-xl text-cosmic-light hover:text-nebula-light transition-colors"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Navigation arrows */}
                    <div className="flex justify-center gap-4 mt-6 sm:mt-8">
                        <motion.button
                            onClick={prevTestimonial}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 cosmic-card rounded-full text-[var(--text-secondary)] hover:text-nebula-light transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <FaChevronLeft className="w-5 h-5" />
                        </motion.button>

                        {/* Dots indicator */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-nebula-purple w-8'
                                            : 'bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/50'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={nextTestimonial}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 cosmic-card rounded-full text-[var(--text-secondary)] hover:text-nebula-light transition-colors"
                            aria-label="Next testimonial"
                        >
                            <FaChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
