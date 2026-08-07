import { create } from 'zustand';
import type { GameState, Player, Match, Post } from '../types/game';

interface GameStore extends GameState {
  // Team actions
  setCurrentTeam: (teamId: string) => void;
  updateTeamBalance: (teamId: string, amount: number) => void;
  updateTeamFanEngagement: (teamId: string, amount: number) => void;
  
  // Player actions
  addPlayer: (teamId: string, player: Player) => void;
  updatePlayer: (teamId: string, playerId: string, updates: Partial<Player>) => void;
  removePlayer: (teamId: string, playerId: string) => void;
  
  // Match actions
  addMatch: (match: Match) => void;
  
  // Post actions
  addPost: (post: Post) => void;
  
  // Time progression
  advanceDay: () => void;
  advanceWeek: () => void;
  
  // Initialize game
  initializeGame: (teamId: string) => void;
}

const initialGameState: GameState = {
  currentTeamId: '',
  currentSeason: 2026,
  currentWeek: 1,
  currentDay: 1,
  balance: 100000, // Saldo inicial em reais
  fanEngagement: 50, // 0-100
  teams: [],
  matches: [],
  posts: [],
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialGameState,
  
  setCurrentTeam: (teamId: string) => set({ currentTeamId: teamId }),
  
  updateTeamBalance: (teamId: string, amount: number) => {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, balance: team.balance + amount } : team
      ),
    }));
  },
  
  updateTeamFanEngagement: (teamId: string, amount: number) => {
    set((state) => ({
      teams: state.teams.map((team) => {
        if (team.id === teamId) {
          const newEngagement = Math.max(0, Math.min(100, team.fanEngagement + amount));
          return { ...team, fanEngagement: newEngagement };
        }
        return team;
      }),
    }));
  },
  
  addPlayer: (teamId: string, player: Player) => {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId
          ? { ...team, players: [...team.players, player] }
          : team
      ),
    }));
  },
  
  updatePlayer: (teamId: string, playerId: string, updates: Partial<Player>) => {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              players: team.players.map((player) =>
                player.id === playerId ? { ...player, ...updates } : player
              ),
            }
          : team
      ),
    }));
  },
  
  removePlayer: (teamId: string, playerId: string) => {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              players: team.players.filter((player) => player.id !== playerId),
            }
          : team
      ),
    }));
  },
  
  addMatch: (match: Match) => {
    set((state) => ({
      matches: [...state.matches, match],
    }));
  },
  
  addPost: (post: Post) => {
    set((state) => ({
      posts: [...state.posts, post],
    }));
  },
  
  advanceDay: () => {
    set((state: GameState) => {
      const newDay = state.currentDay + 1;
      if (newDay > 7) {
        return {
          currentDay: 1,
          currentWeek: state.currentWeek + 1,
        };
      }
      return { currentDay: newDay };
    });
  },
  
  advanceWeek: () => {
    set((state) => ({
      currentWeek: state.currentWeek + 1,
    }));
  },
  
  initializeGame: (teamId: string) => {
    set({
      currentTeamId: teamId,
      currentSeason: 2026,
      currentWeek: 1,
      currentDay: 1,
      balance: 100000,
      fanEngagement: 50,
    });
  },
}));
