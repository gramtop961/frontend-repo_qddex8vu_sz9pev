import React, { useMemo, useState } from 'react';

const headers = [
  { key: 'name', label: 'Nama' },
  { key: 'branch', label: 'Matriks' },
  { key: 'category', label: 'Kategori' },
  { key: 'status', label: 'Status' },
  { key: 'serial', label: 'No. Seri' },
  { key: 'year', label: 'Tahun' },
  { key: 'location', label: 'Lokasi' },
];

const StatusBadge = ({ status }) => {
  const map = {
    Operasional: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    Perawatan: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    'Non-aktif': 'bg-rose-50 text-rose-700 ring-rose-600/20',
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[status]}`}>
      {status}
    </span>
  );
};

const EquipmentTable = ({ items, filters, onFiltersChange, onSortChange, sort }) => {
  const [localSearch, setLocalSearch] = useState('');

  const filtered = useMemo(() => {
    let data = items;
    if (filters.branch && filters.branch !== 'Semua') {
      data = data.filter((i) => i.branch === filters.branch);
    }
    if (filters.status && filters.status !== 'Semua') {
      data = data.filter((i) => i.status === filters.status);
    }
    if (filters.category && filters.category !== 'Semua') {
      data = data.filter((i) => i.category === filters.category);
    }
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      data = data.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.serial || '').toLowerCase().includes(q) ||
          (i.location || '').toLowerCase().includes(q)
      );
    }
    return data;
  }, [items, filters, localSearch]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const data = [...filtered];
    data.sort((a, b) => {
      const va = a[sort.key] ?? '';
      const vb = b[sort.key] ?? '';
      if (typeof va === 'number' && typeof vb === 'number') {
        return sort.direction === 'asc' ? va - vb : vb - va;
      }
      return sort.direction === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return data;
  }, [filtered, sort]);

  const handleHeaderClick = (key) => {
    if (sort.key === key) {
      const dir = sort.direction === 'asc' ? 'desc' : 'asc';
      onSortChange({ key, direction: dir });
    } else {
      onSortChange({ key, direction: 'asc' });
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filters.branch}
            onChange={(e) => onFiltersChange({ ...filters, branch: e.target.value })}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option>Semua</option>
            <option>TNI AD</option>
            <option>TNI AL</option>
            <option>TNI AU</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option>Semua</option>
            <option>Operasional</option>
            <option>Perawatan</option>
            <option>Non-aktif</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option>Semua</option>
            <option>Kendaraan</option>
            <option>Senjata</option>
            <option>Elektronik</option>
            <option>Lainnya</option>
          </select>
        </div>
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Cari di tabel..."
          className="w-full max-w-xs rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((h) => (
                <th
                  key={h.key}
                  onClick={() => handleHeaderClick(h.key)}
                  className="cursor-pointer px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  <div className="flex items-center gap-1">
                    {h.label}
                    {sort.key === h.key && (
                      <span className="text-slate-400">{sort.direction === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-900">{item.name}</td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-700">{item.branch}</td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-700">{item.category}</td>
                <td className="whitespace-nowrap px-3 py-2 text-sm"><StatusBadge status={item.status} /></td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-700">{item.serial || '-'}</td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-700">{item.year || '-'}</td>
                <td className="px-3 py-2 text-sm text-slate-700">{item.location || '-'}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-3 py-10 text-center text-sm text-slate-500">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentTable;
