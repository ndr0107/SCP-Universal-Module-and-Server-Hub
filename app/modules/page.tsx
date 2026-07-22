'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ModulesPage() {
  const { data, error } = useSWR('/api/modules', fetcher);
  const modules = data?.modules || [];
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modules</h1>
      {modules.length === 0 ? (
        <p className="text-muted-foreground">No modules yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m: any) => (
            <div key={m.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.description}</p>
              <div className="text-xs text-muted-foreground mt-2">by {m.author} • v{m.version}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
