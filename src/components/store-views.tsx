import Image from "next/image";
import {
  IconArrowRight,
  IconLeaf,
  IconPhone,
  IconTruck,
  IconToolsKitchen2,
  IconSparkles,
} from "@tabler/icons-react";

import Link from "next/link";
import {
  ActionLink,
  Empty,
  Field,
  GeneralState,
  MockButton,
  Notice,
  OrderItems,
  PageHeading,
  Pagination,
  ProductCards,
  StatePicker,
  Textarea,
  Totals,
} from "@/components/mock-ui";
import { categories, orders, type MockState } from "@/lib/mock-data";

export function HomeView({ state }: { state: MockState }) {
  return (
    <>
      <StatePicker
        base="/"
        states={["closed", "empty", "error", "loading"]}
        current={state}
      />
      {state === "closed" && (
        <Notice title="Приймання замовлень тимчасово зупинено">
          Меню доступне для перегляду. Чекаємо на вас знову.
        </Notice>
      )}
      {["loading", "error"].includes(state) ? (
        <>
          <h1 className="sr-only">Головна ресторану</h1>
          <GeneralState state={state} retry="/" />
        </>
      ) : (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">
                <IconSparkles size={16} aria-hidden="true" />
                Маленькі радощі щодня
              </p>
              <h1>
                Смачний привід
                <br />
                залишитися <em>вдома.</em>
              </h1>
              <p className="lead">
                Улюблені страви, свіжі інгредієнти й трохи турботи. Обирайте, що
                смакує саме вам.
              </p>
              <div className="actions">
                <ActionLink href="/menu">Обрати щось смачне</ActionLink>
                <a href="#delivery" className="text-link">
                  Як ми доставляємо{" "}
                  <IconArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-trust">
                <span>
                  <IconLeaf size={18} aria-hidden="true" />
                  Свіжі інгредієнти
                </span>
                <span>
                  <IconTruck size={18} aria-hidden="true" />
                  До ваших дверей
                </span>
              </div>
            </div>
            <div className="hero-art">
              <span className="hero-orbit" aria-hidden="true" />
              <Image
                src="/images/pizza.jpg"
                alt="Піца з томатами, сиром і свіжим базиліком — ілюстрація меню"
                width={720}
                height={720}
                priority
                sizes="(max-width: 800px) 90vw, 45vw"
              />
              <div className="hero-stamp">
                <IconToolsKitchen2 size={23} aria-hidden="true" />
                <span>
                  Готуємо
                  <br />
                  <strong>з любов’ю</strong>
                </span>
              </div>
              <span className="hero-caption">Добрий смак. Гарний день.</span>
            </div>
          </section>
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">Улюбленці нашого меню</p>
                <h2>Що смачного сьогодні?</h2>
              </div>
              <Link href="/menu" className="text-link">
                Усе меню <IconArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            {state === "empty" ? (
              <Empty
                title="Рекомендації незабаром"
                description="Готуємо для вас щось особливе."
              />
            ) : (
              <ProductCards limit={3} />
            )}
          </section>
          <section className="delivery-section section" id="delivery">
            <div className="section-head">
              <div>
                <p className="eyebrow">Від нашої кухні до вас</p>
                <h2>
                  Ви відпочиваєте.
                  <br />
                  Ми дбаємо про вечерю.
                </h2>
              </div>
              <p className="muted">
                Три прості кроки
                <br />
                до чогось смачного.
              </p>
            </div>
            <div className="grid-3">
              {[
                [
                  IconToolsKitchen2,
                  "01",
                  "Оберіть улюблене",
                  "Піца, боул чи свіжий салат? У меню знайдеться страва під ваш настрій.",
                ],
                [
                  IconPhone,
                  "02",
                  "Залиште контакти",
                  "Увійдіть через Google, додайте адресу. Оператор зателефонує для підтвердження.",
                ],
                [
                  IconTruck,
                  "03",
                  "Зустрічайте доставку",
                  "Насолоджуйтеся стравами вдома. Оплата — при отриманні.",
                ],
              ].map(([Icon, n, title, text]) => {
                const Mark = Icon as typeof IconTruck;
                return (
                  <article className="panel delivery-card" key={String(n)}>
                    <div className="row">
                      <span className="feature-icon">
                        <Mark size={27} stroke={1.5} aria-hidden="true" />
                      </span>
                      <small>{String(n)}</small>
                    </div>
                    <h3>{String(title)}</h3>
                    <p className="muted">{String(text)}</p>
                  </article>
                );
              })}
            </div>
            <div className="delivery-note">
              <IconTruck size={21} aria-hidden="true" />
              <p>
                Місто, графік і вартість доставки ще уточнюються. У демо
                замовлення не приймаються.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export function MenuView({
  state,
  category,
}: {
  state: MockState;
  category?: string;
}) {
  const selected = categories.find((c) => c === category) ?? "Усі";
  return (
    <>
      <PageHeading
        eyebrow="Свіже до вашого столу"
        title="Меню"
        description="Оберіть те, що смакує сьогодні. Страви й ціни наведені для прикладу."
      />
      <StatePicker
        base="/menu"
        states={["loading", "empty", "category", "error", "closed"]}
        current={state}
      />
      {state === "closed" && (
        <Notice title="Ресторан зараз не приймає замовлення">
          Ви можете переглянути меню. Оформлення буде недоступне.
        </Notice>
      )}
      <nav className="chips" aria-label="Категорії меню">
        {categories.map((c) => (
          <Link
            className="chip"
            href={`/menu?category=${encodeURIComponent(c)}`}
            key={c}
            aria-current={selected === c ? "page" : undefined}
          >
            {c}
          </Link>
        ))}
      </nav>
      {["loading", "error"].includes(state) ? (
        <GeneralState state={state} retry="/menu" />
      ) : ["empty", "category"].includes(state) ? (
        <Empty
          title={
            state === "category"
              ? "У цій категорії ще немає страв"
              : "Меню незабаром з’явиться"
          }
          description="Поверніться пізніше або перегляньте інші категорії."
          href="/menu"
          action="Усі страви"
        />
      ) : (
        <ProductCards category={selected} />
      )}
    </>
  );
}

export function CartView({ state }: { state: MockState }) {
  const general = ["loading", "expired", "forbidden"].includes(state);
  return (
    <>
      <PageHeading
        eyebrow="Ваше замовлення"
        title="Кошик та оформлення"
        description="Перевірте обрані страви та залиште контакти для доставки."
      />
      <StatePicker
        base="/cart"
        states={[
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
        ]}
        current={state}
      />
      {general ? (
        <GeneralState state={state} retry="/cart" />
      ) : state === "empty" ? (
        <Empty
          title="У кошику поки порожньо"
          description="Знайдіть щось смачне в меню."
          href="/menu"
          action="Перейти до меню"
        />
      ) : (
        <div className="split">
          <div className="stack">
            {state === "returned" && (
              <Notice title="Приклад повернення з Google">
                Користувач увійшов, позиції збережено. Це лише макет
                авторизованого стану.
              </Notice>
            )}
            {state === "price" && (
              <Notice title="Ціна однієї зі страв змінилася">
                Приклад: 235 ₴ → 245 ₴. У робочому кошику потрібно буде
                переглянути нову суму та підтвердити її ще раз.
              </Notice>
            )}
            {state === "unavailable" && (
              <Notice title="Одна зі страв більше недоступна">
                Перед продовженням потрібно буде видалити її з кошика.
              </Notice>
            )}
            {state === "closed" && (
              <Notice title="Зараз замовлення не приймаються">
                Поверніться пізніше. Позиції залишаться в кошику.
              </Notice>
            )}
            {state === "error" && (
              <Notice title="Не вдалося оформити замовлення">
                Позиції та введені дані залишаються. Після підключення API тут
                буде безпечний повтор.
              </Notice>
            )}
            {state === "unknown" && (
              <Notice title="Не отримано підтвердження">
                Результат запиту поки невідомий. Тут буде перевірка або повтор
                без дублювання замовлення.
              </Notice>
            )}
            <section className="panel">
              <div className="section-head">
                <h2>Обрані страви</h2>
                <span className="badge">2 позиції</span>
              </div>
              <OrderItems editable />
              <div className="form-actions">
                <Link href="/menu">← Продовжити вибір</Link>
              </div>
            </section>
            <section className="panel stack">
              <h2>Контактні дані</h2>
              {state === "guest" ? (
                <>
                  <p className="muted">
                    Щоб надіслати замовлення, увійдіть через Google. Ваш кошик
                    залишиться з вами.
                  </p>
                  <MockButton>G · Увійти через Google</MockButton>
                </>
              ) : (
                <>
                  <p className="muted">
                    Приклад: Олена Приклад · olena@example.com
                  </p>
                  <div className="form-grid">
                    <Field label="Ім’я *" value="Олена" />
                    <Field
                      label="Телефон *"
                      type="tel"
                      placeholder="Вкажіть номер телефону"
                      error={
                        state === "validation"
                          ? "Вкажіть коректний номер телефону."
                          : undefined
                      }
                    />
                    <Field
                      label="Адреса доставки *"
                      full
                      placeholder="Вулиця, будинок, квартира, під’їзд"
                      error={
                        state === "validation"
                          ? "Вкажіть адресу доставки."
                          : undefined
                      }
                    />
                    <Textarea
                      label="Коментар до замовлення"
                      full
                      placeholder="Необов’язково"
                    />
                  </div>
                  <small>
                    Оплата при отриманні. Оператор зателефонує для
                    підтвердження.
                  </small>
                </>
              )}
            </section>
          </div>
          <aside className="panel stack">
            <h2>Підсумок</h2>
            <Totals />
            <MockButton>
              {state === "submitting"
                ? "Надсилаємо…"
                : state === "price"
                  ? "Підтвердити нову суму"
                  : "Підтвердити замовлення"}
            </MockButton>
            <small>Ця кнопка не працює в мокапі.</small>
            <p>
              <Link href="/privacy">Політика конфіденційності</Link>
            </p>
          </aside>
        </div>
      )}
    </>
  );
}

export function SuccessView() {
  return (
    <>
      <PageHeading
        eyebrow="Приклад результату"
        title="Замовлення отримано"
        description="Це демонстрація екрана успіху. Справжнього замовлення не створено."
      />
      <div className="split">
        <section className="panel stack">
          <span className="badge">Демо · №1042</span>
          <h2>Дякуємо за замовлення</h2>
          <p>Оператор зателефонує для підтвердження деталей.</p>
          <OrderItems />
          <div className="actions">
            <ActionLink href="/account/orders/demo-1042">
              Деталі замовлення
            </ActionLink>
            <ActionLink href="/menu" secondary>
              Повернутися до меню
            </ActionLink>
          </div>
        </section>
        <aside className="panel stack">
          <h2>Доставка</h2>
          <p>
            Олена Приклад
            <br />
            Адреса: демонстраційна адреса
            <br />
            Оплата: при отриманні
          </p>
          <Totals />
        </aside>
      </div>
    </>
  );
}

export function AccountView({ state }: { state: MockState }) {
  const general = ["loading", "error", "expired", "forbidden"].includes(state);
  return (
    <>
      <PageHeading
        eyebrow="Особистий кабінет"
        title="Мій профіль"
        description="Контакти та історія замовлень."
      />
      <StatePicker
        base="/account"
        states={["empty", "loading", "error", "expired", "forbidden"]}
        current={state}
      />
      {general ? (
        <GeneralState state={state} retry="/account" />
      ) : (
        <div className="split">
          <section className="stack">
            <h2>Мої замовлення</h2>
            {state === "empty" ? (
              <Empty
                title="Ви ще нічого не замовляли"
                description="Після першого оформлення замовлення з’явиться тут."
                href="/menu"
                action="Переглянути меню"
              />
            ) : (
              orders
                .filter((o) => o.name === "Олена Приклад")
                .map((o) => (
                  <article className="panel stack" key={o.id}>
                    <div className="row">
                      <h3>Замовлення {o.number}</h3>
                      <span className="badge">{o.status}</span>
                    </div>
                    <small>{o.date} · Київський час</small>
                    <p>Піца Маргарита, боул з овочами</p>
                    <div className="row">
                      <strong>{o.total}</strong>
                      <small>{o.payment}</small>
                    </div>
                    <Link href={`/account/orders/${o.id}`}>
                      Переглянути деталі →
                    </Link>
                  </article>
                ))
            )}
            <Pagination />
          </section>
          <aside className="panel stack">
            <h2>Контактні дані</h2>
            <p>
              <strong>Олена Приклад</strong>
              <br />
              <span className="muted">olena@example.com</span>
            </p>
            <small>Ім’я та email із Google · демонстрація</small>
            <Field
              label="Контактний телефон"
              type="tel"
              placeholder="Додати номер"
            />
            <MockButton>Зберегти телефон</MockButton>
            <MockButton secondary>Вийти з акаунта</MockButton>
          </aside>
        </div>
      )}
    </>
  );
}

export function CustomerOrderView({
  state,
  id,
}: {
  state: MockState;
  id: string;
}) {
  const order = orders.find((o) => o.id === id);
  const effective = order ? state : "missing";
  return (
    <>
      <PageHeading
        eyebrow="Особистий кабінет / замовлення"
        title={`Замовлення ${order?.number ?? "не знайдено"}`}
        action={
          <ActionLink href="/account" secondary>
            ← До історії
          </ActionLink>
        }
      />
      <StatePicker
        base={`/account/orders/${id}`}
        states={[
          "loading",
          "error",
          "missing",
          "forbidden",
          "expired",
          "cancelled",
          "completed",
        ]}
        current={effective}
      />
      {["loading", "error", "missing", "forbidden", "expired"].includes(
        effective,
      ) ? (
        <GeneralState state={effective} retry="/account" />
      ) : (
        <div className="split">
          <section className="panel stack">
            <div className="row">
              <span className="badge">
                {state === "cancelled"
                  ? "Скасовано"
                  : state === "completed" || order?.status === "Завершено"
                    ? "Завершено"
                    : "Готується"}
              </span>
              <small>{order?.date}</small>
            </div>
            {state === "cancelled" && (
              <Notice title="Причина скасування">
                Приклад: адресу не вдалося підтвердити з клієнтом.
              </Notice>
            )}
            <h2>Склад замовлення</h2>
            <OrderItems />
            <h3>Статус замовлення</h3>
            <p className="muted">
              Нове → Підтверджено → Готується → Доставляється → Завершено
            </p>
            <MockButton secondary>Оновити статус</MockButton>
          </section>
          <aside className="panel stack">
            <h2>Дані доставки</h2>
            <p>
              Олена Приклад
              <br />
              Телефон: приклад, не вказано
              <br />
              Адреса: демонстраційна адреса
            </p>
            <p className="muted">Коментар: зателефонуйте перед доставкою.</p>
            <p>
              <strong>Оплата:</strong>{" "}
              {state === "completed" || order?.payment === "Оплачено"
                ? "Оплачено"
                : "Не оплачено"}{" "}
              · при отриманні
            </p>
            <Totals />
          </aside>
        </div>
      )}
    </>
  );
}

export function PrivacyView() {
  return (
    <article className="prose">
      <PageHeading eyebrow="Інформація" title="Політика конфіденційності" />
      <Notice title="Тимчасова структура документа">
        Це не юридичний текст. Погоджений текст і дані власника потрібні перед
        публікацією.
      </Notice>
      {[
        [
          "1. Хто обробляє дані",
          "Тут будуть назва власника ресторану та контакти для звернень.",
        ],
        [
          "2. Які дані потрібні",
          "Ім’я й email Google, контактний телефон, адреса та дані замовлення.",
        ],
        [
          "3. Для чого використовуються дані",
          "Оформлення, підтвердження й доставка замовлення. Остаточні підстави та строки зберігання буде додано.",
        ],
        [
          "4. Як звернутися",
          "Порядок звернення щодо доступу, виправлення й видалення даних буде погоджено з власником.",
        ],
      ].map(([title, text]) => (
        <section key={title}>
          <h2>{title}</h2>
          <p className="muted">{text}</p>
        </section>
      ))}
    </article>
  );
}
