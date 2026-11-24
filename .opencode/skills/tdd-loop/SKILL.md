---
name: tdd-loop
description: Ciclo rojo-verde-refactor para cambios de comportamiento en apps/web. Úsala cuando la tarea cambia algo observable (UI, validación, cálculo, API) y no solo formato o configuración.
---

# Ciclo TDD en este repo

Un cambio de comportamiento sin test que lo respalde no está terminado, aunque
compile.

## 1. Rojo

- Escribe el test en `apps/web/__tests__/<nombre>.test.tsx` (o en `e2e/` si es un
  flujo completo) con el comportamiento que quieres, no con la implementación.
- Ejecuta `npm --prefix apps/web run test` y **pega la salida del fallo**. Si el test
  pasa antes de escribir código, el test no prueba nada: reescríbelo.

## 2. Verde

- Implementa el mínimo necesario para que pase.
- Vuelve a correr el test. Un test verde con `skip`, `only` o expectativas
  comentadas no cuenta.

## 3. Refactor

- Con la red puesta, limpia nombres y duplicación.
- Corre la suite completa: `npm --prefix apps/web run test`.
- Si el refactor rompe un test, arregla el código, no el test.

## Reglas

- Un test por comportamiento; tres casos como máximo (feliz, límite, error).
- Asserts sobre lo que el usuario ve o recibe, no sobre estado interno.
- Nada de `sleep` arbitrarios en e2e: usa las esperas de Playwright.
- No cambies `vitest.config.ts` ni `playwright.config.ts` para acomodar un test.

## Criterio de terminado

`npm --prefix apps/web run test` en verde, el test nuevo falla si reviertes la
implementación, y la salida real está en el PR.
