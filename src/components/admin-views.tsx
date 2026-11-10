import { ConfirmAction } from "@/components/confirm-action";
import Link from "next/link";
import {
  ActionLink,
  Check,
  Empty,
  Field,
  GeneralState,
  MockButton,
  Notice,
  OrderItems,
  PageHeading,
  Pagination,
  Placeholder,
  Select,
  StatePicker,
  Textarea,
  Totals,
} from "@/components/mock-ui";
import { categories, orders, products, type MockState } from "@/lib/mock-data";

const generalStates = ["loading", "error", "forbidden", "expired"];

export function DashboardView({ state }: { state: MockState }) {
  return (
    <>
      <PageHeading
        eyebrow="Робочий простір"
        title="Огляд ресторану"
        description="Ключові показники за обраний період. Усі значення — приклади."
      />
      <StatePicker
        base="/admin"
        states={["empty", "loading", "error", "forbidden", "expired"]}
        current={state}
      />
      {generalStates.includes(state) ? (
        <GeneralState state={state} retry="/admin" />
      ) : (
        <>
          <section className="panel">
            <div className="filters">
              <Select
                label="Період"
                options={[
                  "Останні 30 днів",
                  "Сьогодні",
                  "7 днів",
                  "Довільний період",
                ]}
              />
              <Field label="Від" type="date" value="2026-10-12" />
              <Field label="До" type="date" value="2026-11-10" />
            </div>
            <small>
              Часовий пояс: Europe/Kyiv. Фільтри демонстраційні, показники не
              перераховуються.
            </small>
          </section>
          <section className="stats section" aria-label="Ключові показники">
            {[
              [
                "Виручка",
                "24 600 ₴",
                "Завершені й оплачені замовлення, включно з доставкою; за датою оплати.",
              ],
              [
                "Замовлення",
                "64",
                "Створені за період. Завершено: 48 · Скасовано: 4.",
              ],
              [
                "Найпопулярніший товар",
                "Маргарита",
                "32 одиниці у завершених оплачених замовленнях за датою оплати.",
              ],
              [
                "Найменш популярний",
                "Лимонад",
                "0 одиниць. Серед доступних товарів меню; включає нульові продажі.",
              ],
            ].map(([label, value, hint], i) => (
              <article className="panel" key={label}>
                <p className="muted">{label}</p>
                <p className="stat-value">
                  {state === "empty"
                    ? i < 2
                      ? "0"
                      : "Ще немає продажів"
                    : value}
                </p>
                <small>{hint}</small>
              </article>
            ))}
          </section>
          <section className="section">
            <div className="section-head">
              <h2>Останні замовлення</h2>
              <Link href="/admin/orders">Усі замовлення →</Link>
            </div>
            {state === "empty" ? (
              <Empty
                title="Замовлень ще немає"
                description="Нові замовлення з’являться тут після оформлення клієнтами."
              />
            ) : (
              <OrdersTable />
            )}
          </section>
        </>
      )}
    </>
  );
}

