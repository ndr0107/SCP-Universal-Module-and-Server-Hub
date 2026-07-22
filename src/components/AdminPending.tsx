'use client';
import useSWR from 'swr';
import { useState } from 'react';
import { getModules, adminUpdateModule, deleteModule } from '@/src/lib/api';

const Item = ({ m, onAction }:{ m: any; onAction: () => void }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{m.name}</h3>
          <div className="text-xs text-muted-foreground">by {m.author} • v{m.version}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">{new Date(m.submittedAt).toLocaleDateString()}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{m.description}</p>
      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => onAction()}>Approve</button>
      </div>
    </div>
  );
};

export default function AdminPending() {
  const { data, mutate } = useSWR('/api/modules?status=Pending', () => getModules('Pending'));
  const modules = data?.modules || [];
  const [acting, setActing] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setActing(id);
    try {
      await adminUpdateModule(id, { status: 'Approved' });
      mutate();
      alert('Module approved');
    } catch (e) {
      console.error(e);
      alert('Failed to approve');
    } finally {
      setActing(null);
    }
  };

  const handleDeny = async (id: string) => {
    if (!confirm('Deny this module?')) return;
    setActing(id);
    try {
      await adminUpdateModule(id, { status: 'Denied' });
      mutate();
      alert('Module denied');
    } catch (e) {
      console.error(e);
      alert('Failed to deny');
    } finally {
      setActing(null);
    }
  };

  if (!data) return <div className="p-6">Loading...</div>;
  if (modules.length === 0) return <div className="p-6">No pending modules</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Pending Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m: any) => (
          <div key={m.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{m.name}</h3>
                <div className="text-xs text-muted-foreground">by {m.author} • v{m.version}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{new Date(m.submittedAt).toLocaleDateString()}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{m.description}</p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50" disabled={acting===m.id} onClick={() => handleApprove(m.id)}>Approve</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50" disabled={acting===m.id} onClick={() => handleDeny(m.id)}>Deny</button>
              <button className="px-3 py-1 bg-gray-600 text-white rounded" onClick={async()=>{ if (!confirm('Delete module?')) return; await deleteModule(m.id); mutate(); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
