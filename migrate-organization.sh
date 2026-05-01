#!/bin/bash

################################################################################
# Migrate Monorepo Organization Scope Script (Unix/Linux/macOS)
################################################################################
# This script migrates the monorepo organization from @design-system to @freeformation
#
# Usage:
#   ./migrate-organization.sh [--dry-run] [--verbose]
#
# Examples:
#   ./migrate-organization.sh --dry-run    # Preview changes
#   ./migrate-organization.sh               # Apply changes
#   ./migrate-organization.sh --dry-run --verbose  # Detailed preview
################################################################################

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

# Configuration
OLD_ORG="design-system"
NEW_ORG="freeformation"
OLD_SCOPE="@design-system"
NEW_SCOPE="@freeformation"

# Options
DRY_RUN=false
VERBOSE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --verbose)
            VERBOSE=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Utility functions
print_header() {
    echo ""
    echo -e "${CYAN}======================================== ${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}======================================== ${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${GRAY}• $1${NC}"
}

print_change() {
    local file=$1
    local desc=$2
    echo -e "${YELLOW}  ➜ $file${NC}"
    echo -e "${GRAY}    $desc${NC}"
}

print_verbose() {
    if [ "$VERBOSE" = true ]; then
        echo -e "${GRAY}$1${NC}"
    fi
}

# Find files to process
find_files_to_process() {
    local patterns=("*.json" "*.ts" "*.tsx" "*.js" "*.jsx" "*.yml" "*.yaml" "*.md")
    local exclude_dirs=("node_modules" ".git" "dist" "build" ".next" "coverage" ".husky" "storybook-static")
    
    local exclude_pattern=""
    for dir in "${exclude_dirs[@]}"; do
        exclude_pattern="$exclude_pattern -not -path */$dir -not -path */$dir/*"
    done
    
    find . -type f \( -name "*.json" -o -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.yml" -o -name "*.yaml" -o -name "*.md" \) $exclude_pattern 2>/dev/null | sort
}

# Check if file contains pattern
file_contains_pattern() {
    local file=$1
    local pattern=$2
    grep -q "$pattern" "$file" 2>/dev/null && return 0 || return 1
}

# Count occurrences of pattern in file
count_occurrences() {
    local file=$1
    local pattern=$2
    grep -o "$pattern" "$file" 2>/dev/null | wc -l || echo 0
}

# Replace in file
replace_in_file() {
    local file=$1
    local old_value=$2
    local new_value=$3
    
    if file_contains_pattern "$file" "$old_value"; then
        if [ "$DRY_RUN" = false ]; then
            # Use sed with -i (in-place) for cross-platform compatibility
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                sed -i '' "s|$old_value|$new_value|g" "$file"
            else
                # Linux
                sed -i "s|$old_value|$new_value|g" "$file"
            fi
        fi
        return 0
    fi
    return 1
}

# Main script
print_header "Monorepo Organization Migration"
echo -e "Old Organization: ${YELLOW}$OLD_SCOPE${NC}"
echo -e "New Organization: ${YELLOW}$NEW_SCOPE${NC}"

if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}MODE: DRY RUN (no changes will be made)${NC}"
fi

echo ""
echo -e "${CYAN}Scanning for files...${NC}"

# Get all files
files_to_process=($(find_files_to_process))
print_info "Found ${#files_to_process[@]} files to scan"

# Patterns to search for
search_patterns=("$OLD_SCOPE" "@$OLD_ORG" "$OLD_ORG" "design-system")

# Find files with changes
declare -a files_with_changes
total_replacements=0

print_header "Scanning Files"

for file in "${files_to_process[@]}"; do
    for pattern in "${search_patterns[@]}"; do
        occurrences=$(count_occurrences "$file" "$pattern")
        if [ "$occurrences" -gt 0 ]; then
            if [[ ! " ${files_with_changes[@]} " =~ " ${file} " ]]; then
                files_with_changes+=("$file")
            fi
            total_replacements=$((total_replacements + occurrences))
            print_verbose "$file contains '$pattern' ($occurrences times)"
        fi
    done
done

print_success "Found ${#files_with_changes[@]} files with changes needed"
print_success "Total occurrences to replace: $total_replacements"

# Preview changes
print_header "Preview of Changes"

count=0
for file in "${files_with_changes[@]}"; do
    if [ $count -lt 10 ]; then
        print_change "$file" "Will replace @design-system → @freeformation"
        count=$((count + 1))
    fi
done

if [ ${#files_with_changes[@]} -gt 10 ]; then
    echo -e "${GRAY}  ... and $((${#files_with_changes[@]} - 10)) more files${NC}"
fi

# Apply replacements
if [ "$DRY_RUN" = false ]; then
    print_header "Applying Changes"
    echo -e "${CYAN}Processing ${#files_with_changes[@]} files...${NC}"
    
    replacement_count=0
    for file in "${files_with_changes[@]}"; do
        # Replace @design-system with @freeformation
        if replace_in_file "$file" "$OLD_SCOPE" "$NEW_SCOPE"; then
            print_change "$file" "Replaced $OLD_SCOPE → $NEW_SCOPE"
            replacement_count=$((replacement_count + 1))
        fi
        
        # Replace design-system with freeformation (careful to avoid false positives)
        if file_contains_pattern "$file" "$OLD_ORG"; then
            # Check if it's in a quoted or path context
            if grep -E '(@|[-/"`\s])design-system($|[-/"`\s])' "$file" >/dev/null 2>&1; then
                if replace_in_file "$file" "design-system" "freeformation"; then
                    print_change "$file" "Replaced design-system → freeformation"
                    replacement_count=$((replacement_count + 1))
                fi
            fi
        fi
    done
    
    print_header "Migration Complete"
    print_success "Updated $replacement_count files"
    echo ""
else
    print_header "DRY RUN Summary"
    echo -e "${YELLOW}Would update ${#files_with_changes[@]} files${NC}"
    echo -e "${YELLOW}Would make $total_replacements replacements${NC}"
    echo ""
    echo -e "${CYAN}Run without --dry-run flag to apply changes:${NC}"
    echo -e "${CYAN}  ./migrate-organization.sh${NC}"
    echo ""
fi

# Summary
print_header "Key Files to Review"
critical_files=(
    "package.json"
    "pnpm-workspace.yaml"
    ".github/workflows/*.yml"
    "packages/design-system/package.json"
    "packages/storybook/package.json"
    "README.md"
    "CONTRIBUTING.md"
)

for pattern in "${critical_files[@]}"; do
    # Use find instead of ls for portability
    found_files=$(find . -name "${pattern##*/}" -path "${pattern%/*}" 2>/dev/null | head -5)
    if [ ! -z "$found_files" ]; then
        while IFS= read -r file; do
            print_info "$file"
        done <<< "$found_files"
    fi
done

print_header "Next Steps"
echo -e "${CYAN}1. Review changed files for accuracy${NC}"
echo -e "${CYAN}2. Verify imports work correctly${NC}"
echo -e "${CYAN}3. Run: pnpm install${NC}"
echo -e "${CYAN}4. Run: pnpm build${NC}"
echo -e "${CYAN}5. Run: pnpm test:unit${NC}"
echo ""

if [ "$DRY_RUN" = false ]; then
    echo -e "${CYAN}Rename directories (if needed):${NC}"
    echo -e "${GRAY}  (Do this manually if required)${NC}"
    echo ""
fi

print_success "Migration script complete!"
