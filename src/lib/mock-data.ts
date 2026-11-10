// Лише приклади для верстки v0.1. Не контракт API і не робочий каталог.
export const products = [
  {
    id: "01",
    image: "/images/pizza.jpg",
    name: "Піца Маргарита",
    category: "Піца",
    description: "Томатний соус, моцарела та базилік.",
    weight: "420 г",
    price: "245 ₴",
  },
  {
    id: "02",
    image: "/images/bowl.jpg",
    name: "Боул з овочами",
    category: "Основні страви",
    description: "Свіжі овочі, нут, авокадо та зелень.",
    weight: "350 г",
    price: "195 ₴",
  },
  {
    id: "03",
    image: "/images/salad.jpg",
    name: "Салат з овочами",
    category: "Салати",
    description: "Листя салату, свіжі овочі й заправка.",
    weight: "280 г",
    price: "185 ₴",
  },
  {
    id: "04",
    image: "/images/mushroom-pizza.jpg",
    name: "Піца з грибами та сиром",
    category: "Піца",
    description: "Печериці, моцарела, вершковий соус.",
    weight: "440 г",
    price: "265 ₴",
  },
  {
    id: "05",
    image: "/images/potatoes.jpg",
    name: "Картопля фрі",
    category: "Основні страви",
    description: "Золотиста хрустка картопля.",
    weight: "200 г",
    price: "95 ₴",
  },
  {
    id: "06",
    image: "/images/lemonade.jpg",
    name: "Домашній лимонад",
    category: "Напої",
    description: "Приклад сезонного напою.",
    weight: "300 г",
    price: "75 ₴",
  },
] as const;

export const categories = [
  "Усі",
  "Піца",
  "Основні страви",
  "Салати",
  "Напої",
] as const;
export const orders = [
  {
    id: "demo-1042",
    number: "#1042",
    date: "10.11.2026 · 13:45",
    name: "Олена Приклад",
    total: "490 ₴",
    status: "Готується",
    payment: "Не оплачено",
  },
  {
    id: "demo-1041",
    number: "#1041",
    date: "10.11.2026 · 12:20",
    name: "Тарас Приклад",
    total: "490 ₴",
    status: "Нове",
    payment: "Не оплачено",
  },
  {
    id: "demo-1038",
    number: "#1038",
    date: "09.11.2026 · 18:10",
    name: "Олена Приклад",
    total: "490 ₴",
    status: "Завершено",
    payment: "Оплачено",
  },
] as const;

export const adminLinks = [
  ["/admin", "Огляд", "01"],
  ["/admin/products", "Товари", "02"],
  ["/admin/categories", "Категорії", "03"],
  ["/admin/orders", "Замовлення", "04"],
  ["/admin/banners", "Банери", "05"],
  ["/admin/settings", "Налаштування", "06"],
] as const;

export const stateLabels = {
  default: "Основний вигляд",
  loading: "Завантаження",
  empty: "Порожньо",
  error: "Помилка",
  category: "Порожня категорія",
  guest: "До входу Google",
  returned: "Повернення з Google",
  price: "Ціна змінилася",
  unavailable: "Товар недоступний",
  submitting: "Надсилання",
  unknown: "Результат невідомий",
  closed: "Замовлення зупинено",
  expired: "Сесію завершено",
  forbidden: "Доступ заборонено",
  missing: "Не знайдено",
  upload: "Помилка фото",
  conflict: "Конфлікт змін",
  validation: "Помилки форми",
  cancelled: "Скасовано",
  completed: "Завершено",
} as const;
export type MockState = keyof typeof stateLabels;
export type Search = Promise<{ state?: string; category?: string }>;

export function mockState(value?: string): MockState {
  return value && value in stateLabels ? (value as MockState) : "default";
}
