'use client';
import { useState } from 'react';
import { submitModule } from '@/src/lib/api';

export default function SubmitModuleForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !description || !author) return alert('name/description/author required');
    setLoading(true);
    try {
      await submitModule({ name, description, author, version });
      alert('Module submitted');
      setName(''); setDescription(''); setAuthor(''); setVersion('1.0.0');
    } catch (e:any) {
      console.error(e);
      alert('Submit failed: ' + (e.error || ''));
    } finally { setLoading(false); }
  };

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="font-semibold mb-2">Submit a Module</h3>
      <input className="w-full p-2 border mb-2" placeholder="Module name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Version" value={version} onChange={e=>setVersion(e.target.value)} />
      <textarea className="w-full p-2 border mb-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
    </div>
  );
}
