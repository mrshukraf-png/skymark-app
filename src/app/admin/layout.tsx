import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-page-content">{children}</div>
    </div>
  );
}
