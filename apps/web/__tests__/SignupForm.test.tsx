import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignupForm } from "@/components/SignupForm";

describe("SignupForm", () => {
  it("muestra errores de validación si el email no es válido", () => {
    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: "Ana Perez" },
    });
    fireEvent.change(screen.getByLabelText(/email de trabajo/i), {
      target: { value: "ana@" },
    });
    fireEvent.click(screen.getByRole("button", { name: /crear mi espacio/i }));

    expect(screen.getAllByText(/escribe un email válido/i)).not.toHaveLength(0);
    expect(screen.getByRole("alert")).toHaveTextContent(/escribe un email válido/i);
    expect(
      screen.queryByRole("heading", { name: /solicitud registrada/i }),
    ).not.toBeInTheDocument();
  });

  it("muestra la confirmación con datos válidos", () => {
    render(<SignupForm defaultPlan="starter" />);
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: "Ana Perez" },
    });
    fireEvent.change(screen.getByLabelText(/email de trabajo/i), {
      target: { value: "ana@empresa.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /crear mi espacio/i }));

    expect(
      screen.getByRole("heading", { name: /solicitud registrada/i }),
    ).toBeInTheDocument();
  });

  it("preselecciona el plan recibido por prop", () => {
    render(<SignupForm defaultPlan="starter" />);
    expect(screen.getByLabelText(/plan/i)).toHaveValue("starter");
  });

  it("actualiza el plan seleccionado cuando cambia la prop defaultPlan", () => {
    const { rerender } = render(<SignupForm defaultPlan="pro" />);
    expect(screen.getByLabelText(/plan/i)).toHaveValue("pro");

    rerender(<SignupForm defaultPlan="starter" />);
    expect(screen.getByLabelText(/plan/i)).toHaveValue("starter");
  });
});
