# Deploy local para Vercel via CLI
$ErrorActionPreference = 'Stop'

Write-Host "=== [1/2] Verificando Autenticacao na Vercel ===" -ForegroundColor Cyan
Write-Host "Iniciando conexao com a Vercel..." -ForegroundColor Yellow
npx --yes vercel login

Write-Host "`n=== [2/2] Realizando Deploy em Producao ===" -ForegroundColor Cyan
npx --yes vercel --prod

Write-Host "`n Deploy realizado na Vercel com sucesso!" -ForegroundColor Green
