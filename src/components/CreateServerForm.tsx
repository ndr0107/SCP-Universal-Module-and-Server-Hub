'use client';
import { useState } from 'react';
import { createServer } from '@/src/lib/api';

export default function CreateServerForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moduleIds, setModuleIds] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name) return alert('name required');
    setLoading(true);
    try {
      const ids = moduleIds.split(',').map(s=>s.trim()).filter(Boolean);
      await createServer({ name, description, moduleIds: ids });
      alert('Server created');
      setName(''); setDescription(''); setModuleIds('');
    } catch (e:any) {
      console.error(e);
      alert('Create failed: ' + (e.error || ''));
    } finally { setLoading(false); }
  };

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="font-semibold mb-2">Create Server</h3>
      <input className="w-full p-2 border mb-2" placeholder="Server name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Module IDs (comma separated)" value={moduleIds} onChange={e=>setModuleIds(e.target.value)} />
      <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={handleCreate} disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
    </div>
  );
}
