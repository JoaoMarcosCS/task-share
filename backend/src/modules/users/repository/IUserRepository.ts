import { CreateUserDTO } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<boolean>;
  update(id: string, data: Partial<CreateUserDTO>): Promise<boolean>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User[] | null>;
  exists(email: string): Promise<boolean>;
}
