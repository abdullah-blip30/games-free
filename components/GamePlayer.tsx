
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GamePlayer = ({ game, onClose, isFavorite, onToggleFavorite }) => {
  return html`
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick=${onClose} 
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center"
            title="Back to library"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white leading-tight font-outfit">${game.title}</h2>
            <div className="flex items-center gap-3">
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">${game.category}</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                <i className="fa-solid fa-star"></i>
                <span className="text-slate-400 font-medium">${game.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick=${onToggleFavorite} 
            className=${`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all font-medium text-sm \${
              isFavorite 
                ? 'bg-red-500/10 border-red-500/30 text-red-500' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-red-400'
            }\`}
          >
            <i className=${`fa-\${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
            \${isFavorite ? 'Saved' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      <div className="relative flex-1 bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl min-h-[65vh] group">
        <iframe
          id="game-iframe"
          src=${game.iframeUrl}
          title=${game.title}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-slate-200 font-bold mb-2">Description</h3>
        <p className="text-slate-400 leading-relaxed max-w-3xl">
          \${game.description} Enjoy high-performance gameplay directly in your browser without any downloads. Part of the Nova Unblocked collection.
        </p>
      </div>
    </div>
  `;
};

export default GamePlayer;
