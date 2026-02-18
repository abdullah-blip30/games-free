
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GameGrid from './components/GameGrid';
import GamePlayer from './components/GamePlayer';
import { Game } from './types';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nova_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Failed to load games');
        const data = await response.json();
        setGames(data);
      } catch (err) {
        console.error("Error loading games JSON:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    localStorage.setItem('nova_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && games.length > 0) {
        const game = games.find(g => g.id === hash);
        if (game) setActiveGame(game);
      } else if (!hash) {
        setActiveGame(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [games]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = true;
      if (selectedCategory === 'Favorites') {
        matchesCategory = favorites.includes(game.id);
      } else if (selectedCategory !== 'All') {
        matchesCategory = game.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory, favorites]);

  const handlePlayGame = (game: Game) => {
    window.location.hash = game.id;
  };

  const handleClosePlayer = () => {
    window.location.hash = '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Initializing Nova Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      <div className="hidden md:block w-64 border-r border-slate-800 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <Sidebar 
          selected={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
      </div>

      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          searchQuery={searchQuery} 
          onSearch={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="p-6 md:p-8 flex-1">
          {activeGame ? (
            <GamePlayer 
              game={activeGame} 
              onClose={handleClosePlayer}
              isFavorite={favorites.includes(activeGame.id)}
              onToggleFavorite={() => toggleFavorite(activeGame.id)}
            />
          ) : (
            <GameGrid 
              games={filteredGames} 
              favorites={favorites}
              onPlay={handlePlayGame}
              onToggleFavorite={toggleFavorite}
              title={selectedCategory === 'All' ? 'Discover Games' : `${selectedCategory} Games`}
            />
          )}
        </div>

        <footer className="p-6 border-t border-slate-800 text-slate-500 text-sm text-center">
          <p>© 2024 Nova Gaming Hub. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
