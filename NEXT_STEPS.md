# Next Steps - Implementation Sequence

This document outlines the recommended sequence of actions to complete the setup and begin development.

## Phase 1: Verification & Validation ✅ (COMPLETE)

### What was done:
- [x] Husky git hooks installed and configured
  - `.husky/pre-commit` - Runs linting and formatting
  - `.husky/commit-msg` - Validates commit messages
  
- [x] 5 GitHub Actions workflows created
  - `ci.yml` - Build, test, and publish
  - `pr-checks.yml` - PR validation
  - `code-quality.yml` - Format and security checks
  - `changeset.yml` - Version management
  - `release.yml` - Automated publishing

- [x] Changesets configured for version management

- [x] Dependencies installed and build verified

- [x] Documentation created
  - `CONTRIBUTING.md` - Developer guide
  - `SETUP_COMPLETE.md` - Setup overview

---

## Phase 2: Initial Setup (DO THIS FIRST)

### 1. Commit the setup changes
```bash
# Verify all changes are staged
git status

# Create a setup commit following conventional format
git add .

# Wait for husky pre-commit hook to run
# It will automatically lint and format files

# Then commit
git commit -m "chore: initialize husky, github actions, and changesets"
```

**What happens:**
- ✓ Husky pre-commit hook runs
- ✓ ESLint fixes linting issues
- ✓ Prettier formats code
- ✓ commitlint validates message
- ✓ Commit is created

### 2. Push to main (or feature branch if testing)
```bash
git push origin main
# Or: git push origin feature/setup
```

**What happens on GitHub:**
- ✓ CI workflow starts
- ✓ Linting runs
- ✓ Type checking runs
- ✓ Tests run (will need test files)
- ✓ Storybook builds

---

## Phase 3: Configure Repository Settings

### GitHub Repository Configuration

#### 1. **Branch Protection Rules**
1. Go to: Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✓ Require pull request reviews before merging
   - ✓ Require status checks to pass before merging
   - ✓ Require branches to be up to date before merging
4. Status checks to require:
   - `validate-pr` (from pr-checks.yml)
   - `lint` (from pr-checks.yml)
   - `typecheck` (from pr-checks.yml)
   - `test` (from pr-checks.yml)
   - `build` (from pr-checks.yml)
   - `all-checks-passed` (from pr-checks.yml)

#### 2. **Add Required Secrets** (Settings → Secrets)
```
NPM_TOKEN              # For publishing to npm
CHROMATIC_PROJECT_TOKEN  # For visual regression testing (optional)
GITHUB_TOKEN           # Usually auto-provided by GitHub
```

**How to create NPM_TOKEN:**
1. Go to npmjs.com → Settings → Authentication tokens
2. Create granular token with read/write access
3. Copy and paste into GitHub Secrets

#### 3. **Auto-linking References**
Settings → General → Auto-link references
- Enable linking to commits, PRs, and issues

---

## Phase 4: Prepare for First Development Cycle

### 1. Add Missing Dependencies (if needed)
Some packages may be missing for full functionality:

```bash
# If tests need jsdom:
pnpm add -D jsdom --workspace-root

# If other dependencies are missing:
pnpm install
```

### 2. Create Initial Changesets (Optional)
For the first release, you might want to document initial setup:

```bash
# Create a changeset for initial setup
pnpm changeset

# Select packages that were initialized
# Type: patch or minor
# Description: "Initial monorepo setup with design system and storybook"
```

---

## Phase 5: Development Workflow Template

### For Next Development Task:

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/component-name
   ```

2. **Make Changes**
   - Add code in appropriate package
   - Write tests
   - Update documentation

3. **Verify Locally**
   ```bash
   pnpm lint        # Check code quality
   pnpm build       # Verify TypeScript
   pnpm test:unit   # Run tests
   ```

4. **Create Changeset**
   ```bash
   pnpm changeset
   # Follow prompts to document version impact
   ```

5. **Commit with Proper Format**
   ```bash
   git add .
   git commit -m "feat(component): add new component"
   # Husky runs automatically
   # commitlint validates message
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/component-name
   ```

7. **GitHub Actions Run**
   - ✓ PR checks run automatically
   - ✓ Provides feedback on any issues
   - ✓ Requires all checks to pass before merge

8. **Merge and Release**
   - ✓ Merge PR to main
   - ✓ Changeset action creates release PR
   - ✓ Merge release PR triggers publishing

---

## Phase 6: Team Communication & Documentation

### 1. Share with Team
- [ ] Send `CONTRIBUTING.md` to team
- [ ] Ensure everyone knows about conventional commits
- [ ] Explain changeset creation process

### 2. Documentation Updates
- [ ] Update team wiki/documentation site
- [ ] Add this guide to README
- [ ] Document any project-specific commit scopes

### 3. Onboarding Checklist for New Contributors
```markdown
## New Contributor Checklist

