import React, { useState } from 'react';
import type { Team } from '../types/game';
import { CBLOL_TEAMS, CHALLENGER_TEAMS } from '../data/initialData';

interface TeamSelectionProps {
  onTeamSelected: (team: Team) => void;
}

export const TeamSelection: React.FC<TeamSelectionProps> = ({ onTeamSelected }) => {
  const [selectedTier, setSelectedTier] = useState<'CBLOL' | 'CIRCUITO_DESAFIANTE'>('CBLOL');
  
  const teams = selectedTier === 'CBLOL' ? CBLOL_TEAMS : CHALLENGER_TEAMS;

  const handleSelectTeam = (teamData: Partial<Team>) => {
    const team: Team = {
      id: Math.random().toString(36).substr(2, 9),
      name: teamData.name || 'Novo Time',
      logo: teamData.logo || '🎮',
      foundedDate: new Date(),
      region: teamData.region || 'BRASIL',
      tier: teamData.tier || 'CIRCUITO_DESAFIANTE',
      season: 2026,
      balance: teamData.balance || 100000,
      sponsorships: [],
      merchandiseRevenue: 0,
      players: [],
      coachingStaff: [],
      wins: 0,
      losses: 0,
      rankingPosition: teamData.rankingPosition || 1,
      store: {
        id: Math.random().toString(36).substr(2, 9),
        teamId: '',
        jerseyDesign: '',
        jerseyColors: ['#0ea5e9', '#ffffff'],
        jerseyPrice: 150,
        jerseyStock: 100,
        jerseysSold: 0,
        merchandise: [],
        fanBase: 1000,
        dailySales: 0,
        revenueMultiplier: 1,
      },
      fanEngagement: teamData.fanEngagement || 50,
    };
    
    team.store.teamId = team.id;
    onTeamSelected(team);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Manager CBLOL</h1>
          <p className="text-xl text-gray-400">
            Gerencie sua equipe de League of Legends
          </p>
        </div>

        {/* Tier Selection */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedTier('CBLOL')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              selectedTier === 'CBLOL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            🏆 CBLOL (Tier 1)
          </button>
          <button
            onClick={() => setSelectedTier('CIRCUITO_DESAFIANTE')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              selectedTier === 'CIRCUITO_DESAFIANTE'
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            ⭐ Circuito Desafiante (Tier 2)
          </button>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((teamData, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
              onClick={() => handleSelectTeam(teamData)}
            >
              <div className="text-5xl mb-4">{teamData.logo}</div>
              <h3 className="text-xl font-bold text-white mb-2">{teamData.name}</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>💰 Saldo: R$ {teamData.balance?.toLocaleString('pt-BR')}</p>
                <p>👥 Região: {teamData.region}</p>
                <p>📊 Posição: #{teamData.rankingPosition}</p>
                <p>
                  📈 Engajamento:{' '}
                  <span className="text-blue-400">{teamData.fanEngagement}%</span>
                </p>
              </div>
              <button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectTeam(teamData);
                }}
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Escolha um time para começar sua jornada no Manager CBLOL</p>
        </div>
      </div>
    </div>
  );
};
