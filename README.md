# Design System Storybook

A comprehensive design system built with React, TypeScript, and Storybook. This project implements atomic design principles with a complete set of reusable UI components, design tokens, theme support, and internationalization.

## Overview

This design system provides:
- **Component Library**: Organized components following atomic design (atoms, molecules, organisms)
- **Storybook**: Interactive documentation and component showcase
- **Design Tokens**: Centralized styling using Style Dictionary (colors, typography, spacing, shadows, breakpoints)
- **Theme Support**: Light and dark themes with Material-UI integration
- **Internationalization (i18n)**: Multi-language support (English, Bengali)
- **Testing**: Unit tests (Vitest), E2E tests (Playwright), accessibility testing
- **Design Documentation**: Comprehensive MDX documentation for guidelines and component usage

## Architecture

### Directory Structure

```
src/
├── components/          # Reusable components organized by atomic design
│   ├── atoms/          # Basic building blocks (Button, Input, etc.)
│   ├── molecules/      # Component combinations (Form, Card, etc.)
│   └── organisms/      # Complex component groups (Header, Layout, etc.)
├── stories/            # Storybook stories and component examples
├── theme/              # Theme configuration and providers
│   ├── light.ts        # Light theme definition
│   ├── dark.ts         # Dark theme definition
│   ├── muiTheme.ts     # Material-UI theme setup
│   └── ThemeProvider.tsx # Theme provider component
├── tokens/             # Design tokens (colors, typography, spacing, etc.)
├── i18n/               # Internationalization setup
├── locales/            # Translation files (en, bn)
├── assets/             # Static assets
└── __tests__/          # Test files

docs/                   # Design system documentation
├── Guidelines.mdx      # Design guidelines
├── Atoms.mdx           # Atomic component documentation
├── Molecules.mdx       # Molecule component documentation
├── Organisms.mdx       # Organism component documentation
└── ...

storybook-static/      # Built Storybook (generated)
tests/
├── e2e/               # Playwright E2E tests
```

### Design Token System

Tokens are managed through [Style Dictionary](https://styledictionary.com/):
- **Configuration**: `style-dictionary.config.json`
- **Token Definitions**: `src/tokens/*.json`
  - `colors.json` - Color palette and variants
  - `typography.json` - Font families, sizes, weights, line heights
  - `spacing.json` - Margin and padding scales
  - `shadows.json` - Elevation and shadow definitions
  - `breakpoints.json` - Responsive design breakpoints

### Multi-Brand Theme System

The design system supports three distinct brands, each with light and dark themes:

#### Supported Brands
- **Core** - Primary blue brand (default)
  - Uses primary color palette
  - Light & Dark modes
- **Tara** - Green brand variant
  - Uses success color palette
  - Light & Dark modes
- **Premium** - Pink/Secondary brand variant
  - Uses secondary color palette
  - Light & Dark modes

#### Theme Structure
```
src/theme/
├── brands/
│   ├── core/
│   │   ├── light.ts
│   │   └── dark.ts
│   ├── tara/
│   │   ├── light.ts
│   │   └── dark.ts
│   └── premium/
│       ├── light.ts
│       └── dark.ts
├── ThemeProvider.tsx
├── muiTheme.ts
└── ...
```

#### Using Themes in Components

```typescript
import { useTheme } from './theme/ThemeProvider';

function MyComponent() {
  const { brand, mode, setBrand, setMode } = useTheme();
  
  return (
    <div>
      <p>Current Brand: {brand}</p>
      <p>Current Mode: {mode}</p>
      
      <button onClick={() => setBrand('core')}>Core</button>
      <button onClick={() => setBrand('tara')}>Tara</button>
      <button onClick={() => setBrand('premium')}>Premium</button>
      
      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setMode('dark')}>Dark</button>
    </div>
  );
}
```

#### Theme Capabilities
- **Provider-based**: `ThemeProvider.tsx` wraps the app with theme context
- **Material-UI Integration**: Uses MUI's theming with custom tokens
- **Dynamic Switching**: Support for brand and light/dark theme toggling at runtime
- **Backward Compatibility**: Legacy light/dark imports still work (defaults to core brand)
- Built on top of design tokens for consistency

### Component Organization

- **Atoms**: Primitive components (Button, Text, Icon, etc.)
- **Molecules**: Simple component compositions (Input + Label, Button Group, etc.)
- **Organisms**: Complex components (Header, Footer, Navigation, etc.)

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Storybook 10** - Component documentation and testing
- **Material-UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling
- **Style Dictionary** - Design token generation
- **i18next** - Internationalization
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **ESLint** - Code linting

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

Start Storybook:
```bash
npm run storybook
```

Build tokens from style dictionary:
```bash
npm run tokens:build
```

### Building

Build the application:
```bash
npm run build
```

Build Storybook for production:
```bash
npm run build-storybook
```

## Testing

### Unit Tests
```bash
npm run test:unit
```

### E2E Tests
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

### Code Formatting
```bash
npm run format
```

## Documentation

- View Storybook documentation locally: `npm run storybook`
- Read design guidelines in `docs/Guidelines.mdx`
- Component documentation is co-located with stories in `src/stories/`

## Design Principles

1. **Atomic Design**: Components are organized from simple (atoms) to complex (organisms)
2. **Token-Driven Styling**: All styling uses centralized design tokens
3. **Accessibility**: Components follow WCAG guidelines
4. **Internationalization**: Built-in support for multiple languages
5. **Theming**: Support for multiple themes (light/dark)
6. **Type Safety**: Full TypeScript support
7. **Testability**: Components are thoroughly tested

## Contributing

When adding new components:
1. Create the component in the appropriate directory (atoms/molecules/organisms)
2. Add TypeScript types
3. Create stories in `src/stories/`
4. Add unit tests in `src/__tests__/`
5. Update design documentation if needed
6. Update tokens if new design values are introduced

## Publishing

This design system is versioned using Changesets:
```bash
npm run release
```

For CI/CD integration with Chromatic:
```bash
npm run chromatic
```
