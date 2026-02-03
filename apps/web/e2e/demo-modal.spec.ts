import { test, expect } from "@playwright/test";

test.describe("Flujo demo modal", () => {
  test("abre home, verifica Hero, abre modal demo, completa formulario y ve mensaje de éxito", async ({
    page,
  }) => {
    await page.goto("/");

    // 1. Verificar que el Hero existe
    const hero = page.getByRole("banner").or(page.locator("header")).first();
    await expect(hero).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /bienvenido a la app/i })
    ).toBeVisible();

    // 2. Click en "Agenda demo"
    await page.getByRole("button", { name: /agenda demo/i }).click();

    // 3. Modal visible
    const dialog = page.getByRole("dialog", { name: /agenda una demo/i });
    await expect(dialog).toBeVisible();

    // 4. Completar formulario con datos de prueba
    await page.getByLabel(/nombre/i).fill("Usuario Prueba");
    await page.getByLabel(/email/i).fill("prueba@ejemplo.com");
    await page.getByLabel(/mensaje/i).fill("Quiero agendar una demo para mi equipo.");

    // 5. Enviar
    await page.getByRole("button", { name: /enviar/i }).click();

    // 6. Verificar respuesta: mensaje de éxito (success toast)
    await expect(
      page.getByTestId("demo-success").getByText(/gracias, te contactaremos pronto/i)
    ).toBeVisible();
  });
});
