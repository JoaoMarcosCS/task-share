import { inject, injectable } from "tsyringe";
import { sign, SignOptions } from "jsonwebtoken";
import { MessageError } from "@shared/errors/message-error.enum";
import { IUserRepository } from "@modules/users/repository/IUserRepository";
import {
  NotFoundException,
  UnauthorizedException,
} from "@shared/errors/errors";
import { comparePassword } from "@shared/utils/generateHash";
import { env } from "@shared/environment/env";

@injectable()
export class AuthService {
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(MessageError.USER_NOT_FOUND);
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(MessageError.INCORRECT_PASSWORD);
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const secret: string = env.JWT_SECRET as string;
    const options: SignOptions = {
      expiresIn: Number(env.ACCESS_TOKEN_EXPIRES),
    };

    const accessToken = sign(payload, secret, options);

    console.log("[auth.service]", accessToken);

    return accessToken;
  }
}
