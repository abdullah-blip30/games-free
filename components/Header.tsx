
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const CATEGORIES = ['All', 'Action', 'Arcade', 'Puzzle', 'Sports', 'Retro', 'Favorites'];

const Header = ({ searchQuery, onSearch, selectedCategory, onSelectCategory }) => {
  return html`
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex md:hidden items-center space-x-2">
          <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-gamepad text-white text-sm"></i>
          </div>
          <span className="font-outfit font-extrabold text-lg tracking-tight text-indigo-400">NOVA</span>
        </div>

        <div className="relative flex-1 max-w-xl">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input
            type="text"
            placeholder="Search for games..."
            value=${searchQuery}
            onChange=${(e) => onSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-full py-2.5 pl-12 pr-6 text-slate-100 outline-none transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
          <img 
            src="https://picsum.photos/id/64/100/100" 
            alt="Profile" 
            className="w-full h-full rounded-full border-2 border-slate-950 object-cover" 
          />
        </div>
      </div>

      <div className="flex md:hidden overflow-x-auto gap-2 pb-1 no-scrollbar">
        ${CATEGORIES.map(cat => html`
          <button
            key=${cat}
            onClick=${() => onSelectCategory(cat)}
            className=${`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all \${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }\`}
          >
            ${cat}
          </button>
        `)}
      </div>
    </header>
  `;
};

export default Header;
