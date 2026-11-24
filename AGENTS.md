# AGENTS.md — reglas para agentes de código en este repo

Este archivo lo leen los agentes (opencode y similares) antes de trabajar. Si no lo
cumples, el PR se rechaza y los checks de CI lo bloquean igual.

## Contexto del repo

- Monorepo mínimo: la app vive en `apps/web` (Next.js 14 + TypeScript + Tailwind).
  Todos los comandos npm se ejecutan con `--prefix apps/web` desde la raíz.
- `main` está protegida: solo entra por PR con checks en verde y aprobación humana.
- Node 20 (`.nvmrc`), npm 10, `package-lock.json` es la fuente de verdad de versiones.

## Antes de abrir un PR — ejecuta en este orden y no abras nada hasta que pase

```bash
npm --prefix apps/web run format:check
npm --prefix apps/web run lint
npm --prefix apps/web run typecheck
npm --prefix apps/web run test
npm --prefix apps/web run build
```

Si tocaste rutas, imports o dependencias:

```bash
npm --prefix apps/web run test:e2e
```

Pega la salida real en el PR. "Debería pasar" no es evidencia; un agente que dice
"tests ok" sin salida se trata como fallo.

## Reglas duras

- **Nunca** `git push --force`, `--force-with-lease`, `git reset --hard`, ni amend
  sobre commits ya pusheados.
- **Nunca** push directo a `main`, ni `gh pr merge`, ni aprobar tu propio PR. El
  merge lo hace una persona.
- Trabaja en una rama `agent/<slug-corto>`. Una tarea = una rama = un PR.
- Un PR por debajo de **600 líneas cambiadas** (el check `size` falla por encima).
  Si la tarea es más grande, pártela.
- Título de PR en Conventional Commits: `type(scope): subject` — el check `title`
  falla si no cumple. Tipos: feat, fix, chore, docs, refactor, test, perf, ci, build.
- Commits en Conventional Commits, en inglés, imperativo y minúsculas:
  `fix(pricing): handle empty plan list`.
- No edites `.github/workflows/**`, `.github/CODEOWNERS`, `AGENTS.md`,
  `opencode.jsonc`, `.opencode/**`, `package.json`, `package-lock.json` ni
  `next.config.js` sin decirlo explícitamente en la descripción del PR. Esas rutas
  requieren revisión humana y algunas están bloqueadas por permisos.
- Si añades una dependencia, justifícala en el PR y usa `npm --prefix apps/web install`
  (nunca edites `package-lock.json` a mano).
- Nunca escribas secretos, tokens ni cadenas de conexión en código ni tests. Usa
  `.env.example` y variables de entorno.
- No desactives ni pongas `skip` en un check que falla. Si no lo puedes arreglar,
  dilo en el PR y deja el check en rojo.

## Al terminar

Resume en el PR: qué cambió, qué corriste y con qué resultado, y qué quedó sin
probar. Si algo falla y no lo resolviste, es lo primero que debe leerse.
