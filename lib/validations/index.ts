import { z } from 'zod';

// Workout validation
export const WorkoutSchema = z.object({
  title: z.string().min(1, 'Workout title is required'),
  exercises: z
    .array(
      z.object({
        name: z.string().min(1, 'Exercise name is required'),
        sets: z.string().min(1, 'Sets required'),
        reps: z.string().min(1, 'Reps required'),
      })
    )
    .nonempty('At least one exercise is required.'),
});

export type WorkoutInput = z.infer<typeof WorkoutSchema>;

// Creating an Account
export const AccountSchema = z.object({
  name: z.string().min(5, 'Name is required, minimum of 5 characters'),
  username: z.string().min(5, 'Username required, minimum of 5 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Include at least one uppercase letter')
    .regex(/[0-9]/, 'Include at least one number'),
});
export type AccountInput = z.infer<typeof AccountSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
