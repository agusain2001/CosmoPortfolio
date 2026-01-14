import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiClock, HiTag } from 'react-icons/hi';

interface BlogPost {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
    description: string;
}

// Medium username for fetching posts
const MEDIUM_USERNAME = 'agusain2001';

// Fallback data in case API fails or no posts are available
const fallbackPosts: BlogPost[] = [
    {
        title: 'Building Production-Grade Multi-Agent Systems with LangGraph',
        link: `https://medium.com/@${MEDIUM_USERNAME}`,
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
        pubDate: '2024-12-15',
        categories: ['AI', 'LangGraph', 'Python'],
        description: 'A deep dive into architecting scalable multi-agent AI systems for production environments.'
    },
    {
        title: 'RAG Systems: Achieving 95% Context Retrieval Accuracy',
        link: `https://medium.com/@${MEDIUM_USERNAME}`,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60',
        pubDate: '2024-11-20',
        categories: ['RAG', 'Vector DB', 'LLM'],
        description: 'Optimizing Retrieval-Augmented Generation pipelines with ChromaDB and semantic chunking.'
    },
    {
        title: 'FastAPI Best Practices: Building APIs That Scale',
        link: `https://medium.com/@${MEDIUM_USERNAME}`,
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
        pubDate: '2024-10-10',
        categories: ['FastAPI', 'Backend', 'Python'],
        description: 'Lessons learned from handling 1000+ daily requests with sub-200ms latency.'
    }
];

// Extract thumbnail from content HTML
const extractThumbnail = (content: string): string | null => {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
};

// Extract categories from content
const extractCategories = (content: string): string[] => {
    const categoryMatch = content.match(/<a[^>]*class="[^"]*tag[^"]*"[^>]*>([^<]+)<\/a>/gi);
    if (categoryMatch) {
        return categoryMatch.map(tag => tag.replace(/<[^>]*>/g, '')).slice(0, 3);
    }
    return [];
};

// Clean HTML and extract text
const cleanHtml = (html: string): string => {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
};

