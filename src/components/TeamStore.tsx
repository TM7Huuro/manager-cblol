import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export const TeamStore: React.FC = () => {
  const gameState = useGameStore();
  const currentTeam = gameState.teams.find(t => t.id === gameState.currentTeamId);
  const [selectedColor1, setSelectedColor1] = useState('#0ea5e9');
  const [selectedColor2, setSelectedColor2] = useState('#ffffff');

  if (!currentTeam) return null;

  const store = currentTeam.store;
  const jerseyRevenue = store.jerseysSold * store.jerseyPrice;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-white">Loja do Time</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Base de Fãs</p>
          <p className="text-3xl font-bold text-white mt-2">{store.fanBase.toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Camisetas Vendidas</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{store.jerseysSold}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Receita (Camisetas)</p>
          <p className="text-3xl font-bold text-green-400 mt-2">R$ {jerseyRevenue.toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Multiplicador de Vendas</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{store.revenueMultiplier.toFixed(2)}x</p>
        </div>
      </div>

      {/* Designer de Camiseta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Prévia da Camiseta</h3>
          <div className="flex justify-center items-center h-64 bg-slate-700 rounded-lg">
            <div className="relative">
              {/* Camiseta */}
              <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
                {/* Corpo */}
                <rect x="20" y="40" width="80" height="100" fill={selectedColor1} rx="4" />
                {/* Gola */}
                <circle cx="60" cy="40" r="15" fill={selectedColor1} />
                {/* Mangas */}
                <rect x="0" y="50" width="20" height="60" fill={selectedColor1} rx="4" />
                <rect x="100" y="50" width="20" height="60" fill={selectedColor1} rx="4" />
                {/* Logo/Número */}
                <text x="60" y="100" fontSize="32" fontWeight="bold" fill={selectedColor2} textAnchor="middle">
                  {currentTeam.name.charAt(0)}
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Customização */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
          <h3 className="text-xl font-bold text-white">Customizar Camiseta</h3>

          <div>
            <label className="block text-gray-300 mb-2">Cor Primária</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedColor1}
                onChange={(e) => setSelectedColor1(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor1}
                onChange={(e) => setSelectedColor1(e.target.value)}
                className="flex-1 bg-slate-700 text-white px-3 py-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Cor Secundária</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedColor2}
                onChange={(e) => setSelectedColor2(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor2}
                onChange={(e) => setSelectedColor2(e.target.value)}
                className="flex-1 bg-slate-700 text-white px-3 py-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Preço (R$)</label>
            <input
              type="number"
              value={store.jerseyPrice}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded"
              disabled
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
            💾 Salvar Design
          </button>
        </div>
      </div>

      {/* Vendas */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Histórico de Vendas</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Camisetas em Estoque</span>
            <span className="text-white font-semibold">{store.jerseyStock}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Vendidas este mês</span>
            <span className="text-green-400 font-semibold">{store.dailySales * 30}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
            <span className="text-gray-300">Receita este mês</span>
            <span className="text-green-400 font-semibold">R$ {(store.dailySales * 30 * store.jerseyPrice).toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-900 rounded font-semibold">
            <span className="text-white">Total Arrecadado</span>
            <span className="text-green-400">R$ {(store.jerseysSold * store.jerseyPrice).toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Engajamento */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Engajamento de Torcida</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Nível de Engajamento</span>
              <span className="text-blue-400 font-semibold">{currentTeam.fanEngagement}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all"
                style={{ width: `${currentTeam.fanEngagement}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 space-y-2 text-sm text-gray-300">
            <p>📈 Fatores que aumentam engajamento:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Vitórias consecutivas (+5%)</li>
              <li>Desempenho individual (+2%)</li>
              <li>Postagens virais (+3%)</li>
              <li>Vendas na loja (+1%)</li>
            </ul>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 space-y-2 text-sm text-gray-300">
            <p>📉 Fatores que diminuem engajamento:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Derrotas consecutivas (-5%)</li>
              <li>Postagens críticas virais (-5%)</li>
              <li>Polêmicas (-10%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
