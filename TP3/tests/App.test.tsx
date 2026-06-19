import { fireEvent, render, screen } from "@testing-library/react-native";

import App from "../front-end/src/App";

describe("App validation flows", () => {
  it("shows an error when the login email is incomplete", () => {
    render(<App />);

    const emailInput = screen.getByLabelText("Email");

    fireEvent.changeText(emailInput, "joao.silva");
    fireEvent(emailInput, "blur");

    expect(
      screen.getByText(
        "Digite um e-mail completo, exemplo: joao.silva@gmail.com.",
      ),
    ).toBeTruthy();
  });

  it("formats and validates the signup phone field", () => {
    render(<App />);

    fireEvent.press(screen.getByText("Criar conta"));

    const phoneInput = screen.getByLabelText("Telefone");

    fireEvent.changeText(phoneInput, "11999999999");
    fireEvent(phoneInput, "blur");

    expect(phoneInput.props.value).toBe("(11) 99999-9999");
    expect(screen.queryByText("Digite DDD + numero, com 11 digitos.")).toBeNull();
  });

  it("requires a strong signup password", () => {
    render(<App />);

    fireEvent.press(screen.getByText("Criar conta"));

    const passwordInput = screen.getByLabelText("Senha");

    fireEvent.changeText(passwordInput, "1234567");
    fireEvent(passwordInput, "blur");

    expect(
      screen.getByText("Use 8 ou mais caracteres com letras e numeros."),
    ).toBeTruthy();
  });

  it("opens the SMS screen when the user chooses phone login", () => {
    render(<App />);

    fireEvent.press(screen.getByText("Telefone"));

    expect(screen.getByText("Verificar por SMS")).toBeTruthy();
    expect(screen.getByLabelText("Numero de telefone")).toBeTruthy();
  });
});
