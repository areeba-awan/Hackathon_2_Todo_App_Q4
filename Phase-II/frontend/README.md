# Todo Frontend UI

A modern, animated, professional Todo application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Beautiful, animated UI with smooth transitions
- Responsive design for all device sizes
- Light and dark mode with seamless transitions
- Comprehensive form validation
- Toast notifications for user feedback
- Accessible components following WCAG guidelines
- Optimized performance with 60fps animations

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Component Architecture**: Component-based with clear separation of concerns

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles and Tailwind directives
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard page
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Login page
│   │   │   └── signup/
│   │   │       └── page.tsx    # Signup page
│   │   ├── todos/
│   │   │   ├── page.tsx        # Todo list view
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Todo detail/edit view
│   │   └── error.tsx           # Error boundary component
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Base UI primitives (buttons, inputs, etc.)
│   │   ├── layout/             # Layout components (header, footer, sidebar)
│   │   ├── animations/         # Animation wrappers and presets
│   │   ├── forms/              # Form components and hooks
│   │   └── feedback/           # Loading, error, and success components
│   ├── lib/                    # Utilities and helpers
│   │   ├── utils.ts            # General utility functions
│   │   ├── animations.ts       # Animation presets and configurations
│   │   └── validators.ts       # Form validation schemas
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTheme.ts         # Theme management
│   │   ├── useMediaQuery.ts    # Responsive design hooks
│   │   └── useToast.ts         # Toast notification system
│   ├── styles/                 # Global styles and theme definitions
│   │   ├── globals.css         # Global styles
│   │   ├── themes.css          # Light/dark theme variables
│   │   └── animations.css      # Custom animation keyframes
│   └── types/                  # TypeScript type definitions
│       ├── index.ts            # Global types
│       └── todo.ts             # Todo-specific types
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.js              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (version 18.17 or later)
- npm (version 9.0 or later) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

### Component Structure

Components follow this structure:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.stories.tsx    # Storybook stories
├── ComponentName.test.tsx       # Unit tests
└── index.ts                     # Export
```

### Styling Approach

- Use Tailwind CSS utility classes for styling
- Leverage the design system tokens defined in `tailwind.config.ts`
- Create custom components for repeated UI patterns
- Use CSS custom properties for theming

### Animation Guidelines

- Use Framer Motion for all UI animations
- Follow the animation presets defined in `lib/animations.ts`
- Respect user's reduced motion preferences
- Ensure animations enhance rather than distract from UX

## Testing

### Unit Tests

Run unit tests with:
```bash
npm run test
```

Unit tests cover:
- Component rendering and user interactions
- Custom hooks and utility functions
- Form validation logic

## Building for Production

To create a production build:

```bash
npm run build
npm run start
```

The application will be available at `http://localhost:3000`.

## Quality Assurance

This application has been tested for:
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive behavior across all device sizes
- Accessibility compliance (WCAG 2.1 AA)
- Animation performance (60fps)
- Form validation and error handling
- User flow completion