import type { LocaleDictionary } from "./types";

export const pt: LocaleDictionary = {
  common: {
    error: {
      generic: "Algo deu errado. Tente novamente.",
    },
  },

  login: {
    tagline: "Sinta cada batida do seu progresso.",
    subtitle: "Seus treinos, seu progresso — tudo em um só lugar.",

    signupHeading: "Crie sua conta",
    loginHeading: "Bem-vindo de volta",
    signupSubheading: "Preencha seus dados para começar.",
    loginSubheading: "Entre com suas credenciais para continuar.",

    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "voce@email.com",
    passwordLabel: "Senha",

    signupSubmit: "Criar conta",
    loginSubmit: "Entrar",

    hasAccount: "Já tem uma conta?",
    noAccount: "Ainda não tem uma conta?",
    switchToLogin: "Entrar",
    switchToSignup: "Cadastre-se",

    error: {
      emailTaken: "Este e-mail já está cadastrado.",
      badCredentials: "E-mail ou senha incorretos.",
      signupFailed: "Não foi possível criar sua conta. Tente novamente.",
      loginFailed: "Não foi possível entrar. Tente novamente.",
    },
  },
};
