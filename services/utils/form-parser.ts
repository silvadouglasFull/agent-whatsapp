
import { z } from 'zod';

export function parseFormData<T extends z.ZodType>(
    formData: FormData,
    schema: T
): z.infer<T> {
    const rawData = Object.fromEntries(formData.entries());
    return schema.parse(rawData);
}