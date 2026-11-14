import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModalSimple } from "@/components/ModalSimple";

describe("ModalSimple", () => {
  it("mueve el foco al primer campo al abrirse", () => {
    render(<ModalSimple isOpen onClose={() => {}} />);
    expect(screen.getByLabelText(/nombre/i)).toHaveFocus();
  });

  it("cierra con la tecla Escape", () => {
    const onClose = vi.fn();
    render(<ModalSimple isOpen onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("bloquea el scroll del body mientras está abierto", () => {
    const { unmount } = render(<ModalSimple isOpen onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("muestra el mensaje de éxito tras enviar y lo anuncia", () => {
    render(<ModalSimple isOpen onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Usuario Prueba" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "prueba@ejemplo.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Quiero una demo" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /enviar/i }).closest("form")!);

    expect(screen.getByTestId("demo-success")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      /gracias, te contactaremos pronto/i,
    );
  });

  it("no renderiza nada cuando está cerrado", () => {
    render(<ModalSimple isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
