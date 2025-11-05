import React from 'react';
import { Shield, Search } from 'lucide-react';

const Header = ({ search, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-slate-900">
              Sistem Pendataan Alutsista
            </h1>
            <p className="text-xs text-slate-500">Inventaris dan status kesiapan</p>
          </div>
        </div>
        <div className="ml-auto w-full max-w-md">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama, seri, lokasi..."
              className="block w-full rounded-md border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-0"
            />
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
