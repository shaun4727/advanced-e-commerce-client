import z from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters!'),
    confirm_password: z
        .string()
        .min(6, 'Confirm password must be at least 6 characters!'),
});

export type registerFormData = z.infer<typeof registerSchema>;
