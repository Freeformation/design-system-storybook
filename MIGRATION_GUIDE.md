# Organization Migration Guide

This guide explains how to migrate the monorepo organization scope from `@freeformation` to `@freeformation`.

## Overview

The migration involves updating:
- **Package names**: `@freeformation/*` â†’ `@freeformation/*`
- **Import statements**: All TypeScript/JavaScript imports
- **Configuration files**: package.json, workflows, configs
- **Documentation**: References in README, guides, etc.

## Prerequisites

- PowerShell (Windows) or equivalent shell script capability
- All changes committed or stashed
- Node.js and pnpm installed

## Quick Start

### Step 1: Dry Run (Recommended First)

Review what will be changed without making modifications:

```bash
.\migrate-organization.ps1 -DryRun
```

This shows:
- Files that will be modified
- Number of replacements
- Preview of changes

### Step 2: Execute Migration

Apply all changes:

```bash
.\migrate-organization.ps1
```

Output includes:
- List of modified files
- Detailed changes made
- Next steps recommendations

### Step 3: Manual Directory Rename (If Needed)

Rename package directories if you want them to reflect the new organization:

```powershell
# Rename package directories
Rename-Item -Path "packages\freeformation" -NewName "core"
# (or keep current names if preferred)
```

## What the Script Changes

### 1. Package Names in package.json

**Before:**
```json
{
  "name": "@freeformation/core",
  "dependencies": {
    "@freeformation/core": "workspace:*"
  }
}
```

**After:**
```json
{
  "name": "@freeformation/core",
  "dependencies": {
    "@freeformation/core": "workspace:*"
  }
}
```

### 2. Import Statements

**Before:**
```typescript
import { Button } from '@freeformation/core'
import { components } from '@freeformation/core/components'
```

**After:**
```typescript
import { Button } from '@freeformation/core'
import { components } from '@freeformation/core/components'
```

### 3. GitHub Actions

**Before:**
```yaml
run: pnpm --filter @freeformation/storybook build
```

**After:**
```yaml
run: pnpm --filter @freeformation/storybook build
```

### 4. Scripts in package.json

**Before:**
```json
{
  "scripts": {
    "dev": "pnpm --filter @freeformation/storybook storybook"
  }
}
```

**After:**
```json
{
  "scripts": {
    "dev": "pnpm --filter @freeformation/storybook storybook"
  }
}
```

### 5. Documentation

All references to `@freeformation` are replaced with `@freeformation`.

## Advanced Options

### Dry Run with Verbose Output

See detailed information about every match:

```bash
.\migrate-organization.ps1 -DryRun -Verbose
```

### Apply Changes Quietly

```bash
.\migrate-organization.ps1
```

## Step-by-Step Process

1. **Commit Current Work**
   ```bash
   git add .
   git commit -m "chore: pre-migration checkpoint"
   git push
   ```

2. **Create Migration Branch**
   ```bash
   git checkout -b chore/migrate-to-freeformation
   ```

3. **Run Dry Run**
   ```bash
   .\migrate-organization.ps1 -DryRun -Verbose
   ```

4. **Review Output**
   - Check if changes look correct
   - Note any files that need special attention

5. **Execute Migration**
   ```bash
   .\migrate-organization.ps1
   ```

6. **Verify Changes**
   ```bash
   # Check git diff to see all changes
   git diff
   
   # View changed files summary
   git status
   ```

7. **Update Directory Names (Optional)**
   ```powershell
   # If desired, rename directories to match new org
   # (This is optional - functional name can stay the same)
   Rename-Item packages\freeformation packages\core
   Rename-Item packages\storybook packages\docs
   ```

8. **Install and Test**
   ```bash
   pnpm install
   pnpm build
   pnpm test:unit
   ```

9. **Commit Migration**
   ```bash
   git add .
   git commit -m "chore: migrate organization to @freeformation"
   ```

10. **Push and Create PR**
    ```bash
    git push origin chore/migrate-to-freeformation
    ```

## What Needs Manual Review

After running the script, manually check:

1. **README.md** - Verify all examples updated correctly
2. **CONTRIBUTING.md** - Check all code examples
3. **SETUP_COMPLETE.md** - Update organization references
4. **GitHub Actions** - Verify workflow references
5. **.npmrc** - Check registry configuration if present
6. **GitHub repository settings** - Update organization if applicable

