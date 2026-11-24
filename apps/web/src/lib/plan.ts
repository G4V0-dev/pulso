/**
 * Selección de plan a partir del hash de la URL.
 * Permite prellenar el formulario de registro vía #signup?plan=<id>.
 */

const PLAN_HASH_RE = /plan=(starter|pro|enterprise)/;

/** Extrae el plan del hash; devuelve "pro" si no hay uno válido. */
export function parsePlanFromHash(hash: string): string {
  const match = hash.match(PLAN_HASH_RE);
  return match ? match[1] : "pro";
}
