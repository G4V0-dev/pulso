import { test, expect } from "@playwright/test";

test.describe("Flujo de registro", () => {
  test("preselecciona el plan de la URL y valida el email", async ({ page }) => {
    await page.goto("/signup?plan=starter");

    await expect(page.getByLabel(/plan/i)).toHaveValue("starter");

    await page.getByLabel(/nombre completo/i).fill("Ana Perez");
    await page.getByLabel(/email de trabajo/i).fill("ana@");
    await page.getByRole("button", { name: /crear mi espacio/i }).click();

    await expect(
      page.getByRole("alert").filter({ hasText: /escribe un email válido/i }),
    ).toBeVisible();
  });

  test("crea la cuenta con datos válidos", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.getByLabel(/plan/i)).toHaveValue("pro");

    await page.getByLabel(/nombre completo/i).fill("Ana Perez");
    await page.getByLabel(/email de trabajo/i).fill("ana@empresa.com");
    await page.getByRole("textbox", { name: /empresa/i }).fill("Kora");
    await page.getByRole("button", { name: /crear mi espacio/i }).click();

    await expect(page.getByRole("heading", { name: /revisa tu correo/i })).toBeVisible();
  });
});
