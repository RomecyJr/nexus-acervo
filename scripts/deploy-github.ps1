# Deploy e publicação automatizada no GitHub (Nexus Acervo)
param(
    [string]$RepoName = "nexus-acervo",
    [switch]$Public
)

$ErrorActionPreference = 'Stop'

Write-Host "`n=== [1/3] Verificando Autenticacao no GitHub ===" -ForegroundColor Cyan
$status = & gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Voce ainda nao conectou o GitHub CLI." -ForegroundColor Yellow
    Write-Host "Iniciando assistente seguro de login (abra o navegador e aprove o codigo)..." -ForegroundColor Green
    & gh auth login -h github.com -p https -w
} else {
    Write-Host "Autenticacao ativa no GitHub." -ForegroundColor Green
}

Write-Host "`n=== [2/3] Validando Integridade do Catalogo ===" -ForegroundColor Cyan
npm test
if ($LASTEXITCODE -ne 0) {
    Write-Host "Falha no QA do catalogo. Abortando publicacao." -ForegroundColor Red
    exit 1
}

$visibility = if ($Public) { "--public" } else { "--private" }
Write-Host "`n=== [3/3] Criando Repositorio '$RepoName' ($visibility) e Enviando Codigo ===" -ForegroundColor Cyan

$existingRemote = git remote get-url origin 2>$null
if (-not $existingRemote) {
    & gh repo create $RepoName $visibility --source=. --remote=origin --push
} else {
    Write-Host "Remote 'origin' ja configurado: $existingRemote. Fazendo push..." -ForegroundColor Yellow
    git push -u origin main
}

Write-Host "`n Projeto publicado com sucesso no seu GitHub!" -ForegroundColor Green
Write-Host "Acessando visualizacao no navegador..." -ForegroundColor Cyan
& gh repo view --web
