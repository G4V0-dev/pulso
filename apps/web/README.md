# apps/web

Frontend del sitio de Pulso: Next.js 14 (App Router) + TypeScript + TailwindCSS.

## Comandos

- **Desarrollo:** `npm run dev` → http://localhost:3000
- **Build:** `npm run build`
- **Producción:** `npm run start`
- **Lint:** `npm run lint`
- **Tipos:** `npm run typecheck`
- **Formato:** `npm run format` / `npm run format:check`
- **Tests unitarios:** `npm run test`
- **E2E:** `npm run test:e2e`

## Instalación

Desde la raíz del repositorio:

```bash
npm run install:web
npm run dev
```

O desde esta carpeta:

```bash
npm install
npm run dev
```

## Organización

- `app/` — layout raíz, página principal, registro y assets de metadata.
- `components/` — componentes de presentación; `Hero` y `ModalSimple` son client components.
- `lib/` — contenido tipado (`constants.ts`), utilidades de enlaces y formato.
- `__tests__/` — Vitest + Testing Library.
- `e2e/` — flujos de Playwright.

El contenido editable (copy, planes, FAQ, testimonios) está centralizado en `lib/constants.ts`.
