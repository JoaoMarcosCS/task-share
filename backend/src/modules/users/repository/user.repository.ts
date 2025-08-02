import { injectable } from "tsyringe";
import { AppDataSource } from "../../../infra/database/data-source";
import { CreateUserDTO } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { IUserRepository } from "./IUserRepository";
import { ILike } from "typeorm";

@injectable()
export class UserRepository implements IUserRepository {
  private readonly userRepository = AppDataSource.getRepository(User);

  async create(data: CreateUserDTO): Promise<boolean> {
    const user = this.userRepository.create(data);

    const result = await this.userRepository.save(user);

    if (!result) return false;

    return true;
  }

  async update(id: string, data: Partial<CreateUserDTO>): Promise<boolean> {
    const result = await this.userRepository.update(id, data);

    if (result.affected == 0) return false;

    return true;
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User[] | null> {
    return await this.userRepository.find({
      where: {
        email: ILike(`${email}%`),
      },
      select: {
        name: true,
        id: true,
        email: true,
      },
      order: {
        email: "ASC",
      },
      take: 5,
    });
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}
