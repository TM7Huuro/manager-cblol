# Deploy do Manager CBLOL

## Opções de Deploy

### 1. Railway (Recomendado - Mais Simples)

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Conecte sua conta GitHub
5. Selecione o repositório `manager-cblol`
6. Railway detectará automaticamente as configurações
7. Clique em "Deploy"

**Tempo**: ~2-3 minutos

### 2. Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório GitHub
4. Vercel detectará Vite automaticamente
5. Clique em "Deploy"

**Tempo**: ~1-2 minutos

### 3. Docker Local

```bash
docker build -t manager-cblol .
docker run -p 3000:3000 manager-cblol
```

Acesse: http://localhost:3000

### 4. Heroku

```bash
heroku login
heroku create manager-cblol
git push heroku master
```

## Variáveis de Ambiente

Nenhuma variável obrigatória para o MVP. Veja `.env.example` para referência.

## Troubleshooting

**Erro: "Cannot find module"**
- Execute: `npm install`
- Rebuild: `npm run build`

**Erro: "Port already in use"**
- Mude a porta: `PORT=3001 npm run preview`

**Erro: "Build failed"**
- Verifique Node.js version: `node -v` (deve ser 18+)
- Limpe cache: `rm -rf node_modules && npm install`

## Monitoramento

- Railway: Dashboard em [railway.app](https://railway.app)
- Vercel: Dashboard em [vercel.com](https://vercel.com)
- Logs: Disponíveis em ambas as plataformas

## Próximos Passos

1. Testar em produção
2. Adicionar domínio customizado
3. Configurar CI/CD
4. Adicionar banco de dados (PostgreSQL)
5. Implementar autenticação
