# Quickstart Guide: Frontend UI for Evolution of Todo

**Feature**: Frontend UI for Evolution of Todo
**Date**: 2026-01-17
**Related Plan**: specs/1-frontend-ui/plan.md

## Getting Started

This guide will help you set up and run the frontend UI for the Evolution of Todo application.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**
   
   Create a `.env.local` file in the frontend directory with the following variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see the application running.

3. **Backend Connection**
   
   Ensure the backend server is running on the configured API base URL (default: http://localhost:8000) for full functionality.

### Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── tasks/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── auth/            # Authentication components
│   │   │   ├── login-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   └── ...
│   │   ├── task/            # Task-related components
│   │   │   ├── task-card.tsx
│   │   │   ├── task-list.tsx
│   │   │   └── ...
│   │   ├── layout/          # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ...
│   │   └── common/          # Common components
│   │       ├── loading-spinner.tsx
│   │       ├── alert.tsx
│   │       └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-task.ts
│   │   └── ...
│   ├── lib/                 # Utility functions
│   │   ├── auth.ts
│   │   ├── api.ts
│   │   └── utils.ts
│   └── types/               # TypeScript type definitions
│       ├── user.ts
│       ├── task.ts
│       └── index.ts
├── public/                  # Static assets
├── styles/                  # Tailwind and global styles
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

### Key Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run test` - Run unit tests

### Configuration

The application uses the following key configurations:

- **Next.js**: Configured with App Router for modern routing
- **Tailwind CSS**: Configured for utility-first styling
- **TypeScript**: Strict mode enabled for type safety
- **Better Auth**: Integrated for authentication management

### Next Steps

1. Familiarize yourself with the project structure
2. Review the API endpoints that the frontend will consume
3. Explore the component library to understand available UI elements
4. Check the type definitions to understand data structures
5. Review the authentication flow implementation