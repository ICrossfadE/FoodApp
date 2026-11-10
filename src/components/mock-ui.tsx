import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight, IconPlus, IconPhoto } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { products, stateLabels, type MockState } from "@/lib/mock-data";

export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Button
      asChild
      variant={secondary ? "outline" : "default"}
      className="min-h-11 h-auto whitespace-normal text-center"
    >
      <Link href={href}>
        {children}
        <IconArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </Button>
  );
}
export function MockButton({
  children,
  secondary = false,
}: {
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Button
      type="button"
      disabled
      variant={secondary ? "outline" : "default"}
      className="min-h-11 h-auto whitespace-normal text-center"
      title="Демонстраційний елемент. Логіку ще не підключено."
    >
      {children}
    </Button>
  );
}
export function Placeholder({ label = "Фото страви" }: { label?: string }) {
  return (
    <div
      className="placeholder"
      role="img"
      aria-label={`Місце для зображення: ${label}`}
    >
      <IconPhoto size={34} stroke={1.3} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="lead">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function StatePicker({
  base,
  states,
  current,
}: {
  base: string;
  states: MockState[];
  current: MockState;
}) {
  if (current === "default") return null;
  return (
    <details className="state-picker">
      <summary>Варіанти макета: {stateLabels[current]}</summary>
      <nav className="chips" aria-label="Демонстраційні стани">
        {["default" as const, ...states].map((state) => (
          <Link
            key={state}
            className="chip"
            href={`${base}?state=${state}`}
            aria-current={current === state ? "page" : undefined}
          >
            {stateLabels[state]}
          </Link>
        ))}
      </nav>
    </details>
  );
}
export function Notice({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <aside className="notice">
      {title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}
      {children && <p>{children}</p>}
    </aside>
  );
}
export function Empty({
  title,
  description,
  href,
  action = "Повернутися",
  symbol = "—",
}: {
  title: string;
  description: string;
  href?: string;
  action?: string;
  symbol?: string;
}) {
  return (
    <section className="panel empty">
      <div className="empty-symbol" aria-hidden="true">
        {symbol}
      </div>
      <h2>{title}</h2>
      <p className="muted">{description}</p>
      {href && (
        <div className="actions">
          <ActionLink href={href}>{action}</ActionLink>
        </div>
      )}
    </section>
  );
}
// Стани перемикаються URL лише для перегляду. Запитів та справжньої сесії немає.
export function GeneralState({
  state,
  retry,
}: {
  state: MockState;
  retry: string;
}) {
  if (state === "loading")
    return (
      <section
        className="grid-3"
        aria-label="Приклад завантаження"
        aria-busy="true"
      >
        {[1, 2, 3].map((n) => (
          <div className="panel" key={n}>
            <div className="skeleton large" />
            <div className="skeleton" />
            <div className="skeleton" style={{ width: "65%" }} />
            <span className="muted">Завантажуємо…</span>
          </div>
        ))}
      </section>
    );
  const messages: Partial<Record<MockState, [string, string]>> = {
    error: [
      "Не вдалося завантажити",
      "Дані тимчасово недоступні. Тут буде можливість повторити запит.",
    ],
    expired: [
      "Сесію завершено",
      "Щоб продовжити, потрібно знову увійти через Google.",
    ],
    forbidden: [
      "Доступ заборонено",
      "У вас немає дозволу переглядати цю сторінку.",
    ],
    missing: [
      "Замовлення не знайдено",
      "Перевірте посилання або поверніться до списку замовлень.",
    ],
  };
  const message = messages[state];
  return message ? (
    <Empty
      title={message[0]}
      description={message[1]}
      href={retry}
      action="До основного макета"
      symbol="!"
    />
  ) : null;
}
export function ProductCards({
  limit = 6,
  category,
}: {
  limit?: number;
  category?: string;
}) {
  return (
    <div className="grid-3">
      {products
        .filter(
          (p) => !category || category === "Усі" || p.category === category,
        )
        .slice(0, limit)
        .map((p) => (
          <article className="product" key={p.id}>
            <div className="product-image">
              <Image
                src={p.image}
                alt={p.name}
                width={600}
                height={440}
                sizes="(max-width: 560px) 100vw, (max-width: 800px) 50vw, 33vw"
              />
            </div>
            <div className="product-body">
              <small>
                {p.category} · {p.weight}
              </small>
              <h3>{p.name}</h3>
              <p className="muted">{p.description}</p>
              <div className="product-bottom">
                <span className="price">{p.price}</span>
                <MockButton>
                  <IconPlus size={18} aria-hidden="true" />У кошик
                </MockButton>
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
export function Field({
  label,
  placeholder,
  value,
  type = "text",
  hint,
  full = false,
  error,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  type?: string;
  hint?: string;
  full?: boolean;
  error?: string;
}) {
  return (
    <label className={`field${full ? " full" : ""}`}>
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        aria-invalid={error ? true : undefined}
      />
      {hint && <small>{hint}</small>}
      {error && (
        <small>
          <strong>{error}</strong>
        </small>
      )}
    </label>
  );
}
export function Textarea({
  label,
  placeholder,
  value,
  full = false,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  full?: boolean;
}) {
  return (
    <label className={`field${full ? " full" : ""}`}>
      <span>{label}</span>
      <textarea placeholder={placeholder} defaultValue={value} />
    </label>
  );
}
export function Select({
  label,
  options,
  value,
}: {
  label: string;
  options: string[];
  value?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select defaultValue={value ?? options[0]}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
export function Check({
  label,
  checked = false,
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <label className="field check">
      <input type="checkbox" defaultChecked={checked} />
      <span>{label}</span>
    </label>
  );
}
export function Pagination() {
  return (
    <div className="pagination">
      <span className="muted">Приклад: 1–3 із 3 · Сторінка 1</span>
      <div className="actions">
        <MockButton secondary>← Назад</MockButton>
        <MockButton secondary>Далі →</MockButton>
      </div>
    </div>
  );
}
export function Totals() {
  return (
    <div className="totals">
      <div className="row">
        <span>Страви</span>
        <span>440 ₴</span>
      </div>
      <div className="row">
        <span>
          Доставка <small>(приклад)</small>
        </span>
        <span>50 ₴</span>
      </div>
      <div className="row total">
        <span>Разом</span>
        <span>490 ₴</span>
      </div>
      <small>
        Усі суми демонстраційні. Вартість і поріг безкоштовної доставки ще не
        погоджено.
      </small>
    </div>
  );
}
export function OrderItems({ editable = false }: { editable?: boolean }) {
  return (
    <div>
      {products.slice(0, 2).map((p) => (
        <div className="order-line" key={p.id}>
          <Image
            className="order-thumb"
            src={p.image}
            alt=""
            width={80}
            height={80}
          />
          <div>
            <h3>{p.name}</h3>
            <small>
              {p.weight} · {editable ? "" : "1 шт."}
            </small>
            {editable && (
              <>
                <div className="quantity">
                  <button disabled aria-label={`Зменшити кількість: ${p.name}`}>
                    −
                  </button>
                  <span aria-label="Кількість">1</span>
                  <button
                    disabled
                    aria-label={`Збільшити кількість: ${p.name}`}
                  >
                    +
                  </button>
                </div>
                <div>
                  <Button variant="link" disabled className="px-0">
                    Видалити
                  </Button>
                </div>
              </>
            )}
          </div>
          <span className="price">{p.price}</span>
        </div>
      ))}
    </div>
  );
}
