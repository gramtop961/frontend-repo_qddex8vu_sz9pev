import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const initialForm = {
  name: '',
  branch: 'TNI AD',
  category: 'Kendaraan',
  status: 'Operasional',
  serial: '',
  year: '',
  location: '',
  notes: '',
};

const EquipmentForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const payload = {
      ...form,
      id: crypto.randomUUID(),
      year: form.year ? Number(form.year) : undefined,
      createdAt: new Date().toISOString(),
    };
    onAdd(payload);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-medium text-slate-900">Tambah Alutsista</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-xs font-medium text-slate-600">Nama</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Contoh: Panser Anoa"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Matriks</label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option>TNI AD</option>
            <option>TNI AL</option>
            <option>TNI AU</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Kategori</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option>Kendaraan</option>
            <option>Senjata</option>
            <option>Elektronik</option>
            <option>Lainnya</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option>Operasional</option>
            <option>Perawatan</option>
            <option>Non-aktif</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Nomor Seri</label>
          <input
            name="serial"
            value={form.serial}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Misal: ANO-2021-001"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Tahun</label>
          <input
            name="year"
            type="number"
            min="1950"
            max={new Date().getFullYear()}
            value={form.year}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="2022"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs font-medium text-slate-600">Lokasi</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Batalyon / Dermaga / Skadron"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-xs font-medium text-slate-600">Catatan</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={2}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Keterangan tambahan"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 active:scale-[.99]"
        >
          <Plus className="h-4 w-4" /> Tambah
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
