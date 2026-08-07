import React from 'react';
import { useGameStore } from '../store/gameStore';

export const Dashboard: React.FC = () => {
  const gameState = useGameStore();
  const currentTeam = gameState.teams.find(t => t.id === gameState.currentTeamId);

  if (!currentTeam) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-gray-400">Selecione um time para começar</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">{currentTeam.name}</h1>
          <p className="text-gray-400 mt-2">
            Semana {gameState.currentWeek} • Dia {gameState.currentDay}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Saldo</p>
          <p className="text-3xl font-bold text-green-400">
            R$ {currentTeam.balance.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ranking */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Posição no Ranking</p>
          <p className="text-3xl font-bold text-white mt-2">#{currentTeam.rankingPosition}</p>
        </div>

        {/* Win Rate */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Vitórias / Derrotas</p>
          <p className="text-3xl font-bold text-white mt-2">
            {currentTeam.wins}W - {currentTeam.losses}L
          </p>
        </div>

        {/* Fan Engagement */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Engajamento de Torcida</p>
          <div className="mt-2">
            <p className="text-3xl font-bold text-blue-400">{currentTeam.fanEngagement}%</p>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${currentTeam.fanEngagement}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tier */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Tier</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">
            {currentTeam.tier === 'CBLOL' ? 'CBLOL' : 'Desafiante'}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition">
          📅 Próxima Partida
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition">
          👥 Gerenciar Elenco
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition">
          🛍️ Loja do Time
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition">
          💰 Economia
        </button>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition">
          📱 Redes Sociais
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition">
          ⚙️ Configurações
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Atividade Recente</h2>
        <div className="space-y-2 text-gray-400 text-sm">
          <p>✓ Jogo iniciado com {currentTeam.name}</p>
          <p>✓ Elenco carregado com {currentTeam.players.length} jogadores</p>
          <p>✓ Comissão técnica configurada</p>
        </div>
      </div>
    </div>
  );
};
