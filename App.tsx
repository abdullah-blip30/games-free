
import React, { useState, useMemo, useEffect } from 'react';
import { GAMES_DATA } from './data/gameData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GameGrid from './components/GameGrid';
import GamePlayer from './components/GamePlayer';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nova_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeGame, setActiveGame] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem('nova_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const game = GAMES_DATA.find(g => g.id === hash);
        if (game) setActiveGame(game);
      } else {
        setActiveGame(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
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
  }, [searchQuery, selectedCategory, favorites]);

  const handlePlayGame = (game: any) => {
    window.location.hash = game.id;
  };

  const handleClosePlayer = () => {
    window.location.hash = '';
  };

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
          <p>© 2024 Nova Gaming Hub. Unblocked entertainment portal.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