export function ProductsView({ state }: { state: MockState }) {
  return (
    <>
      <PageHeading
        eyebrow="Каталог"
        title="Товари"
        description="Страви, ціни, доступність та рекомендації."
        action={
          <ActionLink href="/admin/products/new">+ Новий товар</ActionLink>
        }
      />
      <StatePicker
        base="/admin/products"
        states={["empty", "loading", "error", "forbidden"]}
        current={state}
      />
      {generalStates.includes(state) ? (
        <GeneralState state={state} retry="/admin/products" />
      ) : (
        <>
          <div className="filters">
            <Field label="Пошук за назвою" placeholder="Назва страви" />
            <Select
              label="Категорія"
              options={["Усі категорії", ...categories.slice(1)]}
            />
            <Select
              label="Доступність"
              options={["Усі товари", "Активні", "Неактивні", "Архівовані"]}
            />
          </div>
          {state === "empty" ? (
            <Empty
              title="Товари не знайдено"
              description="Додайте першу страву або змініть фільтри."
              href="/admin/products/new"
              action="Новий товар"
            />
          ) : (
            <div className="table-wrap">
              <table>
                <caption className="sr-only">
                  Демонстраційний каталог товарів
                </caption>
                <thead>
                  <tr>
                    {["Товар", "Категорія", "Ціна / вага", "Статус", "Дії"].map(
                      (h) => (
                        <th scope="col" key={h}>
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 3).map((p, i) => (
                    <tr key={p.id}>
                      <td data-label="Товар">
                        <div>
                          <strong>{p.name}</strong>
                          <small>
                            {i === 0
                              ? "Рекомендовано · порядок 1"
                              : `Порядок ${i + 1}`}
                          </small>
                        </div>
                      </td>
                      <td data-label="Категорія">{p.category}</td>
                      <td data-label="Ціна / вага">
                        {p.price} / {p.weight}
                      </td>
                      <td data-label="Статус">
                        <span className="badge">
                          {i === 2 ? "Неактивний" : "Активний"}
                        </span>
                      </td>
                      <td data-label="Дії">
                        <div className="table-actions">
                          <Link href={`/admin/products/${p.id}/edit`}>
                            Редагувати
                          </Link>
                          <ConfirmAction kind="product" name={p.name} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination />
        </>
      )}
    </>
  );
}

export function ProductFormView({
  state,
  editing,
  productId = "01",
}: {
  state: MockState;
  editing: boolean;
  productId?: string;
}) {
  const product = products.find((p) => p.id === productId) ?? products[0];
  const base = editing
    ? `/admin/products/${product.id}/edit`
    : "/admin/products/new";
  return (
    <>
      <PageHeading
        eyebrow="Каталог / товари"
        title={editing ? "Редагування товару" : "Новий товар"}
        action={
          <ActionLink href="/admin/products" secondary>
            ← До товарів
          </ActionLink>
        }
      />
      <StatePicker
        base={base}
        states={["upload", "validation", "error"]}
        current={state}
      />
      <div className="split">
        <section className="panel stack">
          <h2>Основна інформація</h2>
          {state === "error" && (
            <Notice title="Не вдалося зберегти">
              У робочій формі введені значення залишаться для повторної спроби.
            </Notice>
          )}
          <div className="form-grid">
            <Field
              label="Назва *"
              full
              value={editing ? product.name : undefined}
              placeholder="Назва страви"
              error={state === "validation" ? "Назва обов’язкова." : undefined}
            />
            <Textarea
              label="Опис *"
              full
              value={editing ? product.description : undefined}
              placeholder="Склад і короткий опис"
            />
            <Field
              label="Ціна, ₴ *"
              type="number"
              value={editing ? product.price.replace(/[^0-9]/g, "") : undefined}
              placeholder="0"
              error={
                state === "validation"
                  ? "Ціна має бути більшою за нуль."
                  : undefined
              }
            />
            <Field
              label="Вага, г *"
              type="number"
              value={
                editing ? product.weight.replace(/[^0-9]/g, "") : undefined
              }
              placeholder="0"
            />
            <Select
              label="Категорія *"
              options={[...categories.slice(1)]}
              value={editing ? product.category : undefined}
            />
            <Field label="Порядок" type="number" value="1" />
          </div>
          <Check label="Активний товар" checked={product.id !== "03"} />
          <Check
            label="Рекомендувати на головній"
            checked={editing && product.id === "01"}
          />
          <div className="form-actions">
            <MockButton>Зберегти товар</MockButton>
            <ActionLink href="/admin/products" secondary>
              Скасувати
            </ActionLink>
          </div>
        </section>
        <aside className="panel stack">
          <h2>Фото товару</h2>
          <Placeholder />
          {state === "upload" && (
            <Notice title="Фото не завантажено">
              Приклад: файл завеликий або має непідтримуваний формат. Поточне
              фото залишається.
            </Notice>
          )}
          <MockButton secondary>Обрати зображення</MockButton>
          <small>
            Обмеження типу й розміру визначимо під час інтеграції медіа. У
            мокапі файли не завантажуються.
          </small>
          <Field
            label="Альтернативний опис фото"
            placeholder="Що зображено на фото"
          />
        </aside>
      </div>
    </>
  );
}

export function CategoriesView({ state }: { state: MockState }) {
  return (
    <>
      <PageHeading
        eyebrow="Каталог"
        title="Категорії"
        description="Групування страв і порядок у меню."
        action={
          <ActionLink href="/admin/categories/new">+ Нова категорія</ActionLink>
        }
      />
      <StatePicker
        base="/admin/categories"
        states={["empty", "loading", "error", "forbidden"]}
        current={state}
      />
      {generalStates.includes(state) ? (
        <GeneralState state={state} retry="/admin/categories" />
      ) : state === "empty" ? (
        <Empty
          title="Категорій ще немає"
          description="Створіть першу категорію для меню."
          href="/admin/categories/new"
          action="Нова категорія"
        />
      ) : (
        <>
          <div className="table-wrap">
            <table>
              <caption className="sr-only">Категорії меню</caption>
              <thead>
                <tr>
                  {["Назва", "Товарів", "Статус", "Порядок", "Дії"].map((h) => (
                    <th scope="col" key={h}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.slice(1).map((c, i) => (
                  <tr key={c}>
                    <td data-label="Назва">
                      <strong>{c}</strong>
                    </td>
                    <td data-label="Товарів">{i === 3 ? "0" : "2"}</td>
                    <td data-label="Статус">
                      <span className="badge">Активна</span>
                    </td>
                    <td data-label="Порядок">
                      <div className="table-actions">
                        <span>{i + 1}</span>
                        <MockButton secondary>↑</MockButton>
                        <MockButton secondary>↓</MockButton>
                      </div>
                    </td>
                    <td data-label="Дії">
                      <div className="table-actions">
                        <Link
                          href={`/admin/categories/${String(i + 1).padStart(2, "0")}/edit`}
                        >
                          Редагувати
                        </Link>
                        <ConfirmAction
                          kind="category"
                          name={c}
                          occupied={i !== 3}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="section">
            <Notice title="Категорія з товарами">
              Фізичне видалення буде недоступне, доки товари не перенесено.
              Неактивна категорія приховує свої товари з меню.
            </Notice>
          </div>
        </>
      )}
    </>
  );
}

export function CategoryFormView({
  editing,
  categoryId = "01",
}: {
  editing: boolean;
  categoryId?: string;
}) {
  const category = categories[Number(categoryId)] ?? categories[1];
  return (
    <>
      <PageHeading
        eyebrow="Каталог / категорії"
        title={editing ? "Редагування категорії" : "Нова категорія"}
      />
      <section className="panel stack prose">
        <div className="form-grid">
          <Field
            label="Назва *"
            value={editing ? category : undefined}
            placeholder="Наприклад, основні страви"
          />
          <Field label="Порядок" type="number" value="1" />
        </div>
        <Check label="Категорія активна" checked />
        <Notice>
          Вимкнення категорії зробить її товари недоступними для нових
          замовлень.
        </Notice>
        <div className="form-actions">
          <MockButton>Зберегти категорію</MockButton>
          <ActionLink href="/admin/categories" secondary>
            Скасувати
          </ActionLink>
        </div>
      </section>
    </>
  );
}

export function OrdersTable() {
  return (
    <div className="table-wrap">
      <table>
        <caption className="sr-only">Демонстраційні замовлення</caption>
        <thead>
          <tr>
            {["Замовлення", "Клієнт", "Сума", "Виконання", "Оплата"].map(
              (h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td data-label="Замовлення">
                <div>
                  <Link href={`/admin/orders/${o.id}`}>{o.number} →</Link>
                  <br />
                  <small>{o.date}</small>
                </div>
              </td>
              <td data-label="Клієнт">
                <div>
                  <strong>{o.name}</strong>
                  <small>Телефон: приклад</small>
                </div>
              </td>
              <td data-label="Сума">{o.total}</td>
              <td data-label="Виконання">
                <span className="badge">{o.status}</span>
              </td>
              <td data-label="Оплата">{o.payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function OrdersView({ state }: { state: MockState }) {
  return (
    <>
      <PageHeading
        eyebrow="Операційна робота"
        title="Замовлення"
        description="Нові замовлення першими. Усі записи — демонстраційні."
        action={<MockButton secondary>Оновити список</MockButton>}
      />
      <StatePicker
        base="/admin/orders"
        states={["empty", "loading", "error", "forbidden", "expired"]}
        current={state}
      />
      {generalStates.includes(state) ? (
        <GeneralState state={state} retry="/admin/orders" />
      ) : (
        <>
          <div className="filters">
            <Field label="Номер або телефон" placeholder="Пошук замовлення" />
            <Select
              label="Статус виконання"
              options={[
                "Усі статуси",
                "Нове",
                "Підтверджено",
                "Готується",
                "Доставляється",
                "Завершено",
                "Скасовано",
              ]}
            />
            <Select
              label="Статус оплати"
              options={["Усі", "Не оплачено", "Оплачено"]}
            />
            <Field label="Дата від" type="date" />
            <Field label="Дата до" type="date" />
          </div>
          {state === "empty" ? (
            <Empty
              title="Замовлень не знайдено"
              description="Спробуйте інший період або змініть фільтри."
            />
          ) : (
            <OrdersTable />
          )}
          <Pagination />
        </>
      )}
    </>
  );
}

export function AdminOrderView({
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
        eyebrow="Операційна робота / деталі"
        title={`Замовлення ${order?.number ?? "не знайдено"}`}
        description={order?.date}
        action={
          <ActionLink href="/admin/orders" secondary>
            ← До замовлень
          </ActionLink>
        }
      />
      <StatePicker
        base={`/admin/orders/${id}`}
        states={[
          "conflict",
          "error",
          "missing",
          "forbidden",
          "cancelled",
          "completed",
        ]}
        current={effective}
      />
      {[...generalStates, "missing"].includes(effective) ? (
        <GeneralState state={effective} retry="/admin/orders" />
      ) : (
        <div className="split">
          <div className="stack">
            {state === "conflict" && (
              <Notice title="Замовлення вже оновив інший адміністратор">
                Потрібно буде отримати актуальні дані перед повторною зміною.
                Застарілі зміни не зберігатимуться.
              </Notice>
            )}
            <section className="panel stack">
              <div className="row">
                <h2>Склад замовлення</h2>
                <span className="badge">
                  {state === "cancelled"
                    ? "Скасовано"
                    : state === "completed"
                      ? "Завершено"
                      : order?.status}
                </span>
              </div>
              <OrderItems />
              <Totals />
              <small>
                Історичні ціни та склад. Редагування оформленого замовлення не
                передбачено.
              </small>
            </section>
            <section className="panel stack">
              <h2>Клієнт та доставка</h2>
              <p>
                <strong>{order?.name}</strong>
                <br />
                Телефон: буде відображено як посилання для дзвінка
                <br />
                Демонстраційна адреса доставки
              </p>
              <p className="muted">
                Коментар клієнта: зателефонуйте перед доставкою.
              </p>
              <Textarea
                label="Внутрішня примітка оператора"
                placeholder="Видно тільки адміністраторам"
              />
              <MockButton secondary>Зберегти примітку</MockButton>
            </section>
            <section className="panel stack">
              <h2>Журнал змін</h2>
              <ol className="timeline">
                <li>
                  <strong>13:45 · Замовлення створено</strong>
                  <p className="muted">Клієнт · Нове</p>
                </li>
                <li>
                  <strong>13:48 · Підтверджено</strong>
                  <p className="muted">Адміністратор · Деталі узгоджено</p>
                </li>
                <li>
                  <strong>13:52 · Готується</strong>
                  <p className="muted">Адміністратор · Передано на кухню</p>
                </li>
              </ol>
            </section>
          </div>
          <aside className="panel stack">
            <h2>Керування</h2>
            <Select
              label="Статус виконання"
              options={[
                state === "cancelled"
                  ? "Скасовано"
                  : state === "completed"
                    ? "Завершено"
                    : (order?.status ?? "Готується"),
                "Нове",
                "Підтверджено",
                "Доставляється",
              ]}
            />
            <MockButton>Оновити статус</MockButton>
            <p>
              <strong>Оплата:</strong>{" "}
              {state === "completed"
                ? "Оплачено"
                : (order?.payment ?? "Не оплачено")}
            </p>
            <MockButton secondary>Зафіксувати оплату</MockButton>
            <small>
              Завершення доступне лише після оплати. Дії перевірятиме сервер.
            </small>
            <ConfirmAction kind="order" name={order?.number ?? ""} />
            <Notice>
              Потрібно змінити склад? Скасувати з причиною й попросити клієнта
              оформити заново.
            </Notice>
          </aside>
        </div>
      )}
    </>
  );
}

export function BannersView({ state }: { state: MockState }) {
  return (
    <>
      <PageHeading
        eyebrow="Контент"
        title="Банери"
        description="Слайди на головній сторінці та їх порядок."
        action={
          <ActionLink href="/admin/banners/new">+ Новий банер</ActionLink>
        }
      />
      <StatePicker
        base="/admin/banners"
        states={["empty", "loading", "error", "forbidden"]}
        current={state}
      />
      {generalStates.includes(state) ? (
        <GeneralState state={state} retry="/admin/banners" />
      ) : state === "empty" ? (
        <Empty
          title="Банерів ще немає"
          description="Додайте першу пропозицію для головної."
          href="/admin/banners/new"
          action="Новий банер"
        />
      ) : (
        <div className="grid-2">
          {["Улюблені страви за вашим столом", "Сезонна пропозиція"].map(
            (t, i) => (
              <article className="panel stack" key={t}>
                <Placeholder label={`Банер ${i + 1}`} />
                <div className="row">
                  <h2>{t}</h2>
                  <span className="badge">
                    {i === 0 ? "Активний" : "Неактивний"}
                  </span>
                </div>
                <small>Порядок {i + 1} · Посилання: /menu</small>
                <div className="actions">
                  <ActionLink
                    href={`/admin/banners/${String(i + 1).padStart(2, "0")}/edit`}
                    secondary
                  >
                    Редагувати
                  </ActionLink>
                  <ConfirmAction kind="banner" name={t} />
                  <MockButton secondary>↑</MockButton>
                  <MockButton secondary>↓</MockButton>
                </div>
              </article>
            ),
          )}
        </div>
      )}
    </>
  );
}
export function BannerFormView({
  state,
  editing,
  bannerId = "01",
}: {
  state: MockState;
  editing: boolean;
  bannerId?: string;
}) {
  return (
    <>
      <PageHeading
        eyebrow="Контент / банери"
        title={editing ? "Редагування банера" : "Новий банер"}
      />
      <StatePicker
        base={
          editing ? `/admin/banners/${bannerId}/edit` : "/admin/banners/new"
        }
        states={["upload", "validation", "error"]}
        current={state}
      />
      <div className="split">
        <section className="panel stack">
          {state === "error" && (
            <Notice title="Збереження не вдалося">
              Введені значення залишаються у формі для повторної спроби.
            </Notice>
          )}
          <Field
            label="Заголовок *"
            value={
              editing
                ? bannerId === "02"
                  ? "Сезонна пропозиція"
                  : "Улюблені страви за вашим столом"
                : undefined
            }
            placeholder="Заголовок пропозиції"
            error={state === "validation" ? "Додайте заголовок." : undefined}
          />
          <Textarea label="Короткий текст" placeholder="Опис пропозиції" />
          <div className="form-grid">
            <Field label="Текст кнопки" placeholder="Переглянути меню" />
            <Field
              label="Посилання кнопки"
              placeholder="/menu"
              error={
                state === "validation"
                  ? "Посилання має бути безпечним."
                  : undefined
              }
            />
            <Field label="Порядок" type="number" value="1" />
          </div>
          <Check
            label="Банер активний"
            checked={!editing || bannerId !== "02"}
          />
          <div className="form-actions">
            <MockButton>Зберегти банер</MockButton>
            <ActionLink href="/admin/banners" secondary>
              Скасувати
            </ActionLink>
          </div>
        </section>
        <aside className="panel stack">
          <h2>Зображення</h2>
          <Placeholder label="Зображення банера" />
          {state === "upload" && (
            <Notice title="Помилка завантаження">
              Приклад: непідтримуваний тип файлу. Попереднє зображення
              зберігається.
            </Notice>
          )}
          <MockButton secondary>Обрати зображення</MockButton>
          <Field
            label="Альтернативний опис *"
            placeholder="Опишіть зображення"
          />
        </aside>
      </div>
    </>
  );
}

export function SettingsView({ state }: { state: MockState }) {
  return (
    <>
      <PageHeading
        eyebrow="Ресторан"
        title="Налаштування"
        description="Контакти, доставка та приймання замовлень."
      />
      <StatePicker
        base="/admin/settings"
        states={["closed", "validation", "error", "loading", "forbidden"]}
        current={state}
      />
      {["loading", "forbidden"].includes(state) ? (
        <GeneralState state={state} retry="/admin/settings" />
      ) : (
        <div className="split">
          <div className="stack">
            {state === "error" && (
              <Notice title="Не вдалося зберегти налаштування">
                Зміни не застосовано. Введені значення залишаються для повторної
                спроби.
              </Notice>
            )}
            <section className="panel stack">
              <h2>Контакти та години</h2>
              <div className="form-grid">
                <Field
                  label="Телефон ресторану"
                  type="tel"
                  placeholder="Буде погоджено"
                />
                <Field label="Години роботи" placeholder="Буде погоджено" />
                <Field
                  label="Адреса ресторану"
                  full
                  placeholder="Буде погоджено"
                />
                <Field
                  label="Соціальне посилання"
                  full
                  type="url"
                  placeholder="https://…"
                />
              </div>
            </section>
            <section className="panel stack">
              <h2>Умови доставки</h2>
              <div className="form-grid">
                <Field
                  label="Вартість доставки, ₴ *"
                  type="number"
                  placeholder="Не визначено"
                  error={
                    state === "validation"
                      ? "Вкажіть невід’ємну суму."
                      : undefined
                  }
                />
                <Field
                  label="Безкоштовно від, ₴ *"
                  type="number"
                  placeholder="Не визначено"
                />
                <Textarea
                  label="Місто та зона доставки"
                  full
                  placeholder="Буде погоджено"
                />
              </div>
              <small>
                Оператор підтверджує адресу вручну. Нові умови не змінюють уже
                оформлені замовлення.
              </small>
            </section>
            <div className="form-actions">
              <MockButton>Зберегти налаштування</MockButton>
            </div>
          </div>
          <aside className="panel stack">
            <h2>Приймання замовлень</h2>
            <Check label="Приймання увімкнено" checked={state !== "closed"} />
            <Textarea
              label="Повідомлення при зупинці"
              value="Тимчасово не приймаємо замовлення. Поверніться пізніше."
            />
            {state === "closed" && (
              <Notice title="Приклад: приймання зупинено">
                Меню видно, оформлення заблоковано.
              </Notice>
            )}
            <small>
              У мокапі перемикач не змінює стан магазину. Серверна перевірка
              буде окремою задачею.
            </small>
          </aside>
        </div>
      )}
    </>
  );
}
