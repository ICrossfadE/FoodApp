// Перелік сторінок і демонстраційних станів лише для автоматичної QA-перевірки.
export const mockupGroups = [
  {
    id: "store",
    title: "01 · Магазин",
    approval: "WF-01 / WF-02",
    description: "Головна, меню, кошик та оформлення.",
    screens: [
      {
        title: "Головна",
        href: "/",
        states: ["closed", "empty", "error", "loading"],
      },
      {
        title: "Меню",
        href: "/menu",
        states: ["loading", "empty", "category", "error", "closed"],
      },
      {
        title: "Кошик та оформлення",
        href: "/cart",
        states: [
          "empty",
          "guest",
          "returned",
          "price",
          "unavailable",
          "error",
          "unknown",
          "submitting",
          "closed",
          "expired",
          "loading",
          "validation",
        ],
      },
      { title: "Результат оформлення", href: "/order/success", states: [] },
      { title: "Політика конфіденційності", href: "/privacy", states: [] },
    ],
  },
  {
    id: "account",
    title: "02 · Профіль та історія",
    approval: "WF-03",
    description: "Профіль, історія та деталі замовлень.",
    screens: [
      {
        title: "Мій профіль",
        href: "/account",
        states: ["empty", "loading", "error", "expired", "forbidden"],
      },
      {
        title: "Деталі замовлення",
        href: "/account/orders/demo-1042",
        states: [
          "loading",
          "error",
          "missing",
          "forbidden",
          "expired",
          "cancelled",
          "completed",
        ],
      },
    ],
  },
  {
    id: "catalog",
    title: "03 · Керування каталогом",
    approval: "WF-04",
    description: "Товари, категорії, форми та підтвердження дій.",
    screens: [
      {
        title: "Товари",
        href: "/admin/products",
        states: ["empty", "loading", "error", "forbidden"],
      },
      {
        title: "Новий товар",
        href: "/admin/products/new",
        states: ["upload", "validation", "error"],
      },
      {
        title: "Редагування товару",
        href: "/admin/products/01/edit",
        states: ["upload", "validation", "error"],
      },
      {
        title: "Категорії",
        href: "/admin/categories",
        states: ["empty", "loading", "error", "forbidden"],
      },
      { title: "Нова категорія", href: "/admin/categories/new", states: [] },
      {
        title: "Редагування категорії",
        href: "/admin/categories/01/edit",
        states: [],
      },
    ],
  },
  {
    id: "orders",
    title: "04 · Робоче місце оператора",
    approval: "WF-05",
    description: "Список, деталі, статуси, оплата та скасування.",
    screens: [
      {
        title: "Усі замовлення",
        href: "/admin/orders",
        states: ["empty", "loading", "error", "forbidden", "expired"],
      },
      {
        title: "Деталі для оператора",
        href: "/admin/orders/demo-1042",
        states: [
          "conflict",
          "error",
          "missing",
          "forbidden",
          "cancelled",
          "completed",
        ],
      },
    ],
  },
  {
    id: "content",
    title: "05 · Статистика та контент",
    approval: "WF-06",
    description: "Огляд, банери та налаштування ресторану.",
    screens: [
      {
        title: "Огляд ресторану",
        href: "/admin",
        states: ["empty", "loading", "error", "forbidden", "expired"],
      },
      {
        title: "Банери",
        href: "/admin/banners",
        states: ["empty", "loading", "error", "forbidden"],
      },
      {
        title: "Новий банер",
        href: "/admin/banners/new",
        states: ["upload", "validation", "error"],
      },
      {
        title: "Редагування банера",
        href: "/admin/banners/01/edit",
        states: ["upload", "validation", "error"],
      },
      {
        title: "Налаштування ресторану",
        href: "/admin/settings",
        states: ["closed", "validation", "error", "loading", "forbidden"],
      },
    ],
  },
] as const;
