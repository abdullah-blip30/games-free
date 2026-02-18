
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GameGrid from './components/GameGrid';
import GamePlayer from './components/GamePlayer';
import { Game } from './types';

const App = () => {
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
        // Use a relative path that works on GitHub Pages subdirectories
        const response = await fetch('games.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGames(data);
      } catch (err) {
        console.error("Failed to load games.json. Ensure the file is in the root directory.", err);
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

  if (loading) return null; // Let the index.html loader show until React is ready

  // Use JSX directly to resolve "Cannot find name 'div'" and other TS errors
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      <div className="hidden md:block w-64 border-r border-slate-800 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <Sidebar selected={selectedCategory} onSelect={setSelectedCategory} />
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
              onClose={() => { window.location.hash = ''; }}
              isFavorite={favorites.includes(activeGame.id)}
              onToggleFavorite={() => toggleFavorite(activeGame.id)}
            />
          ) : (
            <GameGrid 
              games={filteredGames} 
              favorites={favorites}
              onPlay={(game) => { window.location.hash = game.id; }}
              onToggleFavorite={toggleFavorite}
              title={selectedCategory === 'All' ? 'Discover Games' : `${selectedCategory} Games`}
            />
          )}
        </div>

        <footer className="p-6 border-t border-slate-800 text-slate-500 text-sm text-center">
          <p>© 2024 Nova Gaming Hub. Fast, Unblocked, Web-based.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
