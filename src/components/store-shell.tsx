import Link from "next/link";
import {
  IconMenu2,
  IconArrowUpRight,
  IconTruck,
  IconLeaf,
} from "@tabler/icons-react";
import { Brand } from "@/components/brand";
import { Navigation } from "@/components/navigation";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-row">
            <Brand />
            <div className="desktop-nav">
              <Navigation />
            </div>
            <span className="header-note">
              <IconLeaf size={18} aria-hidden="true" />
              Свіже. Щодня.
            </span>
          </div>
          <details className="mobile-menu">
            <summary>
              <IconMenu2 size={20} aria-hidden="true" />
              Меню та навігація
            </summary>
            <Navigation />
          </details>
        </div>
      </header>
      <main id="main" className="container" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-intro">
            <Brand />
            <p>
              Трохи турботи.
              <br />
              Багато смаку.
            </p>
          </div>
          <div className="grid-3">
            <div className="stack">
              <h3>До вашого столу</h3>
              <p className="muted">
                Улюблені страви з доставкою додому.
                <br />
                Оберіть смак — про решту подбаємо.
              </p>
              <span className="footer-delivery">
                <IconTruck size={20} aria-hidden="true" />
                Оплата при отриманні
              </span>
            </div>
            <div className="stack">
              <h3>Контакти</h3>
              <p>
                Телефон: буде додано
                <br />
                Адреса: буде додано
                <br />
                Години роботи: буде додано
              </p>
            </div>
            <div className="stack">
              <h3>Завітайте ще</h3>
              <Link href="/menu">
                Наше меню <IconArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/#delivery">Умови доставки</Link>
              <Link href="/privacy">Політика конфіденційності</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <small>
              © 2026 Food app · Демонстраційна версія. Замовлення не
              приймаються.
            </small>
            <Link href="/admin">
              Керування рестораном{" "}
              <IconArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
