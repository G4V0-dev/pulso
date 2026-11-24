---
name: ship-checklist
description: Verificación obligatoria antes de declarar terminado un cambio y abrir PR en este repo. Úsala al cerrar cualquier implementación, antes de decir "listo".
---

# Antes de decir "listo"

"Compila" no es "funciona". Recorre esto en orden y guarda la salida real.

## 1. Verificación local (desde la raíz)

```bash
npm --prefix apps/web run format:check
npm --prefix apps/web run lint
npm --prefix apps/web run typecheck
npm --prefix apps/web run test
npm --prefix apps/web run build
```

Si tocaste rutas, imports o dependencias: `npm --prefix apps/web run test:e2e`.

## 2. Higiene del diff

```bash
git status --short
git diff --stat
git diff
```

- ¿Los archivos tocados son exactamente los que permite la tarea? Si aparece algo
  fuera del alcance, se revierte antes de seguir.
- ¿Menos de 600 líneas cambiadas? Si no, se parte el PR.
- ¿Cero cambios en `.github/**`, `package.json`, `package-lock.json`, `AGENTS.md`,
  `opencode.jsonc`, `.opencode/**`? Si hay alguno, va declarado en el PR.
- ¿Cero secretos? Revisa el diff a mano, no confíes en el escáner solo.

## 3. PR

- Rama `agent/<slug-corto>`, no `main`.
- Título `type(scope): subject` (Conventional Commits). Si no cumple, el check
  `title` falla.
- Descripción con tres bloques: **qué cambió**, **qué probé y con qué salida**,
  **qué quedó sin probar o con riesgo**.
- El PR lo abres tú si eres el orquestador; el agente implementador no hace push.

## 4. Después del PR

- Espera los checks: `static`, `unit`, `build`, `playwright`, `gitleaks`, `size`,
  `title`. Verde o no se toca `main`.
- Si un check falla, se arregla en la misma rama. Nunca se desactiva el check, ni
  se hace skip, ni se sube el umbral.
- El merge y la aprobación son humanos. El agente no aprueba su propio trabajo.

## Regla de honestidad

Si algo no se probó, se escribe "no probado" en el PR. Un informe con un hueco
declarado es mejor que uno verde y falso.
