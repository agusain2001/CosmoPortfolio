import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiDownload, HiDocumentText } from 'react-icons/hi';
import { STATIC_VALUES } from '../utils/values';

interface TimelineItem {
    year: string;
    title: string;
    organization: string;
    description: string;
    type: 'education' | 'work' | 'project';
}

const timelineData: TimelineItem[] = [
    {
        year: '2024 - Present',
        title: 'Junior Gen AI Engineer',
        organization: 'AI/ML Industry',
        description: 'Building AI agents, LangChain applications, and multi-agent systems. Improved ETL pipeline processing speed by 30%.',
        type: 'work',
    },
    {
        year: '2022 - 2024',
        title: "Master's in Computer Applications",
        organization: 'G.B. Pant University of Agriculture & Technology',
        description: 'Specialized in AI/ML and Data Science. Achieved CGPA of 7.2.',
        type: 'education',
    },
    {
        year: '2023',
        title: 'ConnectAI - Multi-Platform Agent',
        organization: 'Personal Project',
        description: 'Built an AI agent integrating Slack, Google Drive, Meet, and Telegram for workflow automation.',
        type: 'project',
    },
    {
        year: '2023',
        title: 'VANET Collision Detection System',
        organization: 'Research Project',
        description: 'Developed real-time collision detection using YOLO and computer vision for vehicular networks.',
        type: 'project',
    },
    {
        year: '2019 - 2022',
        title: "Bachelor's Degree",
        organization: 'Undergraduate Studies',
        description: 'Foundation in Computer Science and Programming.',
        type: 'education',
    },
];

const typeColors = {
    education: { bg: 'bg-cosmic-blue/20', border: 'border-cosmic-blue', text: 'text-cosmic-light', icon: '🎓' },
    work: { bg: 'bg-nebula-purple/20', border: 'border-nebula-purple', text: 'text-nebula-light', icon: '💼' },
    project: { bg: 'bg-solar-orange/20', border: 'border-solar-orange', text: 'text-solar-light', icon: '🚀' },
};

export default function ResumeTimeline() {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    return (
        <section id="resume" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
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
                        <span className="text-gradient">📜 Mission Log</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4 mb-6">
                        My journey through the cosmos of technology
                    </p>

                    {/* Resume download buttons */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        <motion.a
                            href={STATIC_VALUES.url.resumeView}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-nebula-purple to-cosmic-blue rounded-full font-semibold text-white nebula-glow text-sm sm:text-base"
                        >
                            <HiDocumentText className="w-5 h-5" />
                            View Resume
                        </motion.a>
                        <motion.a
                            href={STATIC_VALUES.url.resumeDownload}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 cosmic-card rounded-full font-semibold text-[var(--text-primary)] text-sm sm:text-base"
                        >
                            <HiDownload className="w-5 h-5" />
                            Download PDF
                        </motion.a>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Center line */}
                    <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nebula-purple via-cosmic-blue to-solar-orange transform sm:-translate-x-1/2" />

                    {timelineData.map((item, index) => {
                        const colors = typeColors[item.type];
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex items-center mb-8 sm:mb-12 ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-gradient-to-r from-nebula-purple to-cosmic-blue rounded-full transform -translate-x-1/2 z-10 ring-4 ring-[var(--bg-primary)]" />

                                {/* Content card */}
                                <motion.div
                                    onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                                    whileHover={{ scale: 1.02 }}
                                    className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] cosmic-card rounded-2xl p-5 sm:p-6 cursor-pointer ${isEven ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'
                                        } ${selectedItem === index ? 'aurora-border' : ''}`}
                                >
                                    {/* Year badge */}
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 ${colors.bg} ${colors.border} border rounded-full text-sm ${colors.text} mb-3`}>
                                        <span>{colors.icon}</span>
                                        <span className="font-medium">{item.year}</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-nebula-light mb-2">{item.organization}</p>

                                    <AnimatePresence>
                                        {selectedItem === index && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-sm text-[var(--text-secondary)] mt-3"
                                            >
                                                {item.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                    <p className="text-xs text-[var(--text-muted)] mt-2">
                                        {selectedItem === index ? 'Click to collapse' : 'Click to expand'}
                                    </p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
