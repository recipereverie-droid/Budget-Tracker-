# Overview

This is a modern full-stack Budget Tracker Progressive Web App (PWA) built with React, TypeScript, and Express. The application provides comprehensive personal finance management with offline-first capabilities, featuring secure PIN/biometric authentication, goal tracking, smart categorization, and detailed analytics. The system integrates an existing PWA codebase with modern technologies to create a robust, user-friendly financial management platform.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens for consistent theming
- **State Management**: TanStack Query for server state management and local storage for client state
- **Routing**: Wouter for lightweight client-side routing
- **PWA Features**: Service worker for offline functionality, manifest for app-like experience

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Build System**: Vite for development and Esbuild for production bundling
- **Database Integration**: Drizzle ORM configured for PostgreSQL with Neon Database
- **API Design**: RESTful endpoints with Zod schema validation
- **Development Tools**: tsx for TypeScript execution in development

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database for production data
- **Local Storage**: IndexedDB for offline-first functionality and sensitive data caching
- **Encryption**: AES-GCM encryption for local data security using Web Crypto API
- **Migration Strategy**: Drizzle Kit for database schema management and migrations

## Authentication and Security
- **App Lock**: PIN-based authentication with SHA-256 hashing
- **Biometric Support**: Framework ready for biometric authentication integration
- **Data Encryption**: Client-side encryption for sensitive financial data
- **Security Validation**: Input sanitization and validation using Zod schemas

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **TypeScript**: Full TypeScript support with strict configuration
- **Build Tools**: Vite, Esbuild, PostCSS, Autoprefixer

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Inter font family via Google Fonts

### Database and State Management
- **Database**: PostgreSQL, Neon Database serverless driver
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for runtime type checking and schema validation
- **Query Management**: TanStack React Query for server state

### Development and Testing
- **Development Server**: Replit-specific plugins for development environment
- **Error Handling**: Runtime error overlay for development
- **TypeScript**: Strict TypeScript configuration with path mapping

### PWA and Performance
- **Service Worker**: Custom service worker for offline functionality
- **Caching Strategy**: Static and dynamic caching for optimal performance
- **Web APIs**: Web Crypto API, IndexedDB, Notification API

### Form and Validation
- **Form Management**: React Hook Form with Zod resolver
- **Date Handling**: date-fns for date manipulation and formatting
- **Utility Libraries**: clsx and tailwind-merge for conditional styling