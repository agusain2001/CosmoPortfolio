import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGithub, FaCodeBranch, FaClock } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';

interface Commit {
    sha: string;
    message: string;
    date: string;
    repo: string;
    url: string;
}

const GITHUB_USERNAME = 'agusain2001';

export default function GitHubActivityFeed() {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                // Fetch recent events from GitHub
                const response = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`
                );

                if (response.ok) {
                    const events = await response.json();

                    // Filter for push events and extract commits
                    const pushEvents = events.filter((event: any) => event.type === 'PushEvent');

                    const recentCommits: Commit[] = [];
                    pushEvents.forEach((event: any) => {
                        event.payload.commits?.forEach((commit: any) => {
                            if (recentCommits.length < 6) {
                                recentCommits.push({
                                    sha: commit.sha.substring(0, 7),
                                    message: commit.message.split('\n')[0].substring(0, 60) + (commit.message.length > 60 ? '...' : ''),
                                    date: new Date(event.created_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }),
                                    repo: event.repo.name.split('/')[1],
                                    url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
                                });
                            }
                        });
                    });

                    setCommits(recentCommits);
                }
            } catch (error) {
                console.error('Error fetching GitHub activity:', error);
                // Fallback demo data
                setCommits([
                    { sha: 'abc1234', message: 'Add cosmic theme to portfolio', date: 'Jan 3, 10:30 AM', repo: 'PortFolio', url: '#' },
                    { sha: 'def5678', message: 'Implement dark/light mode toggle', date: 'Jan 3, 09:15 AM', repo: 'PortFolio', url: '#' },
                    { sha: 'ghi9012', message: 'Add interactive particle background', date: 'Jan 2, 04:45 PM', repo: 'PortFolio', url: '#' },
                    { sha: 'jkl3456', message: 'Update LangChain agent logic', date: 'Jan 1, 02:30 PM', repo: 'ConnectAI', url: '#' },
                    { sha: 'mno7890', message: 'Fix API rate limiting issue', date: 'Dec 31, 11:00 AM', repo: 'ConnectAI', url: '#' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();

        // Refresh every 5 minutes
        const interval = setInterval(fetchActivity, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="activity" className="py-16 sm:py-20 lg:py-24 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="text-gradient">🔴 Live Activity Feed</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Real-time transmissions from the code frontier
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <div className="cosmic-card rounded-3xl p-4 sm:p-6 aurora-border">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-medium text-[var(--text-primary)]">Live</span>
                            </div>
                            <span className="text-[var(--text-muted)] text-sm">Recent GitHub activity</span>
                        </div>

                        {/* Activity list */}
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="animate-pulse flex items-start gap-4">
                                        <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
                                            <div className="h-3 bg-[var(--bg-secondary)] rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {commits.map((commit, index) => (
                                    <motion.a
                                        key={commit.sha}
                                        href={commit.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-[var(--bg-secondary)]/50 transition-colors group"
                                    >
                                        <div className="p-2 bg-nebula-purple/20 rounded-lg shrink-0">
                                            <HiCode className="w-5 h-5 text-nebula-light" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-nebula-light transition-colors truncate">
                                                {commit.message}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-muted)]">
                                                <span className="flex items-center gap-1">
                                                    <FaCodeBranch className="w-3 h-3" />
                                                    {commit.repo}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaClock className="w-3 h-3" />
                                                    {commit.date}
                                                </span>
                                            </div>
                                        </div>

                                        <code className="text-xs font-mono text-cosmic-light bg-cosmic-blue/20 px-2 py-1 rounded shrink-0">
                                            {commit.sha}
                                        </code>
                                    </motion.a>
                                ))}
                            </div>
                        )}

                        {/* View more link */}
                        <motion.a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-[var(--border-color)] text-sm text-nebula-light hover:text-nebula-purple transition-colors"
                        >
                            <FaGithub className="w-4 h-4" />
                            View all activity on GitHub
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
}
