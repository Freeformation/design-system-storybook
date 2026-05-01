# Monorepo Migration Guide

Your design system project has been converted to a pnpm monorepo! Here's what you need to do to complete the migration.

## New Structure

```
freeformation-monorepo/
â”œâ”€â”€ pnpm-workspace.yaml           # Monorepo configuration
â”œâ”€â”€ package.json                   # Root workspace package (scripts only)
â”œâ”€â”€ tsconfig.json                  # Base TypeScript config
â”œâ”€â”€ packages/
â”‚   â”œâ”€â”€ freeformation/            # Component library package
â”‚   â”‚   â”œâ”€â”€ package.json
â”‚   â”‚   â”œâ”€â”€ tsconfig.json
â”‚   â”‚   â””â”€â”€ src/                  # Move files here
â”‚   â”‚       â”œâ”€â”€ components/
â”‚   â”‚       â”œâ”€â”€ tokens/
â”‚   â”‚       â”œâ”€â”€ theme/
â”‚   â”‚       â””â”€â”€ i18n/
â”‚   â””â”€â”€ storybook/                # Storybook package
â”‚       â”œâ”€â”€ package.json
â”‚       â”œâ”€â”€ tsconfig.json
â”‚       â”œâ”€â”€ src/                  # Move files here
â”‚       â””â”€â”€ vite.config.ts
â””â”€â”€ [root-level config files]
```

## Migration Steps

### Step 1: Move Design System Files
Move these directories to `packages/freeformation/src/`:
- `src/components/` 
- `src/theme/`
- `src/tokens/`
- `src/i18n/`
- `src/locales/`

### Step 2: Move Storybook Files
Move these to `packages/storybook/`:
- `src/stories/` â†’ `packages/storybook/src/stories/`
- `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/App.css` â†’ `packages/storybook/src/`
- `.storybook/` â†’ `packages/storybook/` (if exists)
- `docs/` â†’ `packages/storybook/docs/` or keep at root

### Step 3: Move Configuration Files
Copy to each package as needed:
- `vite.config.ts` â†’ `packages/storybook/vite.config.ts`
- `tsconfig.app.json` â†’ Update and use in respective packages
- `eslint.config.js` â†’ Link from both packages or place in root

### Step 4: Copy Test Configuration
- `vitest.config.ts` â†’ `packages/freeformation/vitest.config.ts` and `packages/storybook/vitest.config.ts`
- `playwright.config.ts` â†’ `packages/storybook/playwright.config.ts`
- `setupTests.ts` â†’ `packages/freeformation/setupTests.ts`

### Step 5: Copy Public Assets
- `public/` â†’ `packages/storybook/public/`

## Key Changes

### Package Names
- Design System: `@freeformation/core`
- Storybook: `@freeformation/storybook`

### Imports in Storybook
After moving files, update imports from the design system:

```tsx
// Old (single package)
import { Button } from '../components'
import { tokens } from '../tokens'

// New (monorepo)
import { Button, tokens } from '@freeformation/core'
```

### Scripts to Use

**From root directory:**
```bash
# Development
pnpm dev                    # Run storybook in dev mode
pnpm build                  # Build all packages
pnpm build:storybook       # Build storybook only
pnpm lint                   # Lint all packages
pnpm test                   # Test all packages
pnpm format                 # Format all files
pnpm chromatic             # Upload to Chromatic

# Run in specific package
pnpm --filter @freeformation/core build
pnpm --filter @freeformation/storybook build-storybook
```

### pnpm Commands Reference

```bash
# Install all dependencies
pnpm install

# Install in specific package
pnpm -F @freeformation/core install

# Run scripts in all packages
pnpm -r run test

# Run scripts in specific package
pnpm --filter @freeformation/core run build

# Update dependencies in monorepo
pnpm -r update
```

## Next Steps

1. Create `packages/freeformation/src/` and `packages/storybook/src/` directories
2. Move files according to Step 1-4 above
3. Update import paths in files (see Import Changes section)
4. Run `pnpm install` from root
5. Run `pnpm dev` to test the storybook
6. Run `pnpm build` to build all packages

## Troubleshooting

**Import not found errors:** Make sure files are in the correct location and imports reference `@freeformation/core`

**Module resolution issues:** Ensure each package's tsconfig.json extends the root config

**Dependency conflicts:** Run `pnpm dedupe` to optimize and resolve dependency versions

## Documentation
- [pnpm workspaces](https://pnpm.io/workspaces)
- [pnpm CLI commands](https://pnpm.io/cli/install)


