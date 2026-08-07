# Manager CBLOL 🎮

Um jogo de simulação e estratégia para gerenciamento de equipes de League of Legends focado no cenário brasileiro (CBLOL e Circuito Desafiante).

## 🎯 Objetivo

Comece no Circuito Desafiante e suba para o CBLOL gerenciando:
- **Elenco de Jogadores**: Recrute, treine e desenvolva seus jogadores
- **Economia**: Gerencie receitas (patrocínios, loja, prêmios) e despesas
- **Loja do Time**: Customize camisetas e venda merchandise
- **Engajamento**: Aumente a base de fãs através de vitórias e postagens
- **Redes Sociais**: Interaja com a comunidade

## 🚀 Começar Rápido

### Online (Recomendado)

Acesse: [manager-cblol.vercel.app](https://manager-cblol.vercel.app) (em breve)

### Local

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/manager-cblol.git
cd manager-cblol

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir em http://localhost:5173
```

### Build para Produção

```bash
npm run build
npm run preview
```

## 📋 Funcionalidades

### MVP 1.0 (Atual)

- ✅ Seleção de time (CBLOL/Circuito Desafiante)
- ✅ Dashboard com informações gerais
- ✅ Gestão de elenco
- ✅ Sistema de economia
- ✅ Loja do time com customização
- ✅ Redes sociais (X/Twitter)
- ✅ Controle de tempo

### MVP 2.0 (Planejado)

- [ ] Simulação de partidas
- [ ] Sistema de negociação
- [ ] Persistência de dados
- [ ] Mais NPCs

### MVP 3.0 (Futuro)

- [ ] Dados reais do CBLOL
- [ ] Integração com Riot API
- [ ] Eventos dinâmicos

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: TailwindCSS
- **State**: Zustand
- **Deploy**: Vercel/Railway

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Dashboard.tsx
│   ├── RosterManagement.tsx
│   ├── Economics.tsx
│   ├── TeamStore.tsx
│   ├── SocialMedia.tsx
│   └── TeamSelection.tsx
├── store/              # Zustand store
│   └── gameStore.ts
├── types/              # Tipos TypeScript
│   └── game.ts
├── data/               # Dados iniciais
│   └── initialData.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎮 Como Jogar

1. **Selecione um Time**: Escolha entre CBLOL ou Circuito Desafiante
2. **Explore o Dashboard**: Veja informações do seu time
3. **Gerencie seu Elenco**: Visualize jogadores e comissão técnica
4. **Monitore Economia**: Acompanhe receitas e despesas
5. **Customize Loja**: Crie designs de camiseta
6. **Engaje Comunidade**: Poste nas redes sociais
7. **Avance Tempo**: Use "Próximo Dia/Semana" para progredir

## 📚 Documentação

- [DEPLOY.md](./DEPLOY.md) - Instruções de deploy
- [Manager_CBLOL_MVP_Documentation.md](../Manager_CBLOL_MVP_Documentation.md) - Documentação técnica
- [Manager_CBLOL_Roadmap.md](../Manager_CBLOL_Roadmap.md) - Roadmap futuro

## 🐛 Problemas Conhecidos

- Dados fictícios (será integrado dados reais em MVP 3.0)
- Sem persistência de dados (será implementado em MVP 2.0)
- Sem simulação de partidas (será implementado em MVP 2.0)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é de código aberto sob a licença MIT.

## 👨‍💻 Desenvolvido por

**Manus AI** - Agosto 2026

## 📞 Contato

- Issues: GitHub Issues
- Email: [a ser definido]

---

**Aproveite o jogo! 🎮🏆**
