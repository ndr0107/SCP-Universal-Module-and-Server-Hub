'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ServersPage() {
  const { data } = useSWR('/api/servers', fetcher);
  const servers = data?.servers || [];
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Servers</h1>
      {servers.length === 0 ? (
        <p className="text-muted-foreground">No servers yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servers.map((s: any) => (
            <div key={s.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
              <div className="text-xs text-muted-foreground mt-2">{s.modules.length} modules</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
