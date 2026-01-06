import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiX, HiCube, HiServer, HiArrowRight } from 'react-icons/hi';
import { useRef, useState } from 'react';

interface Architecture {
    overview: string;
    components: {
        name: string;
        description: string;
        icon?: string;
    }[];
    dataFlow: string[];
}

interface Project {
    title: string;
    emoji: string;
    description: string;
    techStack: string[];
    github: string;
    demo?: string;
    gradient: string;
    architecture?: Architecture;
    metrics?: string[];
}

const projects: Project[] = [
    {
        title: 'ConnectAI - Multi-Platform Agent',
        emoji: '🛸',
        description: 'Production-grade multi-agent AI system processing 1000+ daily workflow automations with 95% context retrieval accuracy via RAG. Reduced manual task time by 40% across Slack, Google Drive, Meet, and Telegram.',
        techStack: ['Python', 'LangGraph', 'LangChain', 'ChromaDB', 'FastAPI', 'Redis'],
        github: 'https://github.com/agusain2001/connectai',
        gradient: 'from-nebula-purple to-cosmic-blue',
        metrics: ['95% RAG Accuracy', '40% Time Saved', '1000+ Daily Tasks', '<200ms Latency'],
        architecture: {
            overview: 'A production-grade multi-agent Generative AI system that orchestrates workflow automation across multiple platforms using LangGraph state machines and LangChain tool integrations.',
            components: [
                { name: 'LangGraph Orchestrator', description: 'State machine managing agent workflows and decision trees', icon: '🧠' },
                { name: 'ChromaDB Vector Store', description: 'Semantic search with 95% context retrieval accuracy', icon: '📊' },
                { name: 'Redis Cache Layer', description: 'Session management and response caching for <200ms latency', icon: '⚡' },
                { name: 'FastAPI Gateway', description: 'RESTful API handling 1000+ daily requests with rate limiting', icon: '🔌' },
                { name: 'Platform Connectors', description: 'OAuth2 integrations for Slack, Google, Telegram APIs', icon: '🔗' },
            ],
            dataFlow: [
                'User Request → FastAPI Gateway',
                'Gateway → Redis (Session Check)',
                'Request → LangGraph Orchestrator',
                'Orchestrator → ChromaDB (Context Retrieval)',
                'Context + Query → GPT-4 Agent',
                'Agent → Platform Action (Slack/Drive/Meet)',
                'Response → Redis Cache → User'
            ]
        }
    },
    {
        title: 'Task Management API',
        emoji: '📋',
        description: 'Full-stack RESTful API handling 500+ concurrent users with JWT authentication, achieving 85% test coverage. Implemented CRUD operations with PostgreSQL achieving 99.9% uptime.',
        techStack: ['FastAPI', 'PostgreSQL', 'JWT', 'Docker', 'pytest'],
        github: 'https://github.com/agusain2001/task-management-api',
        gradient: 'from-cosmic-blue to-cosmic-light',
        metrics: ['85% Test Coverage', '99.9% Uptime', '500+ Concurrent Users', 'JWT Auth']
    },
    {
        title: 'VANET Collision Detection',
        emoji: '🚗',
        description: 'Real-time vehicle collision detection system processing 30 FPS video streams with 92% detection accuracy using YOLOv8. Reduced false positive rate by 25% through custom model fine-tuning.',
        techStack: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow', 'NumPy'],
        github: 'https://github.com/agusain2001/vanet-project',
        gradient: 'from-solar-orange to-solar-light',
        metrics: ['92% Accuracy', '30 FPS Processing', '25% Less False Positives']
    },
    {
        title: 'Virtual Manager',
        emoji: '🤖',
        description: 'AI-powered automation assistant that increased team productivity by 35% through intelligent task scheduling and automated reporting. Processes 200+ daily automation workflows.',
        techStack: ['Python', 'LangChain', 'OpenAI', 'Celery', 'Redis'],
        github: 'https://github.com/agusain2001/Virtual-manager',
        gradient: 'from-nebula-light to-nebula-purple',
        metrics: ['35% Productivity Boost', '200+ Daily Workflows', 'Automated Reporting'],
        architecture: {
            overview: 'An intelligent task automation system that uses LLMs to understand natural language commands and execute complex multi-step workflows with scheduling and monitoring capabilities.',
            components: [
                { name: 'NLP Command Parser', description: 'Interprets user commands using GPT-4 function calling', icon: '💬' },
                { name: 'Task Scheduler', description: 'Celery-based async task queue with Redis broker', icon: '⏰' },
                { name: 'Workflow Engine', description: 'DAG-based execution of multi-step automations', icon: '🔄' },
                { name: 'Monitoring Dashboard', description: 'Real-time task status and performance metrics', icon: '📈' },
            ],
            dataFlow: [
                'Natural Language Command → NLP Parser',
                'Parsed Intent → Workflow Engine',
                'Workflow → Celery Task Queue',
                'Task Execution → External Services',
                'Results → Monitoring Dashboard',
                'Status Update → User Notification'
            ]
        }
    },
];

