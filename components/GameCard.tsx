
import React from 'react';
// Import the Game interface for type safety.
import { Game } from '../types';

// Define the shape of props for the GameCard component.
interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onPlay: () => void;
  onToggleFavorite: () => void;
}

// Add type annotation to the component to allow React-specific props like 'key'.
const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onPlay, onToggleFavorite }) => {
  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all border ${
              isFavorite 
                ? 'bg-red-500 text-white border-red-400' 
                : 'bg-slate-900/60 text-white/70 border-white/10 hover:text-red-400'
            }`}
          >
            <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
          </button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onPlay}
            className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <i className="fa-solid fa-play text-white text-xl ml-1"></i>
          </button>
        </div>
      </div>

      <div className="p-4 cursor-pointer" onClick={onPlay}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-100 truncate group-hover:text-indigo-400">{game.title}</h3>
          <span className="text-yellow-400 text-xs flex items-center gap-1">
            <i className="fa-solid fa-star"></i>{game.rating}
          </span>
        </div>
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
