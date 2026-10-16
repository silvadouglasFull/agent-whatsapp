// @/services/utils/validate.decorator.ts
import { ZodType } from "zod";

export function validateInput(schema: ZodType): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (this: any, ...args: any[]) {
            if (args && args.length > 0) {
                args[0] = schema.parse(args[0]);
            }
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
export function validateOutput(schema: ZodType): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (this: any, ...args: any[]) {
            const result = await originalMethod.apply(this, args);
            return schema.parse(result);
        };

        return descriptor;
    };
}
