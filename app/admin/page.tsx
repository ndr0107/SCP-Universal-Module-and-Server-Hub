'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const invite = async () => {
    if (!token || !email || !password) return alert('token/email/password required');
    const res = await fetch('/api/auth/invite', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ token, email, password }) });
    const data = await res.json();
    if (res.ok) alert('Admin created'); else alert('Failed: ' + (data.error || ''));
  };

  const login = async () => {
    if (!email || !password) return alert('email/password required');
    const res = await fetch('/api/auth/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    if (res.ok) alert('Logged in'); else {
      const d = await res.json(); alert('Failed: ' + (d.error || ''));
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Create Admin (Invite Token)</h2>
          <input className="w-full p-2 border mb-2" placeholder="Invite token" value={token} onChange={e=>setToken(e.target.value)} />
          <input className="w-full p-2 border mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 border mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={invite}>Create Admin</button>
        </div>
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Login</h2>
          <input className="w-full p-2 border mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 border mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={login}>Login</button>
        </div>
      </div>
    </main>
  );
}
