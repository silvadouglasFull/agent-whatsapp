
export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Requisição inválida (Dados incorretos).") {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Não autorizado. Verifique suas credenciais.") {
        super(message, 401);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "O recurso solicitado não foi encontrado.") {
        super(message, 404);
    }
}

export class InternalServerError extends AppError {
    constructor(message = "Erro interno no servidor do Meta.") {
        super(message, 500);
    }
}
