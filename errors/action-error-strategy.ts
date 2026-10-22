import { ActionErrorResponse } from "@errors/types/action-error-handler";

const errorMessagesMap: Record<string, string> = {
    UnauthorizedError: "Sua sessão expirou. Por favor, reentre nas configurações do sistema.",
    NotFoundError: "Esta conta de WhatsApp não consta nos registros do Meta.",
    BadRequestError: "Os dados enviados estão incorretos ou incompletos.",
    InternalServerError: "O servidor do Meta está temporariamente fora do ar.",
};

export class ActionErrorStrategy {
    public static handle(error: unknown): ActionErrorResponse {
        const orignalErrorMessage: string | null = error instanceof Error ? error.message : null
        if (error && typeof error === 'object' && 'constructor' in error) {
            const errorClassName = error.constructor.name;
            const mappedMessage = orignalErrorMessage || errorMessagesMap[errorClassName];
            if (mappedMessage) {
                return { success: false, error: mappedMessage };
            }
        }
        const fallbackMessage = orignalErrorMessage || "Erro inesperado.";
        return { success: false, error: fallbackMessage };
    }
}
