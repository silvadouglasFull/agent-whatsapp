import {
    AppError,
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError
} from "@errors/app-error";
import axios from "axios";

export class AxiosErrorHandler {
    public static handle(error: unknown): never {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const metaMessage = error.response?.data?.error?.message || error.response?.data?.message;
            switch (status) {
                case 400:
                    throw new BadRequestError(metaMessage || "Dados inválidos enviados ao WhatsApp.");
                case 401:
                    throw new UnauthorizedError("Token de acesso do WhatsApp expirado ou inválido.");
                case 404:
                    throw new NotFoundError("O ID do telefone ou conta WhatsApp não foi encontrado.");
                case 500:
                case 503:
                    throw new InternalServerError("O serviço do Meta está instável no momento.");
                default:
                    throw new AppError(metaMessage || "Ocorreu um erro desconhecido na API externa.", status || 500);
            }
        }
        throw new AppError(error instanceof Error ? error.message : "Erro interno do aplicativo.");
    }
}
