# Monorepo Setup Checklist

## âœ… Completed
- [x] Created `pnpm-workspace.yaml` configuration
- [x] Created `packages/freeformation/` package with package.json and tsconfig.json
- [x] Created `packages/storybook/` package with package.json and tsconfig.json  
- [x] Updated root `package.json` with workspace scripts
- [x] Created `.npmrc` with pnpm settings
- [x] Created `packages/freeformation/src/index.ts` entry point
- [x] Created src directories for both packages
- [x] Created `MONOREPO_MIGRATION.md` with detailed migration steps

## ðŸ“‹ Next Steps (Manual)

1. **Install pnpm** (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. **Move files to freeformation package:**
   - Move `src/components/` â†’ `packages/freeformation/src/`
   - Move `src/theme/` â†’ `packages/freeformation/src/`
   - Move `src/tokens/` â†’ `packages/freeformation/src/`
   - Move `src/i18n/` â†’ `packages/freeformation/src/`
   - Move `src/locales/` â†’ `packages/freeformation/src/`

3. **Move files to storybook package:**
   - Move `src/stories/` â†’ `packages/storybook/src/`
   - Move `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/App.css` â†’ `packages/storybook/src/`
   - Move `public/` â†’ `packages/storybook/`

4. **Copy configuration files:**
   - Copy `vite.config.ts` â†’ `packages/storybook/`
   - Copy `vitest.config.ts` â†’ both packages
   - Copy `playwright.config.ts` â†’ `packages/storybook/`
   - Copy `setupTests.ts` â†’ `packages/freeformation/`
   - Copy `.storybook/` (if exists) â†’ `packages/storybook/`

5. **Update import statements in storybook stories:**
   ```tsx
   // Change from:
   import { Button } from '../../components'
   
   // To:
   import { Button } from '@freeformation/core'
   ```

6. **Install dependencies:**
   ```bash
   cd /path/to/freeformation-monorepo
   pnpm install
   ```

7. **Test the setup:**
   ```bash
   pnpm dev                  # Should start storybook
   pnpm build                # Should build all packages
   ```

## ðŸ“š Root Scripts Now Available

```bash
pnpm dev                    # Start storybook dev server
pnpm build                  # Build all packages
pnpm build:storybook       # Build storybook only
pnpm lint                   # Lint all packages
pnpm test                   # Run tests in all packages
pnpm format                 # Format all files with prettier
pnpm chromatic             # Deploy to Chromatic
```

## ðŸ”— File Locations Created

```
freeformation-monorepo/
â”œâ”€â”€ pnpm-workspace.yaml
â”œâ”€â”€ .npmrc
â”œâ”€â”€ package.json (updated)
â”œâ”€â”€ packages/
â”‚   â”œâ”€â”€ freeformation/
â”‚   â”‚   â”œâ”€â”€ package.json
â”‚   â”‚   â”œâ”€â”€ tsconfig.json
â”‚   â”‚   â””â”€â”€ src/
â”‚   â”‚       â””â”€â”€ index.ts
â”‚   â””â”€â”€ storybook/
â”‚       â”œâ”€â”€ package.json
â”‚       â”œâ”€â”€ tsconfig.json
â”‚       â””â”€â”€ src/
â”œâ”€â”€ MONOREPO_MIGRATION.md
â””â”€â”€ SETUP_CHECKLIST.md (this file)
```

## ðŸ’¡ Tips

- Each package has its own `package.json` and can be published independently
- Use `@freeformation/core` for importing components in storybook
- Running `pnpm` commands from root automatically affects all workspaces
- Use `pnpm --filter @freeformation/core` to run scripts in specific packages
- pnpm uses hard links and creates a single lock file (`pnpm-lock.yaml`) for all packages

For detailed migration information, see `MONOREPO_MIGRATION.md`


