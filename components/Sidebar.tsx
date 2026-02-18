
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const CATEGORIES = [
  { name: 'All', icon: 'fa-gamepad' },
  { name: 'Action', icon: 'fa-bolt' },
  { name: 'Arcade', icon: 'fa-rocket' },
  { name: 'Puzzle', icon: 'fa-brain' },
  { name: 'Sports', icon: 'fa-basketball' },
  { name: 'Retro', icon: 'fa-ghost' },
  { name: 'Favorites', icon: 'fa-heart' },
];

const Sidebar = ({ selected, onSelect }) => {
  return html`
    <nav className="p-4 space-y-6">
      <div className="flex items-center space-x-3 px-2 mb-8">
        <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <i className="fa-solid fa-gamepad text-white text-xl"></i>
        </div>
        <span className="font-outfit font-extrabold text-2xl tracking-tight text-indigo-400">NOVA</span>
      </div>

      <div className="space-y-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-2 mb-2">Navigation</p>
        ${CATEGORIES.map((cat) => html`
          <button
            key=${cat.name}
            onClick=${() => onSelect(cat.name)}
            className=${`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group \${
              selected === cat.name 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }\`}
          >
            <i className=${`fa-solid \${cat.icon} w-5 text-center \${
              selected === cat.name ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
            }\`}></i>
            <span className="font-medium">${cat.name}</span>
          </button>
        `)}
      </div>
    </nav>
  `;
};

export default Sidebar;
