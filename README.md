# 🚀 Ashish Gusain | AI Engineer Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Cosmic%20Theme-8B5CF6?style=for-the-badge&logo=react&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-3B82F6?style=for-the-badge)](https://agusain2001.github.io/PortFolio/)
[![GitHub](https://img.shields.io/badge/GitHub-agusain2001-181717?style=for-the-badge&logo=github)](https://github.com/agusain2001)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ashish-gusain-aa279a280/)

*A stunning, interactive portfolio website showcasing AI Engineering & Backend Development expertise*

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer&logoColor=white)

</div>

---

## ✨ Features

### 🎨 Visual Experience
- **Cosmic/Space Explorer Theme** - Deep space backgrounds with twinkling stars and nebula effects
- **Dark/Light Mode Toggle** - Seamlessly switch between cosmic dark and celestial light themes
- **Interactive Particle Background** - Stars react to mouse movement, forming constellations
- **Custom Cursor with Hover Effects** - Ring + dot cursor that scales and changes color on interactive elements
- **Parallax Scroll Effects** - Floating orbs and geometric shapes with depth
- **Smooth Scroll Animations** - Elements animate in as you scroll

### 🛠️ Technical Highlights
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **TypeScript** - Type-safe codebase for better maintainability
- **Framer Motion Animations** - Smooth, physics-based animations throughout
- **SEO Optimized** - Open Graph & Twitter Cards for social sharing
- **Performance Focused** - Lazy loading, optimized assets, and efficient rendering
- **Sticky Navbar** - Transparent on hero, solid glass effect on scroll

### 🤖 AI Integration
- **Gemini AI Chatbot** - Interactive AI assistant powered by Google's Gemini API
- **RAG-Lite Context** - Chatbot trained on resume/skills for accurate responses
- **Context-Aware Responses** - Answers based only on professional background

### 📊 Live Data & Integrations
- **GitHub Stats Integration** - Real-time repository and contribution data
- **Medium Blog Feed** - Dynamic RSS feed from Medium articles
- **Calendly Integration** - Book meetings directly from contact section
- **Animated Counters** - Dynamic statistics with scroll-triggered animations

### 🏗️ Project Showcase
- **System Architecture Visualization** - Modal with detailed system design breakdowns
- **Metric-Driven Descriptions** - Real engineering metrics (95% accuracy, <200ms latency)
- **3D Tilt Cards** - Interactive project cards with hover effects

---

## 🖼️ Sections

| Section | Description |
|---------|-------------|
| **🌟 Hero** | Animated introduction with typewriter effect and CTA buttons |
| **👨‍🚀 Mission Profile** | About section with bio, highlights, and animated stats |
| **📋 Resume Timeline** | Work experience with animated timeline |
| **🛸 Skills Radar** | Interactive skills visualization |
| **⚡ Tech Stack** | Technologies organized as cosmic categories |
| **🚀 Projects** | Project showcase with architecture modals & metrics |
| **📝 Technical Blog** | Latest Medium articles via RSS feed |
| **📊 GitHub Stats** | Real-time contribution graphs |
| **📡 Contact** | Contact form with Calendly booking |
| **🛸 AI Chatbot** | Floating AI assistant for Q&A |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **react-helmet-async** - SEO meta tag management

### Build Tools
- **Vite** - Next-generation frontend tooling
- **PostCSS** - CSS transformations
- **ESLint** - Code linting

### APIs & Services
- **Google Gemini AI** - Chatbot responses
- **GitHub API** - Live statistics
- **RSS2JSON API** - Medium blog feed
- **Calendly** - Meeting scheduling

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/agusain2001/PortFolio.git

# Navigate to project directory
cd PortFolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory for the AI chatbot:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The chatbot will prompt for an API key if not provided in `.env`

---

## 📁 Project Structure

```
PortFolio/
├── public/
│   ├── favicon.svg          # Site favicon
│   ├── og-image.png         # Social sharing preview image
│   └── resume.pdf           # Downloadable resume
├── src/
│   ├── components/
│   │   ├── About.tsx         # Mission Profile section
│   │   ├── Blog.tsx          # Medium RSS feed
│   │   ├── Chatbot.tsx       # AI Co-Pilot chatbot
│   │   ├── Contact.tsx       # Contact form & Calendly
│   │   ├── CustomCursor.tsx  # Cursor with hover effects
│   │   ├── Footer.tsx        # Site footer
│   │   ├── GitHubStats.tsx   # GitHub statistics
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Navbar.tsx        # Sticky navigation bar
│   │   ├── ParticleBackground.tsx  # Star field canvas
│   │   ├── Projects.tsx      # Project showcase + Architecture modal
│   │   ├── ScrollEffects.tsx # Parallax effects
│   │   ├── SEO.tsx           # Open Graph meta tags
│   │   ├── SkillsRadar.tsx   # Skills visualization
│   │   ├── TechStack.tsx     # Technologies grid
│   │   └── ThemeToggle.tsx   # Dark/Light switch
│   ├── context/
│   │   └── ThemeContext.tsx  # Theme state management
│   ├── hooks/
│   │   ├── useGemini.ts      # Gemini AI with RAG context
│   │   ├── useScrollAnimation.ts  # Scroll animations
│   │   └── useTypewriter.ts  # Typewriter effect
│   ├── App.tsx               # Main application
│   ├── index.css             # Global styles & themes
│   └── main.tsx              # Entry point with HelmetProvider
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies
```

---

## 🎨 Color Palette

### Dark Mode (Cosmic Space)
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space | `#0a0e27` | Primary background |
| Space Mid | `#1a1f3a` | Card backgrounds |
| Nebula Purple | `#8B5CF6` | Primary accent |
| Cosmic Blue | `#3B82F6` | Secondary accent |
| Solar Orange | `#F59E0B` | Highlight accent |
| Star Glow | `#E0E7FF` | Text color |

### Light Mode (Celestial Day)
| Color | Hex | Usage |
|-------|-----|-------|
| Light BG | `#F8FAFC` | Primary background |
| Card White | `#FFFFFF` | Card backgrounds |
| Nebula Purple | `#7C3AED` | Primary accent |
| Cosmic Blue | `#2563EB` | Secondary accent |
| Text Primary | `#0F172A` | Main text |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Optimizations |
|------------|-------|---------------|
| Mobile | < 640px | Stacked layouts, no cursor effects |
| Tablet | < 768px | 2-column grids, adjusted spacing |
| Desktop | < 1024px | Full experience with all effects |
| Large | > 1280px | Maximum content width |

---

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run type-check

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment

### GitHub Pages

```bash
# Build the project
npm run build

# Deploy to GitHub Pages (manual)
# Upload contents of 'dist' folder
```

### Vercel / Netlify
Simply connect your GitHub repository - auto-deployment is supported!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Connect With Me

<div align="center">

[![Email](https://img.shields.io/badge/Email-2001.ashish.official@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:2001.ashish.official@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ashish--gusain-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ashish-gusain-aa279a280/)
[![GitHub](https://img.shields.io/badge/GitHub-agusain2001-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/agusain2001)
[![Twitter](https://img.shields.io/badge/Twitter-@2001agusain-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/2001agusain)
[![Calendly](https://img.shields.io/badge/Calendly-Book_a_Chat-006BFF?style=for-the-badge&logo=calendly&logoColor=white)](https://calendly.com/2001-ashish-official)

</div>

---

<div align="center">

**Made with ❤️ and ☕ by Ashish Gusain**

*AI Engineer & Backend Developer | Crafted among the stars 🌌*

</div>
