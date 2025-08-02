import { BadRequestError } from "@shared/errors/errors";
import { ZodSchema } from "zod";

export function validateWithZod<T>(schema: ZodSchema<T>, data: unknown): T {
  // console.log("Validating data:", data);
  const result = schema.safeParse(data);

  if (!result.success) {
    const firstError = result.error.issues[0];
    // console.log("[validate-with-zod]", firstError.message);

    throw new BadRequestError(firstError.message);
  }

  // console.log("Validation succeeded:", result.data);
  return result.data;
}
