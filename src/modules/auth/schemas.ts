import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password length cannot be less than 8")
    .max(20, "Password length cannot be more than 20"),
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(63, "username must be less than 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letter, numbers and hyphens. It must start and end with a letter and number"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot containe consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
