import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Skill {
    name: string;
    level: number; // 0-100
    color: string;
}

const skills: Skill[] = [
    { name: 'Python', level: 95, color: '#3B82F6' },
    { name: 'AI/ML', level: 90, color: '#8B5CF6' },
    { name: 'LangChain', level: 88, color: '#C084FC' },
    { name: 'Data Engineering', level: 85, color: '#60A5FA' },
    { name: 'FastAPI', level: 82, color: '#F59E0B' },
    { name: 'Cloud (AWS/GCP)', level: 75, color: '#FBBF24' },
    { name: 'Docker', level: 78, color: '#10B981' },
    { name: 'JavaScript', level: 70, color: '#EAB308' },
];

export default function SkillsRadar() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (canvasRef.current) {
            observer.observe(canvasRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const duration = 1500;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setAnimationProgress(progress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isDark = !document.documentElement.classList.contains('light');
        const dpr = window.devicePixelRatio || 1;
        const size = Math.min(400, window.innerWidth - 40);

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(dpr, dpr);

        const centerX = size / 2;
        const centerY = size / 2;
        const maxRadius = size / 2 - 50;
        const levels = 5;
        const numSkills = skills.length;
        const angleStep = (Math.PI * 2) / numSkills;

        ctx.clearRect(0, 0, size, size);

        // Draw background circles
        for (let i = 1; i <= levels; i++) {
            const radius = (maxRadius / levels) * i;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw axis lines
        skills.forEach((_, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + Math.cos(angle) * maxRadius;
            const y = centerY + Math.sin(angle) * maxRadius;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Draw skill polygon
        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const radius = (skill.level / 100) * maxRadius * animationProgress;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();

        // Fill with gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = isDark ? '#8B5CF6' : '#7C3AED';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw skill points and labels
        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const radius = (skill.level / 100) * maxRadius * animationProgress;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            // Point
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = skill.color;
            ctx.fill();
            ctx.strokeStyle = isDark ? '#FFFFFF' : '#0F172A';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label
            const labelRadius = maxRadius + 25;
            const labelX = centerX + Math.cos(angle) * labelRadius;
            const labelY = centerY + Math.sin(angle) * labelRadius;

            ctx.font = '12px Inter, sans-serif';
            ctx.fillStyle = isDark ? '#E0E7FF' : '#0F172A';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.name, labelX, labelY);
        });

    }, [animationProgress]);

    return (
        <section id="skills-radar" className="py-16 sm:py-20 lg:py-24 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="text-gradient">📡 Skills Radar</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Scanning my technical proficiency across the galaxy
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                    {/* Radar chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="cosmic-card rounded-3xl p-6 sm:p-8"
                    >
                        <canvas ref={canvasRef} className="max-w-full" />
                    </motion.div>

                    {/* Skills list */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="cosmic-card rounded-xl p-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-[var(--text-primary)]">{skill.name}</span>
                                    <span className="text-sm font-bold" style={{ color: skill.color }}>{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: skill.color }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
