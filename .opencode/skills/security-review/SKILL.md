---
name: security-review
description: Revisión de seguridad de un diff en apps/web (Next.js/React). Úsala antes de aprobar cualquier PR que toque entrada de usuario, autenticación, formularios, API routes, renderizado de HTML o dependencias.
---

# Revisión de seguridad — checklist corto

Recorrido basado en OWASP Top 10 y ASVS L1, limitado a lo que aplica a este repo.
Marca cada punto como `ok`, `hallazgo` o `n/a` con la razón.

## Entrada y renderizado

- ¿Toda entrada de usuario se valida en el servidor, no solo en el cliente?
- ¿Hay `dangerouslySetInnerHTML`, `eval`, `new Function` o `innerHTML` con datos
  externos? Si sí, ¿está sanitizado con una librería mantenida?
- ¿Los enlaces con `target="_blank"` llevan `rel="noopener noreferrer"`?
- ¿Los mensajes de error filtran rutas, stack o detalles internos al usuario?

## Secretos y configuración

- ¿Algún token, clave o cadena de conexión quedó en código, test o comentario?
- ¿Las variables sensibles solo se leen en servidor (`process.env`, nunca
  `NEXT_PUBLIC_`)?
- ¿Se añadieron dependencias sin justificar? Revisa `npm audit` y si el paquete es
  mantenido (último release, issues abiertos).

## Datos y límites

- ¿Las rutas de API validan método, tamaño de payload y tipo de contenido?
- ¿Hay rate limiting o al menos un límite de longitud en formularios públicos?
- ¿El código asume que el cliente respeta reglas que solo el servidor puede imponer?

## Salida

```
[bloqueante|mayor|menor] archivo:línea — riesgo y escenario de abuso concreto
  Mitigación: una frase accionable
```

Sin hallazgos se responde `No findings` y se listan los puntos revisados. No
inventes vulnerabilidades: un `n/a` razonado vale más que un hallazgo falso.