// Architecture Modal Component
function ArchitectureModal({
    project,
    isOpen,
    onClose
}: {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!project.architecture) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-[101] overflow-auto"
                    >
                        <div className="cosmic-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 min-h-full">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl">{project.emoji}</span>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gradient">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <p className="text-[var(--text-muted)] text-sm">System Architecture Overview</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
                                    aria-label="Close modal"
                                >
                                    <HiX className="w-6 h-6 text-[var(--text-muted)]" />
                                </button>
                            </div>

                            {/* System Overview */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <HiServer className="w-5 h-5 text-nebula-light" />
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">System Overview</h3>
                                </div>
                                <p className="text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-secondary)] p-4 rounded-xl">
                                    {project.architecture.overview}
                                </p>
                            </div>

                            {/* Core Components */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <HiCube className="w-5 h-5 text-cosmic-light" />
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Core Components</h3>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {project.architecture.components.map((component, idx) => (
                                        <motion.div
                                            key={component.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="cosmic-glass p-4 rounded-xl"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xl">{component.icon || '⚙️'}</span>
                                                <h4 className="font-medium text-[var(--text-primary)]">{component.name}</h4>
                                            </div>
                                            <p className="text-sm text-[var(--text-muted)]">{component.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Data Flow */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <HiArrowRight className="w-5 h-5 text-solar-orange" />
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Data Flow</h3>
                                </div>
                                <div className="bg-[var(--bg-secondary)] p-4 sm:p-6 rounded-xl font-mono text-sm">
                                    {project.architecture.dataFlow.map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center gap-3 py-2"
                                        >
                                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-nebula-purple/20 text-nebula-light text-xs font-bold">
                                                {idx + 1}
                                            </span>
                                            <span className="text-[var(--text-secondary)]">{step}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="tech-badge text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative group"
            >
                <div className="cosmic-card rounded-2xl sm:rounded-3xl overflow-hidden h-full aurora-border" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Gradient header */}
                    <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${project.gradient}`} />

                    <div className="p-4 sm:p-5 lg:p-7">
                        {/* Emoji and title */}
                        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <span className="text-2xl sm:text-3xl lg:text-4xl" style={{ transform: 'translateZ(40px)' }}>{project.emoji}</span>
                            <h3
                                className="text-base sm:text-lg lg:text-xl font-bold text-[var(--text-primary)] group-hover:text-nebula-light transition-colors"
                                style={{ transform: 'translateZ(30px)' }}
                            >
                                {project.title}
                            </h3>
                        </div>

                        {/* Metrics badges */}
                        {project.metrics && (
                            <div className="flex flex-wrap gap-1.5 mb-3" style={{ transform: 'translateZ(28px)' }}>
                                {project.metrics.map((metric) => (
                                    <span
                                        key={metric}
                                        className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-nebula-purple/20 to-cosmic-blue/20 text-nebula-light rounded-full border border-nebula-purple/30"
                                    >
                                        {metric}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <p
                            className="text-sm sm:text-base text-[var(--text-secondary)] mb-4 sm:mb-6 leading-relaxed"
                            style={{ transform: 'translateZ(20px)' }}
                        >
                            {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6" style={{ transform: 'translateZ(25px)' }}>
                            {project.techStack.map((tech) => (
                                <span key={tech} className="tech-badge text-xs">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-2 sm:gap-3" style={{ transform: 'translateZ(35px)' }}>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 cosmic-glass rounded-lg sm:rounded-xl text-[var(--text-primary)] transition-all duration-300 text-sm hover:bg-[var(--bg-secondary)]"
                            >
                                <FaGithub className="w-4 h-4" />
                                <span className="font-medium">Code</span>
                            </a>

                            {project.architecture && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-nebula-purple/20 to-cosmic-blue/20 border border-nebula-purple/40 rounded-lg sm:rounded-xl text-nebula-light text-sm font-medium hover:from-nebula-purple/30 hover:to-cosmic-blue/30 transition-all duration-300"
                                >
                                    <HiCube className="w-4 h-4" />
                                    Architecture
                                </button>
                            )}

                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-nebula-purple to-cosmic-blue rounded-lg sm:rounded-xl text-white text-sm font-medium"
                                >
                                    <FaExternalLinkAlt className="w-3 h-3" />
                                    Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Architecture Modal */}
            <ArchitectureModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-16 sm:py-20 lg:py-24 relative">
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
                        <span className="text-gradient">🚀 Engineering Projects</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Production-grade systems with real-world impact metrics
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8" style={{ perspective: '1000px' }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
