'use client';

import useSWR from 'swr';

const fetcher = (url: string, opts?: RequestInit) => fetch(url, opts).then(async r => {
  const json = await r.json().catch(() => ({}));
  if (!r.ok) throw json;
  return json;
});

export async function getModules(status?: string) {
  const url = status ? `/api/modules?status=${encodeURIComponent(status)}` : '/api/modules';
  return fetcher(url);
}

export async function adminUpdateModule(id: string, data: any) {
  return fetcher(`/api/modules/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

export async function deleteModule(id: string) {
  return fetcher(`/api/modules/${id}`, { method: 'DELETE' });
}
