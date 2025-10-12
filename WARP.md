# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Modern Notes is a full-stack note-taking application with Google OAuth authentication. Users can create, edit, and delete markdown-enabled notes in a modern, theme-aware interface.

**Tech Stack:**
- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS, NextAuth.js
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Authentication**: Google OAuth via NextAuth.js + JWT tokens
- **Styling**: TailwindCSS with custom CSS variables for theming

## Development Commands

### Frontend (Next.js)
```bash
# Development with Turbopack (faster builds)
cd frontend && npm run dev

# Build for production
cd frontend && npm run build

# Start production server
cd frontend && npm start

# Lint code
cd frontend && npm run lint
```

### Backend (Express)
```bash
# Development with nodemon (auto-restart)
cd backend && npm run dev

# Production
cd backend && npm start
```

### Full Stack Development
```bash
# Start both frontend and backend simultaneously
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

## Architecture Overview

### Monorepo Structure
```
/
├── frontend/          # Next.js 15 app (port 3000)
└── backend/           # Express API server (port 5001)
```

### Frontend Architecture (Next.js App Router)
- **App Router**: Uses Next.js 13+ app directory structure
- **Route Groups**: `(auth)` for login, `(main)` for authenticated pages
- **Server Components**: Most components are server-side by default
- **Client Components**: Marked with `'use client'` directive (dashboard, providers)
- **API Routes**: NextAuth.js configuration at `/api/auth/[...nextauth]`

### Backend Architecture (Express + MongoDB)
**MVC Pattern Implementation:**
- **Models**: Mongoose schemas (`User`, `Note`) with MongoDB
- **Controllers**: Business logic (`authController`, `noteController`)
- **Routes**: Express route definitions (`authRoutes`, `noteRoutes`)
- **Middleware**: JWT authentication (`authMiddleware`)
- **Config**: Database connection setup

### Authentication Flow
1. **Frontend**: NextAuth.js handles Google OAuth
2. **Callback**: NextAuth sends user data to backend `/auth/google`
3. **Backend**: Creates/links user account, returns JWT token
4. **Token Storage**: JWT stored in NextAuth session
5. **API Calls**: JWT sent as Bearer token for authenticated requests

### State Management
- **Server State**: NextAuth.js session management
- **Client State**: React hooks (`useState`, `useEffect`)
- **No global state library** - simple app with local component state

### Database Schema
```javascript
// User Model
{
  name: String,
  email: String (unique),
  googleId: String (unique),
  timestamps: true
}

// Note Model  
{
  user: ObjectId (ref: 'User'),
  title: String,
  content: String (markdown),
  timestamps: true
}
```

### Styling System
- **TailwindCSS**: Utility-first CSS framework
- **Theme Support**: Light/dark mode via `next-themes`
- **CSS Variables**: Custom properties for consistent theming
- **Custom Classes**: `bg-card`, `text-card-foreground`, `bg-muted` etc.

## Environment Variables Required

### Frontend (.env.local)
```bash
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Backend (.env)
```bash
PORT=5001
MONGO_URI=mongodb://localhost:27017/modern-notes
JWT_SECRET=your-jwt-secret-here
```

## Key Development Patterns

### API Communication
- **Frontend→Backend**: Axios with Bearer token authentication
- **Error Handling**: React Hot Toast for user feedback
- **Request Pattern**: `Authorization: Bearer ${session.accessToken}`

### Component Patterns
- **Server Components**: Default, used for static content and layouts
- **Client Components**: Interactive components with hooks and event handlers
- **Provider Pattern**: `ClientProvider` wraps app with SessionProvider, ThemeProvider, Toaster

### Data Fetching
- **Notes**: Client-side fetching in dashboard with `useEffect`
- **Authentication**: Server-side session management via NextAuth.js
- **CRUD Operations**: RESTful API calls with promise-based toast feedback

### File Organization
- **Frontend**: Feature-based grouping in `components/`
- **Backend**: Layer-based architecture (models, controllers, routes, middleware)
- **Styling**: Global styles in `globals.css`, component-specific via TailwindCSS

## Development Workflow

1. **Backend First**: Ensure MongoDB is running, start backend server
2. **Frontend**: Start frontend development server  
3. **Authentication**: Test Google OAuth flow (requires valid OAuth credentials)
4. **API Testing**: Use browser/Postman to test protected endpoints
5. **Theme Testing**: Toggle light/dark mode to verify styling consistency

## Testing Notes

- **No test framework configured** - tests would need to be set up
- **Manual testing**: Use browser dev tools and network tab
- **API testing**: Backend endpoints can be tested independently with tools like Postman
- **Authentication testing**: Requires valid Google OAuth app setup