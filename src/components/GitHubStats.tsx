import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FaGithub, FaStar, FaFire } from 'react-icons/fa';
import { HiOutlineCode } from 'react-icons/hi';

interface GitHubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
}

const GITHUB_USERNAME = 'agusain2001';

function AnimatedCounter({ value, label, icon: Icon }: { value: number; label: string; icon: React.ComponentType<{ className?: string }> }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number;
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / 1500, 1);
                        setCount(Math.floor(progress * value));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <div ref={ref} className="cosmic-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover-lift group">
            <div className="flex justify-center mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 bg-nebula-purple/20 rounded-lg sm:rounded-xl group-hover:bg-nebula-purple/30 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-nebula-light" />
                </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{count}</div>
            <div className="text-xs sm:text-sm text-[var(--text-muted)]">{label}</div>
        </div>
    );
}

export default function GitHubStats() {
    const [stats, setStats] = useState<GitHubStats>({
        publicRepos: 15,
        followers: 10,
        totalStars: 25,
    });
    // const [isDark, setIsDark] = useState(true);

    // Watch for theme changes
    // useEffect(() => {
    //     const checkTheme = () => {
    //         setIsDark(!document.documentElement.classList.contains('light'));
    //     };

    //     checkTheme();

    //     // Observe class changes on html element
    //     const observer = new MutationObserver(checkTheme);
    //     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    //     return () => observer.disconnect();
    // }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        publicRepos: data.public_repos || 15,
                        followers: data.followers || 10,
                        totalStars: 25,
                    });
                }
            } catch {
                console.log('Using default stats');
            }
        };
        fetchStats();
    }, []);

    const statItems = [
        { value: stats.publicRepos, label: 'Repos', icon: HiOutlineCode },
        { value: stats.followers, label: 'Followers', icon: FaGithub },
        { value: stats.totalStars, label: 'Stars', icon: FaStar },
        { value: 100, label: 'Commits', icon: FaFire },
    ];

    // Theme-aware GitHub stats URLs
    // const getStatsUrl = () => {
    //     if (isDark) {
    //         return `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=8B5CF6&text_color=E0E7FF&icon_color=60A5FA&bg_color=00000000`;
    //     }
    //     return `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=default&hide_border=true&title_color=7C3AED&text_color=1E293B&icon_color=2563EB&bg_color=FFFFFF`;
    // };

    // const getStreakUrl = () => {
    //     if (isDark) {
    //         return `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=8B5CF6&fire=F59E0B&currStreakLabel=C084FC&sideLabels=E0E7FF&currStreakNum=FFFFFF&sideNums=FFFFFF&dates=60A5FA&background=00000000`;
    //     }
    //     return `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USERNAME}&theme=default&hide_border=true&ring=7C3AED&fire=D97706&currStreakLabel=7C3AED&sideLabels=1E293B&currStreakNum=1E293B&sideNums=1E293B&dates=64748B&background=FFFFFF`;
    // };

    return (
        <section id="github" className="py-16 sm:py-20 lg:py-24 relative">
            <div className="container mx-auto px-4">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="text-gradient">📊 Mission Control</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Telemetry from the open source galaxy
                    </p>
                </motion.div>

                {/* Stats cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
                >
                    {statItems.map((stat) => (
                        <AnimatedCounter
                            key={stat.label}
                            value={stat.value}
                            label={stat.label}
                            icon={stat.icon}
                        />
                    ))}
                </motion.div>

                {/* GitHub contribution graph */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="cosmic-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden aurora-border"
                >
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-2">
                        <FaCodeBranch className="text-nebula-light" />
                        Contribution Activity
                    </h3> */}

                    {/* GitHub stats images - Theme aware */}
                    {/* <div className="space-y-4 sm:space-y-6">
                        <div className="overflow-x-auto">
                            <img
                                key={`stats-${isDark}`}
                                src={getStatsUrl()}
                                alt="GitHub Stats"
                                className="max-w-full h-auto rounded-lg sm:rounded-xl min-w-[300px]"
                                loading="lazy"
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <img
                                key={`streak-${isDark}`}
                                src={getStreakUrl()}
                                alt="GitHub Streak"
                                className="max-w-full h-auto rounded-lg sm:rounded-xl min-w-[300px]"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </motion.div> */}

                {/* View profile link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-6 sm:mt-8"
                >
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 cosmic-card rounded-full font-semibold text-[var(--text-primary)] transition-all duration-300 text-sm sm:text-base"
                    >
                        <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Full Profile
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
