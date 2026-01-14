<div align="center">

# 🚀 Ashish Gusain | AI Engineer Portfolio

### _A stunning, interactive portfolio showcasing AI Engineering & Backend Development expertise_

[![Portfolio](https://img.shields.io/badge/View-Live_Portfolio-8B5CF6?style=for-the-badge&logo=react&logoColor=white)](https://ashish-gusain-green-nu.vercel.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/agusain2001/PortFolio?style=for-the-badge&logo=github)](https://github.com/agusain2001/PortFolio)

---

### 🛠️ Built With

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)

![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75FF?style=for-the-badge&logo=googlegemini&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub%20API-181717?style=for-the-badge&logo=github&logoColor=white)
![RSS](https://img.shields.io/badge/RSS2JSON-FFA500?style=for-the-badge&logo=rss&logoColor=white)
![Calendly](https://img.shields.io/badge/Calendly-006BFF?style=for-the-badge&logo=calendly&logoColor=white)

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

</div>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🎨 Visual Experience
- **Cosmic/Space Theme**: Deep space backgrounds with twinkling stars
- **Dark/Light Mode**: Seamlessly switch between themes
- **Interactive Particles**: Stars react to mouse movement
- **Custom Cursor**: Ring + dot cursor with hover effects
- **Parallax Effects**: Floating orbs and geometric shapes
- **Smooth Animations**: Elements animate on scroll

</td>
<td width="50%" valign="top">

### 🛠️ Technical Highlights
- **Fully Responsive**: Desktop, tablet & mobile optimized
- **TypeScript**: Type-safe codebase
- **Framer Motion**: Physics-based animations
- **SEO Optimized**: Open Graph & Twitter Cards
- **Performance Focused**: Lazy loading & efficient rendering
- **Sticky Navbar**: Glass morphism effect on scroll

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🤖 AI Integration
- **Gemini AI Chatbot**: Interactive assistant powered by Google's Gemini API
- **RAG-Lite Context**: Trained on resume/skills for accurate responses
- **Context-Aware**: Answers based on professional background

</td>
<td width="50%" valign="top">

### 📊 Live Data & Integrations
- **GitHub Stats**: Real-time repository and contribution data
- **Medium Blog Feed**: Dynamic RSS feed integration
- **Calendly Integration**: Direct meeting booking
- **Animated Counters**: Dynamic statistics with scroll triggers

</td>
</tr>
</table>

---

## 📑 Sections Overview

| Section                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| 🌟 **Hero**            | Animated introduction with typewriter effect and CTA buttons |
| 👨‍🚀 **Mission Profile** | About section with bio, highlights, and animated stats       |
| 📋 **Resume Timeline** | Work experience with animated timeline                       |
| 🛸 **Skills Radar**    | Interactive skills visualization                             |
| ⚡ **Tech Stack**      | Technologies organized by cosmic categories                  |
| 🚀 **Projects**        | Showcase with architecture modals & metrics                  |
| 📝 **Technical Blog**  | Latest Medium articles via RSS feed                          |
| 📊 **GitHub Stats**    | Real-time contribution graphs                                |
| 📡 **Contact**         | Contact form with Calendly booking                           |
| 🛸 **AI Chatbot**      | Floating AI assistant for Q&A                                |


---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18 or higher
- **npm** or **pnpm** (pnpm recommended for memory efficiency)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/agusain2001/PortFolio.git
   cd PortFolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   > **Note:** The chatbot will prompt for an API key if not provided

4. **Start development server**

   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```
PortFolio/
├── public/
│   ├── favicon.svg          # Site favicon
│   ├── og-image.png         # Social sharing preview
│   └── resume.pdf           # Downloadable resume
├── src/
│   ├── components/
│   │   ├── About.tsx         # Mission Profile section
│   │   ├── Blog.tsx          # Medium RSS feed
│   │   ├── Chatbot.tsx       # AI Co-Pilot chatbot
│   │   ├── Contact.tsx       # Contact form & Calendly
│   │   ├── CustomCursor.tsx  # Custom cursor effects
│   │   ├── Footer.tsx        # Site footer
│   │   ├── GitHubStats.tsx   # GitHub statistics
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Navbar.tsx        # Sticky navigation
│   │   ├── ParticleBackground.tsx  # Star field canvas
│   │   ├── Projects.tsx      # Project showcase
│   │   ├── ScrollEffects.tsx # Parallax effects
│   │   ├── SEO.tsx           # Meta tags
│   │   ├── SkillsRadar.tsx   # Skills visualization
│   │   ├── TechStack.tsx     # Technologies grid
│   │   └── ThemeToggle.tsx   # Theme switch
│   ├── context/
│   │   └── ThemeContext.tsx  # Theme management
│   ├── hooks/
│   │   ├── useGemini.ts      # Gemini AI integration
│   │   ├── useScrollAnimation.ts  # Scroll animations
│   │   └── useTypewriter.ts  # Typewriter effect
│   ├── App.tsx               # Main application
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind config
├── vite.config.ts            # Vite config
└── package.json              # Dependencies
```

---

## 🎨 Color Palette

### Dark Mode (Cosmic Space)

| Color             | Hex       | Usage              |
| ----------------- | --------- | ------------------ |
| **Deep Space**    | `#0a0e27` | Primary background |
| **Space Mid**     | `#1a1f3a` | Card backgrounds   |
| **Nebula Purple** | `#8B5CF6` | Primary accent     |
| **Cosmic Blue**   | `#3B82F6` | Secondary accent   |
| **Solar Orange**  | `#F59E0B` | Highlight accent   |
| **Star Glow**     | `#E0E7FF` | Text color         |

### Light Mode (Celestial Day)

| Color             | Hex       | Usage              |
| ----------------- | --------- | ------------------ |
| **Light BG**      | `#F8FAFC` | Primary background |
| **Card White**    | `#FFFFFF` | Card backgrounds   |
| **Nebula Purple** | `#7C3AED` | Primary accent     |
| **Cosmic Blue**   | `#2563EB` | Secondary accent   |
| **Text Primary**  | `#0F172A` | Main text          |

---

## 📱 Responsive Design

| Breakpoint  | Width    | Optimizations                       |
| ----------- | -------- | ----------------------------------- |
| **Mobile**  | < 640px  | Stacked layouts, simplified effects |
| **Tablet**  | < 768px  | 2-column grids, adjusted spacing    |
| **Desktop** | < 1024px | Full experience with all effects    |
| **Large**   | > 1280px | Maximum content width (1280px)      |

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

### Vercel / Netlify (Recommended)

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variables in dashboard
4. Deploy automatically on push

### GitHub Pages (Manual)

```bash
# Build the project
npm run build

# Deploy contents of 'dist' folder to gh-pages branch
```

---

## 🤝 Connect With Me

<div align="center">

[![Email](https://img.shields.io/badge/Email-2001.ashish.official@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:2001.ashish.official@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ashish_Gusain-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ashish-gusain-aa279a280/)
[![GitHub](https://img.shields.io/badge/GitHub-agusain2001-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/agusain2001)
[![Twitter](https://img.shields.io/badge/Twitter-@2001agusain-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/2001agusain)
[![Calendly](https://img.shields.io/badge/Calendly-Book_a_Chat-006BFF?style=for-the-badge&logo=calendly&logoColor=white)](https://calendly.com/2001-ashish-official)

</div>

---

<div align="center">

**Made with ❤️ and ☕ by Ashish Gusain**

_AI Engineer & Backend Developer | Crafted among the stars 🌌_

</div>
