// Tipos para o jogo Manager CBLOL

export type PlayerRole = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';
export type TeamTier = 'CIRCUITO_DESAFIANTE' | 'CBLOL';
export type SponsorshipType = 'EQUIPAMENTO' | 'BEBIDA' | 'TECH' | 'ENERGIA' | 'OUTRO';
export type PostSentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export interface PlayerStats {
  mechanics: number;
  gameKnowledge: number;
  teamwork: number;
  consistency: number;
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  nationality: string;
  role: PlayerRole;
  level: number;
  experience: number;
  stats: PlayerStats;
  salary: number;
  contractEndDate: Date;
  marketValue: number;
  matchesPlayed: number;
  wins: number;
  kda: number;
  championPool: string[];
  teamId: string;
}

export interface CoachingStaff {
  id: string;
  name: string;
  role: 'HEAD_COACH' | 'ASSISTANT' | 'ANALYST';
  salary: number;
  experience: number;
  teamId: string;
}

export interface Sponsorship {
  id: string;
  name: string;
  type: SponsorshipType;
  monthlyValue: number;
  contractStart: Date;
  contractEnd: Date;
  visibilityLevel: number;
  teamId: string;
}

export interface MerchandiseItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
}

export interface Store {
  id: string;
  teamId: string;
  jerseyDesign: string;
  jerseyColors: string[];
  jerseyPrice: number;
  jerseyStock: number;
  jerseysSold: number;
  merchandise: MerchandiseItem[];
  fanBase: number;
  dailySales: number;
  revenueMultiplier: number;
}

export interface Post {
  id: string;
  teamId: string;
  author: 'NPC' | 'PLAYER' | 'COACH';
  content: string;
  sentiment: PostSentiment;
  engagement: number;
  date: Date;
  fanEngagementImpact: number;
  teamMoraleImpact: number;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  foundedDate: Date;
  region: 'BRASIL' | 'ARGENTINA' | 'OUTRO';
  tier: TeamTier;
  season: number;
  balance: number;
  sponsorships: Sponsorship[];
  merchandiseRevenue: number;
  players: Player[];
  coachingStaff: CoachingStaff[];
  wins: number;
  losses: number;
  rankingPosition: number;
  store: Store;
  fanEngagement: number;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  winnerId: string;
  kills: { team1: number; team2: number };
  gold: { team1: number; team2: number };
  duration: number;
  experienceGained: number;
  moraleChange: number;
  fanEngagementChange: number;
  prizePoolShare: number;
  date: Date;
}

export interface GameState {
  currentTeamId: string;
  currentSeason: number;
  currentWeek: number;
  currentDay: number;
  balance: number;
  fanEngagement: number;
  teams: Team[];
  matches: Match[];
  posts: Post[];
}
