# Overview

This is a cryptocurrency forecasting dashboard application that provides machine learning-powered price predictions for Bitcoin, Ethereum, and Dogecoin. The application uses Prophet ML models to generate forecasts and displays them through interactive charts and tables. Users can select different cryptocurrencies, customize date ranges, and visualize prediction data with a professional dark-themed interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript, following a component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design tokens for a professional dark theme
- **Component Library**: Radix UI components with shadcn/ui wrapper for consistent, accessible UI elements
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Chart.js for interactive data visualizations
- **Form Handling**: React Hook Form with Zod validation for type-safe forms

The frontend follows a modular structure with reusable components, custom hooks, and organized pages. The design system emphasizes professional financial dashboard aesthetics with gold accent colors and dark surfaces.

## Backend Architecture

The backend uses Express.js with TypeScript in an API-first architecture:

- **Runtime**: Node.js with ESM modules
- **Framework**: Express.js for RESTful API endpoints
- **Data Storage**: JSON files containing pre-computed Prophet ML forecast data
- **Schema Validation**: Zod for request/response validation and type safety
- **Development**: Vite dev server integration for seamless full-stack development

The server provides forecast generation endpoints that filter and serve prediction data based on user-selected parameters (cryptocurrency type and date range).

## Data Storage Solutions

Uses hybrid file-based storage with both forecast and real market data:

- **Forecast Data**: JSON files containing Prophet model predictions for Bitcoin, Ethereum, Dogecoin, and Gold
- **Real Market Data**: CSV file containing accurate gold prices for August 13 - September 12, 2025 (~$3,400 range)
- **Hybrid Integration**: Automatically uses real market data when available, falls back to Prophet forecasts for other periods
- **Database Integration**: Configured for PostgreSQL with Drizzle ORM (ready for future database integration)
- **Caching**: In-memory caching layer for forecast data to improve performance

## Authentication and Authorization

No authentication system is currently implemented. The application provides open access to all forecast data and functionality.

## Development and Build System

- **Build Tool**: Vite for fast development and optimized production builds
- **Package Manager**: npm with lockfile for consistent dependencies
- **TypeScript**: Strict type checking across frontend, backend, and shared schemas
- **Development**: Hot module replacement and error overlays for efficient development workflow

# External Dependencies

## Third-Party Services

- **Cryptocurrency Data**: Pre-computed Prophet ML model forecasts (currently static JSON files)
- **Future Integration**: Designed to support real-time cryptocurrency price APIs

## APIs and Integrations

- **Internal API**: `/api/forecast` endpoint with hybrid data selection for generating filtered forecast data
- **Smart Data Selection**: Automatically chooses between real market data (CSV) and Prophet forecasts based on date range
- **Validation**: Zod schemas for type-safe API contracts between frontend and backend

## Database and Storage

- **Current**: File-based JSON storage for forecast data
- **Configured**: PostgreSQL with Neon serverless database (ready for activation)
- **ORM**: Drizzle ORM with migration support
- **Session Storage**: PostgreSQL session store configured (connect-pg-simple)

## UI and Visualization Libraries

- **Charts**: Chart.js for forecast visualizations
- **Icons**: Lucide React for consistent iconography
- **Components**: Radix UI primitives with custom styling
- **Fonts**: Google Fonts (Inter) for professional typography
- **Styling**: Tailwind CSS with PostCSS processing

## Development Tools

- **Replit Integration**: Vite plugins for Replit development environment
- **Error Handling**: Runtime error modal for development debugging
- **Code Quality**: ESBuild for production bundling and optimization