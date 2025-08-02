import { CreateUserDTO } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { IUserRepository } from "../repository/IUserRepository";
import { generateHash } from "@shared/utils/generateHash";
import { MessageError } from "@shared/errors/message-error.enum";
import { inject, injectable } from "tsyringe";
import {
  ConflictException,
  InternalServerException,
  NotFoundException,
} from "@shared/errors/errors";

@injectable()
export class UserService {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async createUser(data: CreateUserDTO): Promise<boolean> {
    const existUser = await this.userRepository.exists(data.email);

    if (existUser)
      throw new ConflictException(MessageError.USER_ALREADY_EXISTS);

    data.password = await generateHash(data.password);

    const result = await this.userRepository.create(data);

    if (!result)
      throw new InternalServerException(MessageError.USER_CREATE_ERROR);

    return true;
  }

  async updateUser(id: string, data: Partial<CreateUserDTO>): Promise<boolean> {
    const result = await this.userRepository.update(id, data);

    if (!result)
      throw new InternalServerException(MessageError.USER_UPDATE_ERROR);

    return result;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.userRepository.findById(id);

    if (!result) throw new NotFoundException(MessageError.USER_NOT_FOUND);

    return result;
  }

  async findByEmail(email: string): Promise<User[] | null> {
    const result = await this.userRepository.findByEmail(email);

    if (!result) throw new NotFoundException(MessageError.USER_EMAIL_NOT_FOUND);

    return result;
  }
}
