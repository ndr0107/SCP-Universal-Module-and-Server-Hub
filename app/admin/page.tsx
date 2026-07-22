import AdminPending from '@/src/components/AdminPending';
import AdminApproved from '@/src/components/AdminApproved';
import AdminDenied from '@/src/components/AdminDenied';
import SubmitModuleForm from '@/src/components/SubmitModuleForm';
import CreateServerForm from '@/src/components/CreateServerForm';

export default function AdminPage() {
  return (
    <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-6">
          <AdminPending />
        </div>
        <div className="mb-6">
          <AdminApproved />
        </div>
        <div className="mb-6">
          <AdminDenied />
        </div>
      </section>
      <aside>
        <div className="mb-6">
          <SubmitModuleForm />
        </div>
        <div className="mb-6">
          <CreateServerForm />
        </div>
      </aside>
    </main>
  );
}
