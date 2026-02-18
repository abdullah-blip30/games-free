
import React from 'react';
import GameCard from './GameCard';
// Import the Game interface for consistent typing across the application.
import { Game } from '../types';

// Interface for GameGrid component props.
interface GameGridProps {
  games: Game[];
  favorites: string[];
  onPlay: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  title: string;
}

// Applying the defined interface to the component using React.FC to include standard props like 'key'.
const GameGrid: React.FC<GameGridProps> = ({ games, favorites, onPlay, onToggleFavorite, title }) => {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-semibold text-slate-300 mb-2">No games found</h3>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="font-outfit text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
        {title}
        <span className="text-indigo-500 text-sm font-medium px-2 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">
          {games.length}
        </span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {games.map((game) => (
          // With GameCard properly typed as React.FC, the 'key' property is now correctly recognized.
          <GameCard 
            key={game.id} 
            game={game} 
            isFavorite={favorites.includes(game.id)}
            onPlay={() => onPlay(game)}
            onToggleFavorite={() => onToggleFavorite(game.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
