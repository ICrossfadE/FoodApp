# Фронтенд-основа FRONT-01

Дата перевірки: 2026-11-10. Вибрано Next.js App Router із TypeScript strict. Версії зафіксовано в package.json, повне дерево — у package-lock.json.

| Інструмент | Версія | Причина вибору |
| --- | --- | --- |
| Node.js | 24.14.0 у середовищі; підтримуємо 24.x | LTS-гілка, відповідає мінімуму Next.js >=20.9 |
| Next.js | 16.4.6 | Поточний стабільний реліз, App Router; офіційна сумісність із React 19 |
| React / React DOM | 19.3.1 | Однакові версії обох пакетів у дозволеному Next.js діапазоні |
| TypeScript | 5.9.3 | Консервативна гілка для старту, strict; проходить генерацію типів і збірку Next.js |
| Tailwind / PostCSS-плагін | 4.3.5 | Однакові версії, налаштування через CSS |
| ESLint | 9.39.5 | Сумісність із peer-діапазонами React/import/a11y-плагінів із eslint-config-next; ESLint 10 ці діапазони ще не задовольняє |
| eslint-config-next | 16.4.6 | Відповідає версії Next.js, перевірки TypeScript, React і доступності |
| shadcn CLI | 4.23.0 (одноразово) | Додано тільки потрібну кнопку, конфігурація в components.json |
| Playwright | 1.65.0 | Перевірка адаптивності в реальному headless-браузері |

Кнопку shadcn адаптовано до локального `cn` і прибрано анімаційний клас до погодження макетів. Залежності `clsx`, `tailwind-merge`, `class-variance-authority` та Radix потрібні цій кнопці. Шрифти й фото із зовнішніх сервісів не завантажуються: це нейтральний wireframe, збірка не залежить від Google Fonts.

## Прочитані офіційні джерела

- https://nextjs.org/docs/app/getting-started/installation — вимоги Node.js, TypeScript і App Router.
- https://ui.shadcn.com/docs/installation/next — конфігурація shadcn/ui для Next.js і Tailwind.
- npm metadata `next@16.4.6`: engines >=20.9.0, peer React/React DOM ^19.0.0.
- npm metadata `shadcn@4.23.0`: engines >=20.18.1.

## Межі

Немає Route Handlers, Server Actions, БД, Prisma, OAuth, server-only env, бізнес-правил чи серверних тестів. Серверний рендеринг у Next.js лише відображає макети та URL-параметри. Приватних даних немає; приклади використовують домен example.com.

ARCH-01 не завершено: сумісність Prisma / Better Auth / адаптера й серверну архітектуру перевірятимемо під відповідні навчальні задачі. SETUP-01 виконано лише в частині фронтенд-основи; серверні модулі не створювалися.

## Відоме обмеження інструментів

ESLint 9 уже має попередження про завершення підтримки, але він відповідає peer-залежностям поточного Next.js lint-конфіга. На момент встановлення `npm audit` показує 7 moderate-повідомлень у dev-ланцюжку TypeScript ESLint через minimatch (GHSA-g3hv-75wg-m249). `npm audit fix` їх не усунув у поточних сумісних діапазонах; примусове оновлення не застосовувалось. Перед публікацією повторно перевірити підтримувану комбінацію lint-інструментів. Це не перевірка безпеки майбутнього бекенду.

## FRONT-02

Додано `gsap@3.15.1`, `@gsap/react@2.1.2`, `@tabler/icons-react@3.51.0`. Стиль та джерела: [VISUAL_STYLE.md](./VISUAL_STYLE.md). Перевірка локальних діалогів і GSAP: `npm run qa:interactions`.
