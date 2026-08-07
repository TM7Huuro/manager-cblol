import React from 'react';
import { useGameStore } from '../store/gameStore';

export const RosterManagement: React.FC = () => {
  const gameState = useGameStore();
  const currentTeam = gameState.teams.find(t => t.id === gameState.currentTeamId);

  if (!currentTeam) return null;

  const getPlayerColor = (role: string) => {
    const colors: Record<string, string> = {
      TOP: 'bg-red-900',
      JUNGLE: 'bg-green-900',
      MID: 'bg-blue-900',
      ADC: 'bg-yellow-900',
      SUPPORT: 'bg-purple-900',
    };
    return colors[role] || 'bg-gray-900';
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-white">Gestão de Elenco</h1>

      {/* Stats Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Total de Jogadores</p>
          <p className="text-3xl font-bold text-white mt-2">{currentTeam.players.length}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Folha de Pagamento Mensal</p>
          <p className="text-3xl font-bold text-red-400 mt-2">
            R$ {currentTeam.players.reduce((sum, p) => sum + p.salary, 0).toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Nível Médio</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {(currentTeam.players.reduce((sum, p) => sum + p.level, 0) / currentTeam.players.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Jogadores por Posição */}
      <div className="space-y-4">
        {['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'].map((role) => {
          const playersInRole = currentTeam.players.filter(p => p.role === role);
          return (
            <div key={role} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">{role}</h3>
              <div className="space-y-3">
                {playersInRole.map((player) => (
                  <div
                    key={player.id}
                    className={`${getPlayerColor(role)} rounded-lg p-4 flex justify-between items-center`}
                  >
                    <div>
                      <p className="text-white font-semibold">{player.nickname}</p>
                      <p className="text-gray-300 text-sm">{player.name}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-300">
                        <span>Lvl {player.level}</span>
                        <span>Mecânica: {player.stats.mechanics}</span>
                        <span>Conhecimento: {player.stats.gameKnowledge}</span>
                        <span>Teamwork: {player.stats.teamwork}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">R$ {player.salary.toLocaleString('pt-BR')}</p>
                      <p className="text-gray-300 text-sm">{player.wins}W - {player.matchesPlayed - player.wins}L</p>
                      <p className="text-yellow-300 text-sm">KDA: {player.kda.toFixed(1)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Comissão Técnica */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">Comissão Técnica</h3>
        <div className="space-y-3">
          {currentTeam.coachingStaff.map((staff) => (
            <div key={staff.id} className="bg-slate-700 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">{staff.name}</p>
                <p className="text-gray-400 text-sm">{staff.role}</p>
              </div>
              <p className="text-white font-semibold">R$ {staff.salary.toLocaleString('pt-BR')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
