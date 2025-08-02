import { DataSource } from "typeorm";
import { env } from "../../shared/environment/env";
import { User } from "../../modules/users/entities/user.entity";
import { TaskList } from "../../modules/tasks-lists/entities/task-list.entity";
import { ListShare } from "../../modules/tasks-lists/entities/list-share.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [User, TaskList, ListShare],
  migrations: ["src/infra/database/migrations/*.ts"],
  migrationsTableName: "migrations",
});
