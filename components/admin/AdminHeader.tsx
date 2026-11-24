export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <p className="admin-header-label">
          ADMINISTRATION
        </p>

        <h1>Dashboard</h1>
      </div>

      <div className="admin-user">
        <div className="admin-notification">
          🔔
        </div>

        <div className="admin-avatar">
          S
        </div>

        <div>
          <strong>Shukraf</strong>
          <span>Administrator</span>
        </div>
      </div>
    </header>
  );
}