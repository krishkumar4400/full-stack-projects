import {z} from 'zod';

export const registerValidationSchema = z.object({
    name: z.string().nonempty().trim().min(3),
    email: z.email().nonempty().trim(),
    password: z.string().nonempty().trim() 
});

export const loginValidationSchema = z.object({
    email: z.email().nonempty().trim(),
    password: z.string().nonempty().trim() 
});
