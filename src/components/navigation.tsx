"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBasket,
  IconUser,
  IconToolsKitchen2,
  IconTruck,
  IconLayoutDashboard,
  IconPizza,
  IconCategory,
  IconClipboardList,
  IconPhoto,
  IconSettings,
  IconArrowUpRight,
} from "@tabler/icons-react";

const storeItems = [
  ["/menu", "Меню", IconToolsKitchen2],
  ["/#delivery", "Доставка", IconTruck],
  ["/account", "Профіль", IconUser],
  ["/cart", "Кошик", IconBasket],
] as const;
const adminItems = [
  ["/admin", "Огляд", IconLayoutDashboard],
  ["/admin/products", "Товари", IconPizza],
  ["/admin/categories", "Категорії", IconCategory],
  ["/admin/orders", "Замовлення", IconClipboardList],
  ["/admin/banners", "Банери", IconPhoto],
  ["/admin/settings", "Налаштування", IconSettings],
] as const;

/** Активний розділ і закриття нативного мобільного меню — лише UI-поведінка. */
export function Navigation({ admin = false }: { admin?: boolean }) {
  const pathname = usePathname();
  return (
    <nav
      className={admin ? "admin-nav" : "nav"}
      aria-label={admin ? "Розділи адмінпанелі" : "Навігація магазину"}
    >
      {(admin ? adminItems : storeItems).map(([href, label, Icon]) => {
        const active =
          href === "/admin"
            ? pathname === href
            : !href.includes("#") && pathname.startsWith(href);
        return (
          <Link
            href={href}
            key={href}
            aria-current={active ? "page" : undefined}
            onClick={(event) =>
              event.currentTarget.closest("details")?.removeAttribute("open")
            }
          >
            <Icon size={19} stroke={1.7} aria-hidden="true" />
            <span>{label}</span>
            {href === "/cart" && (
              <span
                className="cart-count"
                aria-label="2 демонстраційні позиції"
              >
                2
              </span>
            )}
          </Link>
        );
      })}
      {admin && (
        <Link href="/">
          <IconArrowUpRight size={19} aria-hidden="true" />
          До магазину
        </Link>
      )}
    </nav>
  );
}
