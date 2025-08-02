import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";
import { UserService } from "../services/user.service";
import { validateWithZod } from "@shared/utils/validate-with-zod";
import { CreateUserSchema } from "../dto/create-user.dto";
import { UpdateUserSchema } from "../dto/update-user.dto";
import { FindUserByEmailSchema } from "../dto/find-user-by-email.dto";

@injectable()
export class UserController {
  constructor(
    @inject("UserService")
    private userService: UserService
  ) {}

  async create(req: Request, res: Response) {
    const safeData = validateWithZod(CreateUserSchema, req.body);

    const result = await this.userService.createUser(safeData);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const safeData = validateWithZod(UpdateUserSchema, req.body);

    const result = await this.userService.updateUser(id, safeData);

    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.userService.findById(id);

    return res.status(200).json(user);
  }

  async findByEmail(req: Request, res: Response) {
    const { email } = req.query;

    const safeData = validateWithZod(FindUserByEmailSchema, { email });

    const users = await this.userService.findByEmail(safeData.email);

    return res.status(200).json(users);
  }
}
