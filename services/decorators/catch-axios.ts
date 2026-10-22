import { AxiosErrorHandler } from "@services/handlers/axios-error-handler";

export function catchAxios() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (error) {
                AxiosErrorHandler.handle(error);
            }
        };
        return descriptor;
    };
}