- [ ] Clone repository
- [ ] Install pnpm globally: `npm install -g pnpm`
- [ ] Install dependencies: `pnpm install`
- [ ] Read CONTRIBUTING.md
- [ ] Create feature branch: `git checkout -b feature/name`
- [ ] Make changes and commit with proper format
- [ ] Create changeset: `pnpm changeset`
- [ ] Push and open PR
```

---

## Phase 7: Continuous Monitoring

### Monitor GitHub Actions
1. Go to Actions tab
2. Monitor workflow runs for:
   - ✓ Success rates
   - ✓ Performance
   - ✓ Failures

### Review Logs
- Each PR shows detailed check results
- Failed checks block merge until fixed
- Logs help diagnose issues

### Update Workflows (as needed)
- Modify workflows if requirements change
- Update job timeouts if builds take longer
- Add new checks as codebase evolves

---

## Immediate Action Items (Priority Order)

### 🔴 Critical (Do First)
1. [ ] **Commit setup changes**
   ```bash
   git add . && git commit -m "chore: initialize husky and github actions"
   ```

2. [ ] **Configure GitHub branch protection**
   - Set required status checks
   - Require PR reviews

3. [ ] **Add npm token to secrets** (if publishing to npm)

### 🟡 Important (Do Soon)
4. [ ] Verify first commit triggers GitHub Actions
5. [ ] Confirm all checks pass
6. [ ] Share CONTRIBUTING.md with team
7. [ ] Update team on new workflow

### 🟢 Nice to Have (Later)
8. [ ] Set up changesets for versioning
9. [ ] Configure automatic release notes
10. [ ] Add badges to README

---

## Verification Checklist

### Setup Verification
- [x] Husky installed: `.husky/` directory exists
- [x] Hooks created: `pre-commit` and `commit-msg` files exist
- [x] GitHub Actions: All 5 workflows in `.github/workflows/`
- [x] Changesets configured: `.changeset/config.json` exists
- [x] Dependencies installed: `pnpm install` completes

### First Commit Test
- [ ] Create a test commit with proper message
- [ ] Watch pre-commit hook run
- [ ] Confirm ESLint/Prettier fixes applied
- [ ] Confirm commit-msg validation passes

### First PR Test  
- [ ] Create feature branch
- [ ] Make a small change
- [ ] Push and open PR
- [ ] Watch GitHub Actions run all checks
- [ ] Verify status badges appear

### First Release Test
- [ ] Create a changeset with test change
- [ ] Merge PR to main
- [ ] Watch changeset action create release PR
- [ ] Review version bumps and changelog
- [ ] Merge release PR (this triggers publishing)

---

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Husky hooks not running | Run `pnpm install` again |
| commitlint rejection | Ensure commit follows: `type(scope): message` |
| Pre-commit hook fixing files | This is expected - review changes and recommit |
| GitHub Actions not triggering | Push again or manually trigger from Actions tab |
| Changeset not detected in PR | Create with `pnpm changeset` |
| Dependencies not found | Run `pnpm install` in root |

---

## Next Document to Read

After completing this phase, read:
- **CONTRIBUTING.md** - Full development guide
- **SETUP_COMPLETE.md** - Setup overview
- **.github/workflows/*.yml** - Detailed workflow configs

---

## Questions?

Refer to:
1. CONTRIBUTING.md - Most common questions answered
2. GitHub Actions logs - Detailed error messages
3. Changeset docs - Version management details
4. Husky docs - Git hooks questions

---

**Status**: ✅ Ready for First Development Cycle

All infrastructure is in place. Follow Phase 2 to commit changes and begin!
