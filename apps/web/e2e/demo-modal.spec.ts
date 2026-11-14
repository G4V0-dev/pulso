import { test, expect } from "@playwright/test";

test.describe("Flujo demo modal", () => {
  test("abre home, verifica el hero y completa el formulario de demo", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /tus proyectos, tu equipo y tus plazos/i,
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: /ver demo de 2 min/i }).click();

    const dialog = page.getByRole("dialog", { name: /agenda una demo/i });
    await expect(dialog).toBeVisible();
    await expect(page.getByLabel(/nombre/i)).toBeFocused();

    await page.getByLabel(/nombre/i).fill("Usuario Prueba");
    await page.getByLabel(/email/i).fill("prueba@ejemplo.com");
    await page.getByLabel(/mensaje/i).fill("Quiero agendar una demo para mi equipo.");
    await page.getByRole("button", { name: /enviar/i }).click();

    await expect(
      page.getByTestId("demo-success").getByText(/gracias, te contactaremos pronto/i),
    ).toBeVisible();
  });

  test("cierra el modal con Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /ver demo de 2 min/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
