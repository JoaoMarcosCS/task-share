export enum MessageError {
  USER_ALREADY_EXISTS = "Usuário já existente com esse email",
  USER_CREATE_ERROR = "Erro ao criar o seu usuário",
  USER_UPDATE_ERROR = "Erro ao atualizar o seu usuário",
  USER_EMAIL_NOT_FOUND = "Usuário com esse email não encontrado",
  USER_NOT_FOUND = "Usuário não encontrado",
  TASK_LIST_CREATE_ERROR = "Erro ao criar sua lista",
  TASK_LIST_NOT_OWNER = "Somente o dono da lista pode edita-la",
  TASK_LIST_UPDATE_ERROR = "Erro ao atualizar a sua lista",
  TASK_LIST_NOT_FOUND = "Nenhuma lista criada",
  TASK_LIST_DELETE_ERROR = "Erro ao deletar sua list",
  SHARE_WITH_OWNER = "Você não pode compartilhar sua lista com você mesmo",
  SHARING_ALREDY_EXISTS = "Você já compartihlou a lista com esse(s) usuário(s)",
}
