#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Migrate monorepo organization scope from @design-system to @freeformation
    
.PARAMETER DryRun
    If specified, shows what would be changed without making changes
    
.PARAMETER Verbose
    Shows detailed output of all changes
    
.EXAMPLE
    .\migrate-organization.ps1
    
.EXAMPLE
    .\migrate-organization.ps1 -DryRun
#>

param(
    [switch]$DryRun,
    [switch]$Verbose
)

# Configuration
$OldOrg = "design-system"
$NewOrg = "freeformation"
$OldScope = "@design-system"
$NewScope = "@freeformation"

# Directories to exclude
$ExcludeDirs = @(
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "coverage",
    ".husky",
    "storybook-static"
)

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "• $Message" -ForegroundColor Gray
}

function Write-Change {
    param([string]$File, [string]$Description)
    Write-Host "  > $File" -ForegroundColor Yellow
    Write-Host "    $Description" -ForegroundColor DarkGray
}

function Get-FilesToProcess {
    $excludePattern = ($ExcludeDirs | ForEach-Object { [regex]::Escape($_) }) -join '|'
    
    $files = @()
    $searchPatterns = @("*.json", "*.ts", "*.tsx", "*.js", "*.jsx", "*.yml", "*.yaml", "*.md")
    
    foreach ($pattern in $searchPatterns) {
        $found = Get-ChildItem -Path . -Include $pattern -Recurse -ErrorAction SilentlyContinue |
            Where-Object { 
                $fullPath = $_.FullName -replace '\\', '/'
                -not ($fullPath -match $excludePattern) -and
                -not ($_.Name -like ".git*")
            }
        $files += $found
    }
    
    return $files | Select-Object -Unique
}

function Test-FileContainsOrg {
    param(
        [string]$FilePath,
        [string]$SearchPattern
    )
    
    try {
        $content = Get-Content -Path $FilePath -Raw -ErrorAction SilentlyContinue
        return $content -like "*$SearchPattern*"
    }
    catch {
        return $false
    }
}

function Replace-InFile {
    param(
        [string]$FilePath,
        [string]$OldValue,
        [string]$NewValue
    )
    
    try {
        $content = Get-Content -Path $FilePath -Raw
        $newContent = $content -replace [regex]::Escape($OldValue), $NewValue
        
        if ($content -ne $newContent) {
            if (-not $DryRun) {
                Set-Content -Path $FilePath -Value $newContent -Encoding UTF8
            }
            return $true
        }
        return $false
    }
    catch {
        Write-Host "  x Error processing $FilePath : $_" -ForegroundColor Red
        return $false
    }
}

function Get-ChangeCount {
    param(
        [string]$FilePath,
        [string]$SearchPattern
    )
    
    try {
        $content = Get-Content -Path $FilePath -Raw
        $matches = [regex]::Matches($content, [regex]::Escape($SearchPattern))
        return $matches.Count
    }
    catch {
        return 0
    }
}

# Main script
Write-Header "Monorepo Organization Migration"
Write-Host "Old Organization: $OldScope" -ForegroundColor Yellow
Write-Host "New Organization: $NewScope" -ForegroundColor Yellow

if ($DryRun) {
    Write-Host "MODE: DRY RUN (no changes will be made)" -ForegroundColor Magenta
}

Write-Host ""
Write-Host "Scanning for files..." -ForegroundColor Cyan

# Get all files to process
$filesToProcess = @(Get-FilesToProcess)
Write-Info "Found $($filesToProcess.Count) files to scan"

# Patterns to search for
$searchPatterns = @($OldScope, $OldOrg, "design-system")

$filesWithChanges = @()
$totalReplacements = 0

Write-Header "Scanning Files"

