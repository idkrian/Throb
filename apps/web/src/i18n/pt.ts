import type { LocaleDictionary } from "./types";

export const pt: LocaleDictionary = {
  common: {
    error: {
      generic: "Algo deu errado. Tente novamente.",
    },
    restDay: "Descanso",
    today: "Hoje",
    edit: "Editar",
    delete: "Excluir",
    cancel: "Cancelar",
    optional: "opcional",
  },

  exerciseEditPanel: {
    title: "Editar exercício",
    sets: "Séries",
    reps: "Reps",
    muscleGroup: "Grupo muscular",
    selectMuscleGroup: "Selecione o grupo muscular",
    muscle: "Músculo",
    selectMuscle: "Selecione o músculo",
    exercise: "Exercício",
    selectExercise: "Selecione o exercício",
    empty: "vazio",
    remove: "Remover",
    done: "Concluir",
  },

  exerciseModal: {
    editTitle: "Editar exercício",
    newTitle: "Novo exercício",
    muscleGroup: "Grupo muscular",
    targetMuscle: "Músculo alvo",
    selectMuscle: "Selecione o músculo",
    titleLabel: "Título",
    titlePlaceholder: "ex.: Supino inclinado com halteres",
    descriptionLabel: "Descrição",
    descriptionPlaceholder: "Anotações, dicas ou detalhes de execução...",
    createdSuccess: "Exercício criado com sucesso.",
    updatedSuccess: "Exercício atualizado com sucesso.",
    createError: "Ocorreu um erro ao criar o exercício.",
    updateError: "Ocorreu um erro ao atualizar o exercício.",
    saving: "Salvando...",
    creating: "Criando...",
    saveChanges: "Salvar alterações",
    createExercise: "Criar exercício",
  },

  exerciseDrawer: {
    title: "Detalhes do exercício",
    custom: "Personalizado",
    catalog: "Catálogo",
    primaryMuscle: "Músculo principal",
    description: "Descrição",
    personalBest: "Recorde pessoal",
    estimatedOneRepMax: "{weight} 1RM est.",
    heaviestEver: "Maior carga já feita: {weight}",
    noPersonalBest: "Sem dados ainda — registre um treino para ver seus PRs.",
    progression: "Progressão",
    noProgression: "As tendências de volume e carga aparecerão aqui.",
    lastPerformed: "Último treino",
    notPerformed: "Ainda não executado.",
    history: "Histórico",
    volume: "Vol {weight}",
    setNumber: "Série {number}:",
    setDetail: "{reps} reps × {weight}",
    rpe: "@ RPE {rpe}",
    catalogLocked:
      "Exercícios do catálogo não podem ser editados. Crie o seu para personalizar.",
  },

  muscleGroups: {
    CHEST: "Peito",
    BACK: "Costas",
    SHOULDERS: "Ombros",
    ARMS: "Braços",
    LEGS: "Pernas",
    GLUTES: "Glúteos",
    CORE: "Core",
  },

  muscles: {
    CHEST_GENERAL: "Peito (geral)",
    UPPER_CHEST: "Peito superior",
    MIDDLE_CHEST: "Peito médio",
    LOWER_CHEST: "Peito inferior",

    BACK_GENERAL: "Costas (geral)",
    LATS: "Dorsais",
    TRAPS: "Trapézio",
    LOWER_BACK: "Lombar",
    RHOMBOIDS: "Romboides",

    SHOULDERS_GENERAL: "Ombros (geral)",
    FRONT_DELTOID: "Deltoide anterior",
    SIDE_DELTOID: "Deltoide lateral",
    REAR_DELTOID: "Deltoide posterior",

    ARMS_GENERAL: "Braços (geral)",
    BICEPS_LONG_HEAD: "Bíceps (cabeça longa)",
    BICEPS_SHORT_HEAD: "Bíceps (cabeça curta)",
    TRICEPS_LONG_HEAD: "Tríceps (cabeça longa)",
    TRICEPS_LATERAL_HEAD: "Tríceps (cabeça lateral)",
    TRICEPS_MEDIAL_HEAD: "Tríceps (cabeça medial)",

    FOREARMS_GENERAL: "Antebraços (geral)",
    BRACHIORADIALIS: "Braquiorradial",
    PRONATOR_TERES: "Pronador redondo",
    FLEXORS: "Flexores",
    EXTENSORS: "Extensores",

    LEGS_GENERAL: "Pernas (geral)",
    QUADRICEPS: "Quadríceps",
    HAMSTRINGS: "Posteriores de coxa",
    CALVES: "Panturrilhas",

    GLUTES_GENERAL: "Glúteos (geral)",
    GLUTEUS_MAXIMUS: "Glúteo máximo",
    GLUTEUS_MEDIUS: "Glúteo médio",
    GLUTEUS_MINIMUS: "Glúteo mínimo",

    CORE_GENERAL: "Core (geral)",
    ABS: "Abdômen",
    OBLIQUES: "Oblíquos",
  },

  exercises: {
    custom: "Personalizado",
    filterByMuscle: "Filtrar por músculo",
    allExercises: "Todos os exercícios",
    emptyTitle: "Nenhum exercício ainda",
    emptyAll: "Comece sua biblioteca adicionando seu primeiro exercício.",
    emptyFiltered:
      "Nenhum exercício de {group} ainda. Adicione um para começar.",
    newExercise: "Novo exercício",
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
