import { z } from "zod";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({
  path: join(process.cwd(), ".env"),
});

const envSchema = z.object({
  APP_PORT: z.string(),
  JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.string(),
});

export const env = envSchema.parse(process.env) as z.infer<typeof envSchema>;
