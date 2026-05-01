# Contributing Guide

This document outlines the development workflow, tools, and best practices for contributing to the Design System Monorepo.

## Table of Contents

- [Setup](#setup)
- [Git Hooks (Husky)](#git-hooks-husky)
- [Commit Message Format](#commit-message-format)
- [Making Changes](#making-changes)
- [Version Management (Changesets)](#version-management-changesets)
- [GitHub Actions](#github-actions)
- [Development Workflow](#development-workflow)

## Setup

### Prerequisites

- **Node.js**: v20 or later
- **pnpm**: v9 or later (this monorepo uses pnpm workspaces)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd freeformation-monorepo
```

2. Install pnpm globally (if not already installed):
```bash
npm install -g pnpm
```

3. Install dependencies:
```bash
pnpm install
```

## Git Hooks (Husky)

This project uses **Husky** to manage Git hooks. Husky ensures code quality by running checks before commits and enforces conventional commit messages.

### Pre-commit Hook

The pre-commit hook runs **lint-staged**, which:
- Automatically fixes linting issues in staged files using ESLint
- Formats code using Prettier

The hook runs automatically when you commit:
```bash
git commit -m "feat: add new component"
```

If there are issues, the commit will be blocked until they're fixed.

### Commit-msg Hook

The commit-msg hook validates commit messages using **commitlint**. All commits must follow the Conventional Commits format (see below).

## Commit Message Format

This project follows **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, tooling, etc.
- **ci**: Changes to CI configuration files and scripts

### Examples

```
feat(button): add loading state to button component
fix(modal): prevent modal from closing on backdrop click
docs: update component README with new examples
chore(deps): update Material-UI to v6.1.0
```

### Scope

The scope specifies what part of the codebase is affected (e.g., `button`, `modal`, `deps`, `github-actions`).

## Making Changes

### 1. Create a Feature Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Your Changes

Organize your changes in the appropriate package:
- `packages/freeformation/` - Core components, tokens, and theme
- `packages/storybook/` - Storybook stories and documentation

### 3. Test Your Changes

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run specific test file
pnpm test -- Button.test.tsx

# Check test coverage
pnpm test -- --coverage
```

### 4. Lint and Format

```bash
# Lint all files
pnpm lint

# Format all files
pnpm format

# Fix linting errors automatically
pnpm lint --fix
```

### 5. Build to Verify

```bash
# Build all packages
pnpm build

# Build Storybook
pnpm build:storybook
```

## Version Management (Changesets)

This project uses **Changesets** for managing versions and changelogs. When making changes that affect package versions, you must add a changeset.

### Creating a Changeset

1. After making your changes, run:
```bash
pnpm changeset
```

2. Select the packages that have changed:
```
? Which packages would you like to include? (Press <space> to select, <enter> to skip)
â¯ @freeformation/core
  @freeformation/storybook
```

3. Select the type of change (major, minor, patch):
```
? What kind of change is this for @freeformation/core? (Use arrow keys)
â¯ patch
  minor
  major
```

4. Write a clear description of your changes:
```
? Write a summary for this change (this will be in the changelog):
â€º Added loading state to Button component with spinner icon
```

5. Commit the generated changeset:
```bash
git add .changeset
git commit -m "chore: add changeset for button loading state"
```

### Changeset Files

Changesets are stored as `.md` files in `.changeset/`:
```
.changeset/
â”œâ”€â”€ awesome-dragons-wake.md
â”œâ”€â”€ breezy-rabbits-change.md
â””â”€â”€ config.json
```

Each file contains metadata and description of changes.

### Release Process

When changesets are merged to `main`, the GitHub Action automatically:
1. Creates a PR with version bumps and changelog updates
2. After the PR is merged, publishes new versions to npm

## GitHub Actions

This project uses GitHub Actions for automation:

### 1. **CI Workflow** (`.github/workflows/ci.yml`)
Runs on every push to `main`:
- Linting
- Building
- Unit tests
- Storybook build
- Chromatic visual regression testing
- Publishing to npm

### 2. **PR Checks Workflow** (`.github/workflows/pr-checks.yml`)
Runs on every PR with checks for:
- Changeset presence (warns if missing)
- Linting
- Type checking
- Unit tests
- Builds

### 3. **Code Quality Workflow** (`.github/workflows/code-quality.yml`)
Runs on every PR:
- Format checking
- Security audit
- Dependency checks

### 4. **Changeset Workflow** (`.github/workflows/changeset.yml`)
Manages version updates:
- Automatically creates release PR with version bumps
- Updates changelogs

### 5. **Release Workflow** (`.github/workflows/release.yml`)
Triggers on changes to packages:
- Creates or publishes release PRs

## Development Workflow

### Step-by-Step Workflow

1. **Create feature branch**:
```bash
git checkout -b feature/new-component
```

2. **Make changes and test locally**:
```bash
# Make your changes in packages/freeformation/src/
pnpm test -- MyComponent.test.tsx
pnpm lint
pnpm build
```

3. **Create changeset**:
```bash
pnpm changeset
# Follow the prompts to describe your change
```

4. **Commit changes**:
```bash
# All linting and formatting happens automatically
git add .
git commit -m "feat(components): add new MyComponent"
```

5. **Push and open PR**:
```bash
git push origin feature/new-component
```

6. **PR checks run automatically**:
   - Linting âœ“
   - Type checking âœ“
   - Unit tests âœ“
   - Build âœ“
   - Code quality âœ“

7. **Address review feedback** and push updates

8. **Merge PR** - Automatic release PR is created when merged to `main`

### Useful Commands

```bash
# Development
pnpm dev                          # Start Storybook dev server
pnpm build                        # Build all packages
pnpm build:storybook              # Build Storybook static site

# Testing
pnpm test                         # Run all tests
pnpm test -- --watch              # Run tests in watch mode
pnpm test -- --coverage           # Generate coverage report

# Quality
pnpm lint                         # Lint all files
pnpm format                       # Format all files
pnpm format --check               # Check if formatting is needed

# Versioning
pnpm changeset                    # Create a new changeset
pnpm changeset:version            # Update versions (used in CI)
pnpm release                      # Publish packages (used in CI)

# Chromatic (Visual Testing)
pnpm chromatic                    # Upload Storybook to Chromatic
```

## Troubleshooting

### Husky Not Running Pre-commit Hooks

```bash
# Reinstall husky
pnpm install

# Or manually install hooks
pnpm husky install
```

### Commit Blocked by commitlint

Make sure your commit message follows Conventional Commits format:
```
type(scope): subject
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

### Tests Failing

1. Run tests locally: `pnpm test`
2. Check specific test file
3. Update snapshots if needed: `pnpm test -- -u`

### Build Errors

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Rebuild
pnpm build
```

## Getting Help

- Check existing [GitHub Issues](../../issues)
- Review [README.md](./README.md) for project overview
- Check [MONOREPO_README.md](./MONOREPO_README.md) for monorepo structure

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.


