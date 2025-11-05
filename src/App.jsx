import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import StatsCards from './components/StatsCards.jsx';
import EquipmentForm from './components/EquipmentForm.jsx';
import EquipmentTable from './components/EquipmentTable.jsx';

const seed = [
  {
    id: '1',
    name: 'Panser Anoa',
    branch: 'TNI AD',
    category: 'Kendaraan',
    status: 'Operasional',
    serial: 'ANO-2019-014',
    year: 2019,
    location: 'Yon Kav 7',
    notes: 'Siap operasi',
  },
  {
    id: '2',
    name: 'KCR-60M',
    branch: 'TNI AL',
    category: 'Kendaraan',
    status: 'Perawatan',
    serial: 'KCR-60-07',
    year: 2018,
    location: 'Lantamal V',
    notes: 'Docking tahunan',
  },
  {
    id: '3',
    name: 'Radar GCI',
    branch: 'TNI AU',
    category: 'Elektronik',
    status: 'Operasional',
    serial: 'GCI-2020-332',
    year: 2020,
    location: 'Satrad 221',
    notes: 'Kalibrasi Mei',
  },
  {
    id: '4',
    name: 'Meriam Howitzer',
    branch: 'TNI AD',
    category: 'Senjata',
    status: 'Non-aktif',
    serial: 'HOW-1998-002',
    year: 1998,
    location: 'Gudang Pusbekang',
    notes: 'Menunggu pemusnahan',
  },
];

function App() {
  const [items, setItems] = useState(seed);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ branch: 'Semua', status: 'Semua', category: 'Semua' });
  const [sort, setSort] = useState({ key: '', direction: 'asc' });

  const addItem = (data) => {
    setItems((prev) => [data, ...prev]);
  };

  const globallyFiltered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.serial || '').toLowerCase().includes(q) ||
        (i.location || '').toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header search={search} onSearchChange={setSearch} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          <StatsCards items={globallyFiltered} />

          <EquipmentForm onAdd={addItem} />

          <EquipmentTable
            items={globallyFiltered}
            filters={filters}
            onFiltersChange={setFilters}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Sistem Pendataan Alutsista
        </div>
      </footer>
    </div>
  );
}

export default App;
