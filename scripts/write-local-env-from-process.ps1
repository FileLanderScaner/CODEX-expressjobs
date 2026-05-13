param(
  [switch]$IncludeRls = $true
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root

$localRequired = @(
  "APP_ENV",
  "SUPABASE_ACCESS_TOKEN",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_APP_URL",
  "ALLOWED_ORIGINS",
  "ENABLE_PAYMENTS",
  "ENABLE_AI_AGENTS",
  "AI_KILL_SWITCH",
  "ENABLE_ADMIN_PANEL"
)

$rlsRequired = @(
  "APP_ENV",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "EXPRESSJOBS_STAGING_CLIENT_EMAIL",
  "EXPRESSJOBS_STAGING_CLIENT_PASSWORD",
  "EXPRESSJOBS_STAGING_WORKER_EMAIL",
  "EXPRESSJOBS_STAGING_WORKER_PASSWORD",
  "EXPRESSJOBS_STAGING_ADMIN_EMAIL",
  "EXPRESSJOBS_STAGING_ADMIN_PASSWORD"
)

function Assert-EnvPresent {
  param([string[]]$Names)

  $missing = @()
  foreach ($name in $Names) {
    if ([string]::IsNullOrWhiteSpace([Environment]::GetEnvironmentVariable($name, "Process"))) {
      $missing += $name
    }
  }

  if ($missing.Count -gt 0) {
    throw "Missing process env vars: $($missing -join ', ')"
  }
}

function Write-EnvFile {
  param(
    [string]$Path,
    [string[]]$Names
  )

  $lines = @()
  foreach ($name in $Names) {
    $value = [Environment]::GetEnvironmentVariable($name, "Process")
    $escaped = $value.Replace("`r", "").Replace("`n", "")
    $lines += "$name=$escaped"
  }

  Set-Content -LiteralPath $Path -Value $lines -Encoding utf8NoBOM
}

Assert-EnvPresent -Names $localRequired

if ($env:APP_ENV -notin @("staging", "preview")) {
  throw "APP_ENV must be staging or preview."
}

if ($env:ENABLE_PAYMENTS -ne "false") {
  throw "ENABLE_PAYMENTS must remain false."
}

if ($env:ENABLE_AI_AGENTS -ne "false") {
  throw "ENABLE_AI_AGENTS must remain false."
}

if ($env:AI_KILL_SWITCH -ne "true") {
  throw "AI_KILL_SWITCH must remain true."
}

if ($env:ENABLE_ADMIN_PANEL -ne "false") {
  throw "ENABLE_ADMIN_PANEL must remain false."
}

Write-EnvFile -Path ".env.local" -Names $localRequired

if ($IncludeRls) {
  Assert-EnvPresent -Names $rlsRequired
  $rlsNames = $rlsRequired + @("EXPRESSJOBS_ALLOW_STAGING_MUTATIONS")
  Write-EnvFile -Path ".env.rls" -Names $rlsNames
}

Write-Host "Local env files written without printing secret values."
Write-Host ".env.local and .env.rls are ignored by git."
