 import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminTopbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;