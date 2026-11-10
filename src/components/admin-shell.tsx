import { IconMenu2, IconLeaf } from "@tabler/icons-react";
import { Brand } from "@/components/brand";
import { Navigation } from "@/components/navigation";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="admin-mobile">
        <Brand compact />
        <details>
          <summary>
            <IconMenu2 size={20} aria-hidden="true" />
            Розділи адмінпанелі
          </summary>
          <Navigation admin />
        </details>
      </div>
      <div className="admin-layout">
        <aside className="sidebar">
          <Brand compact />
          <p className="sidebar-label">РОБОЧИЙ ПРОСТІР</p>
          <Navigation admin />
          <div className="sidebar-note">
            <IconLeaf size={26} aria-hidden="true" />
            <strong>Гарний день починається зі смаку.</strong>
            <small>Демо-дані · зміни не зберігаються</small>
          </div>
        </aside>
        <main className="admin-main" id="main" tabIndex={-1}>
          <div className="admin-topbar">
            <span>Ресторан / Робочий простір</span>
            <span className="admin-user">
              <span className="avatar">А</span>Адміністратор{" "}
              <span className="badge">Демо</span>
            </span>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
