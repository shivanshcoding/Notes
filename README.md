# Modern Notes ✨

<div align="center">

![Modern Notes Logo](https://img.shields.io/badge/Modern-Notes-6366F1?style=for-the-badge&logo=markdown&logoColor=white)

**A beautiful, full-stack note-taking application with advanced markdown support**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/Math-KaTeX-009639?style=flat-square&logo=latex&logoColor=white)](https://katex.org/)

[✨ Features](#-features) •
[🚀 Demo](#-demo) •
[📦 Installation](#-installation) •
[💻 Usage](#-usage) •
[🛠️ Tech Stack](#️-tech-stack) •
[📱 Screenshots](#-screenshots)

</div>

---

## 🌟 Overview

**Modern Notes** is a sophisticated, full-stack note-taking application designed for the modern web. Built with cutting-edge technologies, it offers a **ChatGPT-level markdown experience** with real-time preview, mathematical equations, syntax highlighting, and much more.

### 🎯 Why Modern Notes?

- **✍️ Professional Writing Experience**: Side-by-side markdown editor with live preview
- **🔢 Advanced Math Support**: LaTeX equations rendered with KaTeX
- **💻 Code Highlighting**: Support for 100+ programming languages
- **📱 Responsive Design**: Beautiful on desktop, tablet, and mobile
- **🎨 Elegant UI/UX**: Inspired by Apple Notes, Notion, and iA Writer
- **🔐 Secure Authentication**: Google OAuth integration
- **🌓 Theme Support**: Light, dark, and system themes
- **⚡ Real-time Updates**: Instant preview and smooth animations

## ✨ Features

### 📝 **Advanced Markdown Editor**
- **Side-by-side Layout**: Write and preview simultaneously on desktop
- **Responsive Tabs**: Mobile-optimized write/preview toggle
- **Rich Text Support**: Headers, lists, tables, blockquotes, and more
- **Task Lists**: Interactive checkboxes for todo management
- **Math Equations**: Inline (`$E=mc^2$`) and block equations
- **Code Blocks**: Syntax highlighting for JavaScript, Python, SQL, and 100+ languages
- **Tables**: GitHub-style markdown tables with beautiful styling
- **Links & Images**: Auto-linking with image preview support
- **HTML Support**: Raw HTML rendering for advanced formatting

### 🎨 **Beautiful User Interface**
- **Modern Design**: Clean, minimalist interface focused on content
- **Micro-interactions**: Smooth hover effects, transitions, and animations
- **Staggered Animations**: Delightful card entry animations
- **Glass Morphism**: Backdrop blur effects and translucent elements
- **Color Harmony**: Carefully crafted color palette for both light and dark modes
- **Typography**: Professional Inter font with optimized spacing

### 🔐 **Authentication & Security**
- **Google OAuth**: Secure, one-click authentication
- **JWT Tokens**: Stateless authentication with automatic token refresh
- **Protected Routes**: Middleware-based route protection
- **User Sessions**: Persistent login with NextAuth.js

### 📱 **Responsive & Accessible**
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and gesture support
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Semantic HTML with ARIA labels
- **Focus Management**: Proper focus handling throughout the app

### ⚡ **Performance & Developer Experience**
- **Next.js 15**: Latest features with Turbopack for lightning-fast builds
- **React 19**: Modern React with concurrent features
- **Optimized Bundle**: Code splitting and lazy loading
- **Hot Reload**: Instant updates during development
- **TypeScript Ready**: Fully typed for better development experience

## 🚀 Demo

### 🖥️ **Desktop Experience**
*Side-by-side markdown editor with real-time preview*

### 📱 **Mobile Experience** 
*Responsive design with tabbed editor interface*

### 🌓 **Theme Support**
*Beautiful light and dark themes with smooth transitions*

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Google OAuth App** (for authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/modern-notes.git
cd modern-notes
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in the backend directory:
```env
# Database
MONGO_URI=mongodb://localhost:27017/modern-notes

# JWT Secret
JWT_SECRET=your-super-secure-jwt-secret-key

# Server Port
PORT=5001
```

Start the backend server:
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.local` file in the frontend directory:
```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API URL
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Start the frontend development server:
```bash
# Development with Turbopack
npm run dev

# Build for production
npm run build
npm start
```

### 4. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

## 💻 Usage

### 🏠 **Dashboard**
- View all your notes in a beautiful grid layout
- Click any note card to edit
- Use the "New Note" button to create notes
- Notes show preview of content and last modified date

### ✏️ **Creating Notes**
1. Click "New Note" button
2. Enter a title for your note
3. Write content using markdown syntax
4. See live preview on the right panel (desktop) or Preview tab (mobile)
5. Click "Create Note" to save

### 🔧 **Editing Notes**
1. Click on any note card
2. Modify title and content
3. Changes preview in real-time
4. Click "Update Note" to save changes

### 📚 **Markdown Guide**
- Click the "Guide" button in the editor
- Comprehensive reference for all supported markdown features
- Examples include code blocks, math equations, tables, and more

### 📱 **Mobile Usage**
- Use Write/Preview tabs to switch between editing and preview
- All features available on mobile with optimized interface
- Tap targets are sized for easy mobile interaction

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js
- **[React Hot Toast](https://react-hot-toast.com/)** - Beautiful notifications
- **[React Icons](https://react-icons.github.io/)** - Popular icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### **Markdown Processing**
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown to React components
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown
- **[remark-math](https://github.com/remarkjs/remark-math)** - Math equation support
- **[rehype-katex](https://github.com/remarkjs/remark-math)** - LaTeX math rendering
- **[rehype-highlight](https://github.com/rehypejs/rehype-highlight)** - Code syntax highlighting
- **[remark-breaks](https://github.com/remarkjs/remark-breaks)** - Line break support
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful prose styling

### **Backend**
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - JWT implementation
- **[cors](https://github.com/expressjs/cors)** - Cross-origin resource sharing
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable management

### **Development Tools**
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast bundler for Next.js
- **[ESLint](https://eslint.org/)** - Code linting
- **[Nodemon](https://nodemon.io/)** - Auto-restart for Node.js
- **[PostCSS](https://postcss.org/)** - CSS post-processor

## 📁 Project Structure

```
modern-notes/
├── 📁 backend/                 # Express.js API server
│   ├── 📁 config/             # Database configuration
│   ├── 📁 controllers/        # Request handlers
│   ├── 📁 middleware/         # Custom middleware
│   ├── 📁 models/             # Mongoose schemas
│   ├── 📁 routes/             # API routes
│   ├── 📄 server.js           # Entry point
│   └── 📄 package.json        # Dependencies
├── 📁 frontend/               # Next.js application
│   ├── 📁 src/
│   │   ├── 📁 app/            # App Router pages
│   │   │   ├── 📁 (auth)/     # Authentication pages
│   │   │   ├── 📁 (main)/     # Protected pages
│   │   │   └── 📁 api/        # API routes
│   │   └── 📁 components/     # Reusable components
│   ├── 📁 public/            # Static assets
│   ├── 📄 tailwind.config.mjs # Tailwind configuration
│   └── 📄 package.json       # Dependencies
├── 📄 README.md              # This file
└── 📄 WARP.md                # Development guide
```

## 🔧 Environment Variables

### Frontend (`.env.local`)
```env
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Backend (`.env`)
```env
MONGO_URI=mongodb://localhost:27017/modern-notes
JWT_SECRET=your-jwt-secret-key
PORT=5001
```

## 🚀 Deployment

### **Frontend (Vercel)**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### **Backend (Railway/Heroku)**
1. Create account on [Railway](https://railway.app/) or [Heroku](https://heroku.com/)
2. Connect your GitHub repository
3. Set environment variables
4. Deploy your backend

### **Database (MongoDB Atlas)**
1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in your environment variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/modern-notes.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes and commit: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Apple Notes, Notion, iA Writer, and ChatGPT
- **Icons**: React Icons library
- **Math Rendering**: KaTeX for beautiful mathematical expressions
- **Syntax Highlighting**: Highlight.js for code blocks
- **Typography**: Inter font family for excellent readability

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/modern-notes/issues) page
2. Create a new issue if your problem isn't already addressed
3. Provide as much detail as possible including:
   - Operating system
   - Node.js version
   - Steps to reproduce the issue
   - Screenshots (if applicable)

---

<div align="center">

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

**⭐ Star this repo if you find it useful!**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-💙-blue.svg?style=for-the-badge)

</div>
