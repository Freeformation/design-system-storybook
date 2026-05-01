# Design System Monorepo

A modern design system built with pnpm workspaces, featuring a reusable component library and Storybook documentation.

## ðŸ“¦ Packages

This monorepo contains two main packages:

### `packages/freeformation` (@freeformation/core)
The core design system package containing:
- **Components**: Reusable React components (atoms, molecules, organisms)
- **Tokens**: Design tokens (colors, spacing, typography, shadows, breakpoints)
- **Theme**: Theme configuration and ThemeProvider
- **i18n**: Internationalization setup

### `packages/storybook` (@freeformation/storybook)  
Storybook documentation and showcase for the design system components.

## ðŸš€ Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm 8+ (install with `npm install -g pnpm`)

### Installation

```bash
# Install all dependencies
pnpm install

# Start development server (Storybook)
pnpm dev

# Build all packages
pnpm build

# Build Storybook only
pnpm build:storybook
```

## ðŸ“‹ Available Scripts

**From root directory:**

```bash
# Development
pnpm dev              # Start Storybook dev server on port 6006
pnpm build            # Build all packages
pnpm build:storybook  # Build Storybook static site
pnpm lint             # Lint all packages
pnpm test             # Run tests in all packages
pnpm format           # Format all files with Prettier
pnpm chromatic        # Deploy to Chromatic (requires token)

# Package-specific
pnpm --filter @freeformation/core build
pnpm --filter @freeformation/storybook build-storybook
```

## ðŸ“ Project Structure

```
freeformation-monorepo/
â”œâ”€â”€ packages/
â”‚   â”œâ”€â”€ freeformation/              # Core component library
â”‚   â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”‚   â”œâ”€â”€ components/         # React components
â”‚   â”‚   â”‚   â”œâ”€â”€ tokens/             # Design tokens
â”‚   â”‚   â”‚   â”œâ”€â”€ theme/              # Theme system
â”‚   â”‚   â”‚   â”œâ”€â”€ i18n/               # Internationalization
â”‚   â”‚   â”‚   â”œâ”€â”€ locales/            # Translation files
â”‚   â”‚   â”‚   â””â”€â”€ index.ts            # Main entry point
â”‚   â”‚   â”œâ”€â”€ package.json
â”‚   â”‚   â””â”€â”€ tsconfig.json
â”‚   â””â”€â”€ storybook/                  # Storybook documentation
â”‚       â”œâ”€â”€ src/
â”‚       â”‚   â”œâ”€â”€ stories/            # Storybook stories
â”‚       â”‚   â”œâ”€â”€ App.tsx
â”‚       â”‚   â””â”€â”€ main.tsx
â”‚       â”œâ”€â”€ vite.config.ts
â”‚       â”œâ”€â”€ package.json
â”‚       â””â”€â”€ tsconfig.json
â”œâ”€â”€ pnpm-workspace.yaml             # Monorepo configuration
â”œâ”€â”€ .npmrc                           # pnpm settings
â”œâ”€â”€ tsconfig.json                   # Base TypeScript config
â”œâ”€â”€ package.json                    # Root workspace (scripts only)
â””â”€â”€ [config files]
```

## ðŸ”— Importing from Design System

In the Storybook package (or any consumer):

```tsx
// Import components
import { Button, Heading, Input } from '@freeformation/core'

// Import tokens
import { tokens } from '@freeformation/core'

// Import theme
import { ThemeProvider, useTheme } from '@freeformation/core'

// Import i18n
import i18n from '@freeformation/core'
```

## ðŸ“¦ pnpm Workspace Commands

```bash
# Run command in all packages
pnpm -r run <script>

# Run command in specific package
pnpm --filter <package-name> run <script>

# Install dependency in all packages
pnpm add <package> -r

# Install dependency in specific package
pnpm add <package> --filter @freeformation/core

# Remove dependency
pnpm remove <package> -r

# Dedupe dependencies
pnpm dedupe
```

## ðŸ—ï¸ Architecture

### Design System Package
- **Atoms**: Basic UI components (Button, Input, Heading, etc.)
- **Molecules**: Combinations of atoms (Form, etc.)
- **Organisms**: Complex components (Modal, Table, etc.)
- **Tokens**: Design system values (colors, spacing, etc.)
- **Theme**: MUI theme configuration with multiple brand variants

### Storybook Package
- Component stories for documentation and testing
- Theme switcher for testing different themes
- Serves as both documentation and QA environment

## ðŸ§ª Testing

```bash
# Run unit tests
pnpm test

# Run unit tests in watch mode
pnpm test -- --watch

# Run E2E tests  
pnpm --filter @freeformation/storybook test:e2e
```

## ðŸŽ¨ Theming

The design system supports multiple brand themes:
- **Core**: Default brand theme
- **Premium**: Premium variant
- **Tara**: Alternative variant

Themes include both light and dark mode variants.

## ðŸŒ Internationalization

Built with i18next and react-i18next:
- English (en) - Default
- Bengali (bn)

Add more languages by adding translation files in `src/locales/`.

## ðŸ“š Documentation

- [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Initial setup guide
- [MONOREPO_MIGRATION.md](./MONOREPO_MIGRATION.md) - Detailed migration steps
- [pnpm documentation](https://pnpm.io)

## ðŸ“„ License

This project is private. See package.json files for license information.

## ðŸ’¡ Tips for Developers

1. **Always run pnpm commands from the root** - This ensures workspace dependencies are managed correctly
2. **Use workspace protocol** - Reference: `"@freeformation/core": "workspace:*"` in dependent packages
3. **Update both** - When making changes to components, update both the component and its story
4. **Test locally** - Run `pnpm dev` before committing changes
5. **Keep packages focused** - Each package should have a single responsibility

## ðŸ”„ Publishing

When ready to publish packages:

```bash
# Use Changesets for versioning and publishing
pnpm changeset
pnpm build
pnpm release
```

## â“ Troubleshooting

**Dependencies not installing?**
```bash
pnpm install --no-frozen-lockfile
pnpm dedupe
```

**Build errors after changes?**
```bash
# Clear caches and rebuild
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

**Port already in use?**
```bash
# Storybook uses port 6006 by default
# Or specify a different port
pnpm dev -- --port 6007
```


