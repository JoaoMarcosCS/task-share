import bcrypt from "bcrypt";
import { string } from "zod";

export async function generateHash(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(hash: string, password: string) {
  return await bcrypt.compare(hash, password);
}
