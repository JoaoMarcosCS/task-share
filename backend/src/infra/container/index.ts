import { IUserRepository } from "@modules/users/repository/IUserRepository";
import { UserRepository } from "@modules/users/repository/user.repository";
import { UserService } from "@modules/users/services/user.service";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);

container.registerSingleton("UserService", UserService);