foreach ($file in $filesToProcess) {
    $relativePath = $file.FullName -replace [regex]::Escape((Get-Location).Path + '\'), ''
    
    foreach ($pattern in $searchPatterns) {
        $changeCount = Get-ChangeCount -FilePath $file.FullName -SearchPattern $pattern
        if ($changeCount -gt 0) {
            if ($file -notin $filesWithChanges) {
                $filesWithChanges += $file
            }
            $totalReplacements += $changeCount
            if ($Verbose) {
                Write-Info "$relativePath contains '$pattern' - $changeCount matches"
            }
        }
    }
}

Write-Success ("Found {0} files with changes needed" -f $filesWithChanges.Count)
Write-Success ("Total occurrences to replace: {0}" -f $totalReplacements)

# Preview changes
Write-Header "Preview of Changes"

$changePreview = 0
foreach ($file in $filesWithChanges | Select-Object -First 10) {
    $relativePath = $file.FullName -replace [regex]::Escape((Get-Location).Path + '\'), ''
    Write-Change $relativePath "Will replace @design-system with @freeformation"
    $changePreview++
}

if ($filesWithChanges.Count -gt 10) {
    Write-Host "  ... and $($filesWithChanges.Count - 10) more files" -ForegroundColor DarkGray
}

# Perform replacements
if (-not $DryRun) {
    Write-Header "Applying Changes"
    Write-Host "Processing $($filesWithChanges.Count) files..." -ForegroundColor Cyan
    
    $replacementCount = 0
    foreach ($file in $filesWithChanges) {
        $relativePath = $file.FullName -replace [regex]::Escape((Get-Location).Path + '\'), ''
        
        $replaced = $false
        
        # Replace @design-system with @freeformation
        if (Test-FileContainsOrg -FilePath $file.FullName -SearchPattern $OldScope) {
            if (Replace-InFile -FilePath $file.FullName -OldValue $OldScope -NewValue $NewScope) {
                Write-Change $relativePath "Replaced $OldScope with $NewScope"
                $replaced = $true
            }
        }
        
        # Replace design-system with freeformation
        if (Test-FileContainsOrg -FilePath $file.FullName -SearchPattern $OldOrg) {
            if (Replace-InFile -FilePath $file.FullName -OldValue "design-system" -NewValue "freeformation") {
                Write-Change $relativePath "Replaced design-system with freeformation"
                $replaced = $true
            }
        }
        
        if ($replaced) {
            $replacementCount++
        }
    }
    
    Write-Header "Migration Complete"
    Write-Success "Updated $replacementCount files"
    Write-Host ""
}
else {
    Write-Header "DRY RUN Summary"
    Write-Host "Would update $($filesWithChanges.Count) files" -ForegroundColor Yellow
    Write-Host "Would make $totalReplacements replacements" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Run without -DryRun flag to apply changes:" -ForegroundColor Cyan
    Write-Host "  .\migrate-organization.ps1" -ForegroundColor Cyan
    Write-Host ""
}

# Summary
Write-Header "Key Files to Review"
$criticalFiles = @(
    "package.json",
    "pnpm-workspace.yaml",
    "packages\design-system\package.json",
    "packages\storybook\package.json",
    "README.md",
    "CONTRIBUTING.md"
)

foreach ($filePattern in $criticalFiles) {
    $files = Get-ChildItem -Path $filePattern -ErrorAction SilentlyContinue 2>$null
    if ($files) {
        foreach ($file in $files) {
            Write-Info $file.FullName
        }
    }
}

Write-Header "Next Steps"
Write-Host "1. Review changed files for accuracy" -ForegroundColor Cyan
Write-Host "2. Verify imports work correctly" -ForegroundColor Cyan
Write-Host "3. Run: pnpm install" -ForegroundColor Cyan
Write-Host "4. Run: pnpm build" -ForegroundColor Cyan
Write-Host "5. Run: pnpm test:unit" -ForegroundColor Cyan
Write-Host ""

if (-not $DryRun) {
    Write-Host "Rename directories (if needed):" -ForegroundColor Cyan
    Write-Host "  (Do this manually if required)" -ForegroundColor Gray
    Write-Host ""
}

Write-Success "Migration script complete!"
