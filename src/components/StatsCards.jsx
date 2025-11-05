import React, { useMemo } from 'react';
import { CheckCircle, Wrench, XCircle } from 'lucide-react';

const Stat = ({ icon: Icon, label, value, color }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`grid h-10 w-10 place-items-center rounded-lg ${color} text-white`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-xl font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  </div>
);

const StatsCards = ({ items }) => {
  const { total, operasional, perawatan, nonaktif } = useMemo(() => {
    const t = items.length;
    const o = items.filter((i) => i.status === 'Operasional').length;
    const p = items.filter((i) => i.status === 'Perawatan').length;
    const n = items.filter((i) => i.status === 'Non-aktif').length;
    return { total: t, operasional: o, perawatan: p, nonaktif: n };
  }, [items]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-slate-500">Total Alutsista</div>
        <div className="mt-1 text-2xl font-semibold text-slate-900">{total}</div>
      </div>
      <Stat icon={CheckCircle} label="Operasional" value={operasional} color="bg-emerald-600" />
      <Stat icon={Wrench} label="Perawatan" value={perawatan} color="bg-amber-600" />
      <Stat icon={XCircle} label="Non-aktif" value={nonaktif} color="bg-rose-600" />
    </div>
  );
};

export default StatsCards;
