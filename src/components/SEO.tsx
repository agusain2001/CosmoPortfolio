import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export default function SEO({
    title = 'Ashish Gusain | AI Engineer & Backend Developer',
    description = 'AI Engineer & Backend Developer specializing in production-grade multi-agent LLM systems, LangChain, LangGraph, and scalable FastAPI backends. 1+ years of experience building AI-powered applications.',
    image = '/og-image.png',
    url = 'https://ashishgusain.dev',
    type = 'website'
}: SEOProps) {
    const siteTitle = title;
    const siteDescription = description;
    const siteImage = image.startsWith('http') ? image : `${url}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={siteDescription} />
            <meta name="author" content="Ashish Gusain" />
            <meta name="keywords" content="AI Engineer, Backend Developer, LangChain, LangGraph, FastAPI, Python, Multi-Agent Systems, RAG, Machine Learning, Software Engineer" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Ashish Gusain Portfolio" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content={siteImage} />
            <meta name="twitter:creator" content="@2001agusain" />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Theme color */}
            <meta name="theme-color" content="#8B5CF6" />
        </Helmet>
    );
}
