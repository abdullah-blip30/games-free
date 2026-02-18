
import React from 'react';

const GamePlayer = ({ game, onClose, isFavorite, onToggleFavorite }) => {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">{game.title}</h2>
            <p className="text-slate-500 text-xs font-medium uppercase">{game.category}</p>
          </div>
        </div>
        <button onClick={onToggleFavorite} className={`px-4 py-2 rounded-xl border transition-all ${isFavorite ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart mr-2`}></i>
          {isFavorite ? 'Saved' : 'Favorite'}
        </button>
      </div>

      <div className="relative flex-1 bg-black rounded-2xl overflow-hidden border border-slate-800 min-h-[60vh]">
        <iframe
          id="game-iframe"
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default GamePlayer;
