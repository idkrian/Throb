import type { LocaleDictionary } from "./types";

export const pt: LocaleDictionary = {
  common: {
    error: {
      generic: "Algo deu errado. Tente novamente.",
    },
    restDay: "Descanso",
    today: "Hoje",
  },

  nav: {
    dashboard: "Início",
    exercises: "Exercícios",
    splits: "Treinos",
    calendar: "Calendário",
    profile: "Perfil",
  },

  navbar: {
    start: "Iniciar",
    logout: "Sair",
    logoutAs: "Sair ({name})",
    dayToday: "{status} · Hoje",
    day: {
      rest: "Descanso",
      scheduled: "Agendado",
      missed: "Perdido",
      trained: "Treinado",
    },
  },

  dashboard: {
    todaysTraining: "Treino de hoje",
    startWorkout: "Iniciar treino",
    editWorkout: "Editar treino",
    restDayHint: "Nenhum treino agendado para hoje. Bom descanso!",
  },

  profile: {
    currentWeight: "Peso atual",
    sinceLastEntry: "Desde o último registro",
    logBodyWeight: "Registrar peso",
    weighHint:
      "Pese-se sempre no mesmo horário do dia para uma tendência consistente.",
    logWeight: "Registrar peso",
    saving: "Salvando...",
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
