export enum MessageEnum {
    // user
    USER_NOT_FOUND = 'Usuário não encontrado',
    SUCCESS_CREATE_ADMIN = 'Administrador cadastrado com sucesso',
    SUCCESS_CREATE_USER = 'Cadastrado com sucesso',
    UNIQUE_EMAIL_ERROR = 'Endereço de email já está em uso',
    INVALID_EMAIL = 'Informe um endereço de email válido',
    PASSWORD_MATCH = 'As senhas não conferem',
    EMAIL_EMPTY = 'Informe um endereço de email',
    USER_EMPTY = 'Informe o nome do usuário',
    ROLE_EMPTY = 'Informe o perfil do usuário',
    CRENDENTIALS_INVALID = 'Credenciais inválidas',
    USER_NAME_INVALID = 'Informe um nome de usuário válido',
    USER_EMAIL_INVALID = 'Informe um endereço de email válido',
    NOT_PERMISSION = 'Você não tem autorização para acessar esse recurso',
    USER_DELETE_SUCCESS = 'Usuário removido com sucesso',


    /*************** EXCEPTION DATABASE **************/
    EXCEPTION_DATABASE = 'Erro ao salvar o usuário no banco de dados'
}