// Parse RSS XML to extract blog posts
const parseRssXml = (xmlString: string): BlogPost[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const items = xmlDoc.querySelectorAll('item');
    const posts: BlogPost[] = [];

    items.forEach((item) => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const contentEncoded = item.querySelector('content\\:encoded')?.textContent ||
            item.getElementsByTagName('content:encoded')[0]?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';

        // Extract thumbnail from content
        const thumbnail = extractThumbnail(contentEncoded) ||
            extractThumbnail(description) ||
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60';

        // Extract categories
        const categoryElements = item.querySelectorAll('category');
        const categories: string[] = [];
        categoryElements.forEach(cat => {
            if (cat.textContent) categories.push(cat.textContent);
        });

        // Clean description
        const cleanDescription = cleanHtml(description).substring(0, 150) + '...';

        posts.push({
            title: cleanHtml(title),
            link,
            thumbnail,
            pubDate,
            categories: categories.length > 0 ? categories.slice(0, 3) : extractCategories(contentEncoded),
            description: cleanDescription
        });
    });

    return posts;
};

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const mediumRssUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

            // Strategy 1: Try rss2json API
            const tryRss2Json = async (): Promise<BlogPost[] | null> => {
                try {
                    const response = await fetch(
                        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumRssUrl)}`
                    );

                    if (!response.ok) return null;

                    const data = await response.json();

                    if (data.status === 'ok' && data.items && data.items.length > 0) {
                        return data.items.slice(0, 3).map((item: {
                            title: string;
                            link: string;
                            thumbnail: string;
                            pubDate: string;
                            categories: string[];
                            description: string;
                            content: string;
                        }) => ({
                            title: item.title,
                            link: item.link,
                            thumbnail: item.thumbnail ||
                                extractThumbnail(item.content || '') ||
                                'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
                            pubDate: item.pubDate,
                            categories: item.categories?.slice(0, 3) || [],
                            description: cleanHtml(item.description || '').substring(0, 150) + '...'
                        }));
                    }
                    return null;
                } catch {
                    console.log('rss2json failed, trying alternative...');
                    return null;
                }
            };

            // Strategy 2: Try allorigins CORS proxy with XML parsing
            const tryAllOrigins = async (): Promise<BlogPost[] | null> => {
                try {
                    const response = await fetch(
                        `https://api.allorigins.win/raw?url=${encodeURIComponent(mediumRssUrl)}`
                    );

                    if (!response.ok) return null;

                    const xmlText = await response.text();
                    const parsedPosts = parseRssXml(xmlText);

                    if (parsedPosts.length > 0) {
                        return parsedPosts.slice(0, 3);
                    }
                    return null;
                } catch {
                    console.log('allorigins failed, trying alternative...');
                    return null;
                }
            };

            // Strategy 3: Try corsproxy.io
            const tryCorsProxy = async (): Promise<BlogPost[] | null> => {
                try {
                    const response = await fetch(
                        `https://corsproxy.io/?${encodeURIComponent(mediumRssUrl)}`
                    );

                    if (!response.ok) return null;

                    const xmlText = await response.text();
                    const parsedPosts = parseRssXml(xmlText);

                    if (parsedPosts.length > 0) {
                        return parsedPosts.slice(0, 3);
                    }
                    return null;
                } catch {
                    console.log('corsproxy.io failed');
                    return null;
                }
            };

            try {
                // Try each strategy in order
                let fetchedPosts = await tryRss2Json();

                if (!fetchedPosts) {
                    fetchedPosts = await tryAllOrigins();
                }

                if (!fetchedPosts) {
                    fetchedPosts = await tryCorsProxy();
                }

                if (fetchedPosts && fetchedPosts.length > 0) {
                    setPosts(fetchedPosts);
                } else {
                    // No posts found from any source, use fallback
                    console.log('No Medium posts found, using fallback data');
                    setPosts(fallbackPosts);
                }
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError('Unable to load latest posts');
                setPosts(fallbackPosts);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" className="py-16 sm:py-20 lg:py-24 relative">
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
                        <span className="text-gradient">📝 Technical Blog</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Insights on AI engineering, backend systems, and software architecture
                    </p>
                </motion.div>

                {/* Loading state */}
                {isLoading && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="cosmic-card rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-48 bg-[var(--bg-secondary)]" />
                                <div className="p-5">
                                    <div className="h-4 bg-[var(--bg-secondary)] rounded mb-3 w-3/4" />
                                    <div className="h-3 bg-[var(--bg-secondary)] rounded mb-2" />
                                    <div className="h-3 bg-[var(--bg-secondary)] rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error state with fallback */}
                {error && !isLoading && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-[var(--text-muted)] mb-6 text-sm"
                    >
                        {error} - Showing sample articles
                    </motion.p>
                )}

                {/* Blog posts grid */}
                {!isLoading && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.link}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="cosmic-card rounded-2xl overflow-hidden group hover-lift"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Categories overlay */}
                                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                                        {post.categories.slice(0, 2).map((category) => (
                                            <span
                                                key={category}
                                                className="px-2 py-1 text-xs font-medium bg-nebula-purple/80 text-white rounded-full flex items-center gap-1"
                                            >
                                                <HiTag className="w-3 h-3" />
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Date */}
                                    <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs mb-2">
                                        <HiClock className="w-3.5 h-3.5" />
                                        {formatDate(post.pubDate)}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 line-clamp-2 group-hover:text-nebula-light transition-colors">
                                        {post.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                                        {post.description}
                                    </p>

                                    {/* Read more link */}
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-nebula-light hover:text-nebula-purple transition-colors"
                                    >
                                        Read More
                                        <HiExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

                {/* View all link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-10"
                >
                    <a
                        href={`https://medium.com/@${MEDIUM_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 cosmic-card rounded-full text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        View All Articles
                        <HiExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
