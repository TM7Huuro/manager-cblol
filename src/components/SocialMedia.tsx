import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export const SocialMedia: React.FC = () => {
  const gameState = useGameStore();
  const currentTeam = gameState.teams.find(t => t.id === gameState.currentTeamId);
  const [newPost, setNewPost] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'>('POSITIVE');

  if (!currentTeam) return null;

  // Posts de exemplo (NPCs)
  const npcPosts = [
    {
      id: '1',
      author: 'FãoDoTime',
      content: `${currentTeam.name} está jogando muito bem! Vamos para o título! 🔥`,
      sentiment: 'POSITIVE' as const,
      engagement: 1250,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      author: 'CríticoEsportivo',
      content: `Que jogo decepcionante de ${currentTeam.name}. Esperava muito mais.`,
      sentiment: 'NEGATIVE' as const,
      engagement: 856,
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: '3',
      author: 'AnalystaPro',
      content: `A composição de ${currentTeam.name} foi interessante. Vamos ver como se desenvolve.`,
      sentiment: 'NEUTRAL' as const,
      engagement: 432,
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    const colors: Record<string, string> = {
      POSITIVE: 'bg-green-900 border-green-500',
      NEUTRAL: 'bg-slate-700 border-slate-600',
      NEGATIVE: 'bg-red-900 border-red-500',
    };
    return colors[sentiment] || 'bg-slate-700';
  };

  const getSentimentIcon = (sentiment: string) => {
    const icons: Record<string, string> = {
      POSITIVE: '👍',
      NEUTRAL: '😐',
      NEGATIVE: '👎',
    };
    return icons[sentiment] || '❓';
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: Math.random().toString(36).substr(2, 9),
        teamId: currentTeam.id,
        author: 'COACH' as const,
        content: newPost,
        sentiment: selectedSentiment,
        engagement: 0,
        date: new Date(),
        fanEngagementImpact: selectedSentiment === 'POSITIVE' ? 3 : selectedSentiment === 'NEGATIVE' ? -3 : 0,
        teamMoraleImpact: selectedSentiment === 'POSITIVE' ? 2 : selectedSentiment === 'NEGATIVE' ? -2 : 0,
      };

      useGameStore.setState((state) => ({
        posts: [...state.posts, post],
      }));

      setNewPost('');
      setSelectedSentiment('POSITIVE');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-white">Redes Sociais (X/Twitter)</h1>

      {/* Criar Postagem */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Criar Postagem</h3>
        <div className="space-y-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="O que você quer compartilhar com seus fãs?"
            className="w-full bg-slate-700 text-white px-4 py-3 rounded resize-none h-24 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Tom da Postagem</label>
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value as any)}
                className="bg-slate-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="POSITIVE">👍 Positivo</option>
                <option value="NEUTRAL">😐 Neutro</option>
                <option value="NEGATIVE">👎 Negativo</option>
              </select>
            </div>

            <button
              onClick={handlePostSubmit}
              disabled={!newPost.trim()}
              className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-6 rounded transition"
            >
              📤 Postar
            </button>
          </div>

          <div className="bg-slate-700 rounded-lg p-3 text-sm text-gray-300">
            <p>💡 Dica: Postagens positivas aumentam o engajamento e a moral do time!</p>
          </div>
        </div>
      </div>

      {/* Feed de Postagens */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Feed</h3>

        {/* Postagens do Time */}
        {gameState.posts.map((post) => (
          <div key={post.id} className={`rounded-lg p-4 border-2 ${getSentimentColor(post.sentiment)}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-semibold">@{currentTeam.name}</p>
                <p className="text-gray-400 text-sm">
                  {post.date.toLocaleDateString('pt-BR')} {post.date.toLocaleTimeString('pt-BR')}
                </p>
              </div>
              <span className="text-2xl">{getSentimentIcon(post.sentiment)}</span>
            </div>
            <p className="text-white mb-3">{post.content}</p>
            <div className="flex gap-4 text-sm text-gray-300">
              <span>❤️ {post.engagement}</span>
              <span>🔄 {Math.floor(post.engagement * 0.3)}</span>
              <span>💬 {Math.floor(post.engagement * 0.15)}</span>
            </div>
          </div>
        ))}

        {/* Posts de NPCs */}
        <h3 className="text-lg font-bold text-white mt-6">Posts da Comunidade</h3>
        {npcPosts.map((post) => (
          <div key={post.id} className={`rounded-lg p-4 border-2 ${getSentimentColor(post.sentiment)}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-semibold">@{post.author}</p>
                <p className="text-gray-400 text-sm">
                  {post.date.toLocaleDateString('pt-BR')} {post.date.toLocaleTimeString('pt-BR')}
                </p>
              </div>
              <span className="text-2xl">{getSentimentIcon(post.sentiment)}</span>
            </div>
            <p className="text-white mb-3">{post.content}</p>
            <div className="flex gap-4 text-sm text-gray-300">
              <span>❤️ {post.engagement}</span>
              <span>🔄 {Math.floor(post.engagement * 0.3)}</span>
              <span>💬 {Math.floor(post.engagement * 0.15)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Estatísticas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total de Seguidores</p>
            <p className="text-3xl font-bold text-white mt-2">{(currentTeam.fanEngagement * 1000).toLocaleString('pt-BR')}</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Engajamento Médio</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">{Math.round(currentTeam.fanEngagement * 15)}%</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Postagens Totais</p>
            <p className="text-3xl font-bold text-green-400 mt-2">{gameState.posts.length + npcPosts.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