## Files Changed by the Script

### Configuration Files
- `package.json` (root and all workspaces)
- `pnpm-workspace.yaml`
- `tsconfig.json` (if referenced)
- `.commitlintrc.json` (if needed)

### Workflow Files
- `.github/workflows/ci.yml`
- `.github/workflows/pr-checks.yml`
- `.github/workflows/code-quality.yml`
- `.github/workflows/changeset.yml`
- `.github/workflows/release.yml`

### Source Code
- `.ts` / `.tsx` files in `packages/*/src`
- `.js` / `.jsx` files if any

### Documentation
- `README.md`
- `CONTRIBUTING.md`
- All `.md` files referencing the old organization

## Troubleshooting

### Issue: Script doesn't find files
**Solution**: Ensure you're running the script from the monorepo root directory.

```bash
cd C:\Users\rishi\OneDrive\Documents\code-playground\freeformation-storybook
.\migrate-organization.ps1
```

### Issue: Build fails after migration
**Solution**: 
1. Run `pnpm install` to refresh dependencies
2. Check import statements for typos
3. Verify all package names updated correctly

```bash
pnpm install
pnpm build
```

### Issue: Some imports not updated
**Solution**: The script is conservative to avoid false positives. Manually search for remaining references:

```bash
# Search for old organization
findstr /R "@freeformation" *.json *.ts *.tsx
```

### Issue: Changes are incorrect
**Solution**: Revert the migration:

```bash
git checkout -- .
# Or if already committed:
git revert <commit-hash>
```

## Post-Migration Checklist

- [ ] Run `pnpm install`
- [ ] Run `pnpm build` and verify success
- [ ] Run `pnpm test:unit`
- [ ] Run `pnpm lint`
- [ ] Review `git diff` for accuracy
- [ ] Update README with new package names
- [ ] Update CONTRIBUTING.md if needed
- [ ] Test in development mode: `pnpm dev`
- [ ] Commit changes with proper message
- [ ] Push changes and create PR
- [ ] Verify GitHub Actions pass

## Verification Commands

```bash
# Verify all imports updated
findstr /R "@freeformation" src/**/*.ts src/**/*.tsx

# Should return no results if migration complete

# Check current organization in package.json
Get-Content package.json | Select-String "@freeformation"

# Should show all package names with @freeformation
```

## Rolling Back

If you need to revert the migration:

```bash
# If not yet committed
git checkout -- .

# If already committed
git revert <commit-hash>

# Or reset to before migration
git reset --hard origin/main
```

## Script Features

âœ… **Safe by Default** - Dry-run mode available  
âœ… **Comprehensive** - Covers all file types  
âœ… **Smart Patterns** - Avoids false positives  
âœ… **Detailed Output** - Shows exactly what changed  
âœ… **Verbose Mode** - Optional detailed logging  
âœ… **Excludes Directories** - Skips node_modules, .git, etc.  
âœ… **UTF-8 Safe** - Preserves file encoding  

## Examples

### Example 1: Basic Migration
```bash
# Dry run to preview
.\migrate-organization.ps1 -DryRun

# Execute
.\migrate-organization.ps1
```

### Example 2: Verbose Migration
```bash
# See every file and change
.\migrate-organization.ps1 -DryRun -Verbose

# Apply with details
.\migrate-organization.ps1 -Verbose
```

### Example 3: Manual Verification
```bash
# Check what would change
.\migrate-organization.ps1 -DryRun > migration-plan.txt

# Review migration-plan.txt

# Then execute
.\migrate-organization.ps1
```

## Support

If you encounter issues:

1. **Check file permissions**: Ensure write access to all files
2. **Check git status**: Ensure no uncommitted changes conflict
3. **Verify PowerShell version**: Works with PowerShell 5.1+
4. **Check disk space**: Ensure sufficient disk space for file operations

## Additional Notes

- The script is idempotent (safe to run multiple times)
- Original file content is preserved as-is (just replacements)
- Encoding is preserved (UTF-8)
- Permissions are maintained
- Script can be run multiple times without issues

---

**Happy migrating!** ðŸš€


