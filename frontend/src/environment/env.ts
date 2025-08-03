import zod from "zod";

const envSchema = zod.object({
  BASE_URL: zod.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
