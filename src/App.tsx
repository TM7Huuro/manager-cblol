import { useState } from 'react';
import { useGameStore } from './store/gameStore';
import { TeamSelection } from './components/TeamSelection';
import { Dashboard } from './components/Dashboard';
import { RosterManagement } from './components/RosterManagement';
import { Economics } from './components/Economics';
import { TeamStore } from './components/TeamStore';
import { SocialMedia } from './components/SocialMedia';
import type { Team } from './types/game';
import { SAMPLE_PLAYERS, SAMPLE_COACHING_STAFF } from './data/initialData';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'roster' | 'economics' | 'store' | 'social'>('dashboard');
  const gameStore = useGameStore();

  const handleTeamSelected = (selectedTeam: Team) => {
    // Adicionar jogadores de exemplo
    const playersWithTeamId = SAMPLE_PLAYERS.map((player) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...player,
      teamId: selectedTeam.id,
    }));

    // Adicionar comissão técnica
    const staffWithTeamId = SAMPLE_COACHING_STAFF.map((staff) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...staff,
      teamId: selectedTeam.id,
    }));

    // Atualizar time com jogadores e staff
    const completeTeam: Team = {
      ...selectedTeam,
      players: playersWithTeamId as any,
      coachingStaff: staffWithTeamId as any,
    };

    // Inicializar store do jogo
    useGameStore.setState({
      teams: [completeTeam],
      currentTeamId: completeTeam.id,
      currentSeason: 2026,
      currentWeek: 1,
      currentDay: 1,
      balance: completeTeam.balance,
      fanEngagement: completeTeam.fanEngagement,
    });

    setGameStarted(true);
  };

  if (!gameStarted) {
    return <TeamSelection onTeamSelected={handleTeamSelected} />;
  }

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Manager CBLOL</h2>
          <div className="space-y-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`w-full text-left px-4 py-2 rounded font-semibold transition ${
                currentPage === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-gray-300'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('roster')}
              className={`w-full text-left px-4 py-2 rounded font-semibold transition ${
                currentPage === 'roster'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-gray-300'
              }`}
            >
              👥 Elenco
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-slate-700 text-gray-300 transition">
              📅 Partidas
            </button>
            <button
              onClick={() => setCurrentPage('economics')}
              className={`w-full text-left px-4 py-2 rounded font-semibold transition ${
                currentPage === 'economics'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-gray-300'
              }`}
            >
              💰 Economia
            </button>
            <button
              onClick={() => setCurrentPage('store')}
              className={`w-full text-left px-4 py-2 rounded font-semibold transition ${
                currentPage === 'store'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-gray-300'
              }`}
            >
              🛍️ Loja
            </button>
            <button
              onClick={() => setCurrentPage('social')}
              className={`w-full text-left px-4 py-2 rounded font-semibold transition ${
                currentPage === 'social'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-gray-300'
              }`}
            >
              📱 Redes Sociais
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-slate-700 text-gray-300 transition">
              🤝 Patrocínios
            </button>
          </div>
        </div>

        {/* Game Info */}
        <div className="bg-slate-700 rounded-lg p-4 mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Informações do Jogo</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📅 Semana: {gameStore.currentWeek}</p>
            <p>📆 Dia: {gameStore.currentDay}</p>
            <p>🎮 Temporada: {gameStore.currentSeason}</p>
            <p>💰 Saldo: R$ {gameStore.balance.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        {/* Time Controls */}
        <div className="mt-8 space-y-2">
          <button
            onClick={() => gameStore.advanceDay()}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            ➡️ Próximo Dia
          </button>
          <button
            onClick={() => gameStore.advanceWeek()}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            ⏭️ Próxima Semana
          </button>
          <button
            onClick={() => setGameStarted(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            🔄 Novo Jogo
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'roster' && <RosterManagement />}
        {currentPage === 'economics' && <Economics />}
        {currentPage === 'store' && <TeamStore />}
        {currentPage === 'social' && <SocialMedia />}
      </main>
    </div>
  );
}

export default App;
