import React from 'react';
import { useGameStore } from '../store/gameStore';

export const Economics: React.FC = () => {
  const gameState = useGameStore();
  const currentTeam = gameState.teams.find(t => t.id === gameState.currentTeamId);

  if (!currentTeam) return null;

  // Cálculos de receitas e despesas
  const playerSalaries = currentTeam.players.reduce((sum, p) => sum + p.salary, 0);
  const staffSalaries = currentTeam.coachingStaff.reduce((sum, s) => sum + s.salary, 0);
  const infrastructureCost = 10000;
  const marketingCost = 5000;
  const travelCost = 20000 / 4; // Distribuído por semana

  const totalExpenses = playerSalaries + staffSalaries + infrastructureCost + marketingCost + travelCost;

  const sponsorshipRevenue = currentTeam.sponsorships.reduce((sum, s) => sum + s.monthlyValue, 0);
  const merchandiseRevenue = currentTeam.store.dailySales * 30 * currentTeam.store.revenueMultiplier;
  const prizePoolRevenue = 50000; // Estimado

  const totalRevenue = sponsorshipRevenue + merchandiseRevenue + prizePoolRevenue;
  const monthlyBalance = totalRevenue - totalExpenses;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-white">Economia e Finanças</h1>

      {/* Saldo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Saldo Atual</p>
          <p className={`text-3xl font-bold mt-2 ${currentTeam.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            R$ {currentTeam.balance.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Receita Mensal</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Despesa Mensal</p>
          <p className="text-3xl font-bold text-red-400 mt-2">
            R$ {totalExpenses.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Balanço */}
      <div className={`rounded-lg p-6 border-2 ${monthlyBalance >= 0 ? 'bg-green-900 border-green-500' : 'bg-red-900 border-red-500'}`}>
        <p className="text-gray-300 text-sm">Balanço Mensal</p>
        <p className={`text-4xl font-bold mt-2 ${monthlyBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {monthlyBalance >= 0 ? '+' : ''}R$ {monthlyBalance.toLocaleString('pt-BR')}
        </p>
      </div>

      {/* Receitas */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Receitas</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Patrocínios</span>
            <span className="text-green-400 font-semibold">R$ {sponsorshipRevenue.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Loja do Time</span>
            <span className="text-green-400 font-semibold">R$ {merchandiseRevenue.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Prêmios de Competição</span>
            <span className="text-green-400 font-semibold">R$ {prizePoolRevenue.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-900 rounded font-semibold">
            <span className="text-white">Total de Receitas</span>
            <span className="text-green-400">R$ {totalRevenue.toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Despesas */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Despesas</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Salários dos Jogadores</span>
            <span className="text-red-400 font-semibold">R$ {playerSalaries.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Comissão Técnica</span>
            <span className="text-red-400 font-semibold">R$ {staffSalaries.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Infraestrutura</span>
            <span className="text-red-400 font-semibold">R$ {infrastructureCost.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Marketing</span>
            <span className="text-red-400 font-semibold">R$ {marketingCost.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Viagens</span>
            <span className="text-red-400 font-semibold">R$ {travelCost.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-red-900 rounded font-semibold">
            <span className="text-white">Total de Despesas</span>
            <span className="text-red-400">R$ {totalExpenses.toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Patrocínios */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Patrocínios Ativos</h3>
        {currentTeam.sponsorships.length === 0 ? (
          <p className="text-gray-400">Nenhum patrocínio ativo. Negocie com empresas!</p>
        ) : (
          <div className="space-y-3">
            {currentTeam.sponsorships.map((sponsor) => (
              <div key={sponsor.id} className="bg-slate-700 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{sponsor.name}</p>
                  <p className="text-gray-400 text-sm">{sponsor.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">R$ {sponsor.monthlyValue.toLocaleString('pt-BR')}/mês</p>
                  <p className="text-gray-400 text-sm">Visibilidade: {sponsor.visibilityLevel}%</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
