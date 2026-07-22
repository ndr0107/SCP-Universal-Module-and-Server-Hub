'use client';

import useSWR from 'swr';
import { getModules, adminUpdateModule, deleteModule } from '@/src/lib/api';

export default function AdminDenied() {
  const { data, mutate } = useSWR('/api/modules?status=Denied', () => getModules('Denied'));
  const modules = data?.modules || [];

  if (!data) return <div className="p-6">Loading...</div>;
  if (modules.length === 0) return <div className="p-6">No denied modules</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Denied Modules</h2>
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
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={async()=>{ if(!confirm('Re-approve this module?')) return; await adminUpdateModule(m.id,{status:'Approved'}); mutate(); }}>Re-Approve</button>
              <button className="px-3 py-1 bg-gray-600 text-white rounded" onClick={async()=>{ if(!confirm('Delete module?')) return; await deleteModule(m.id); mutate(); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
