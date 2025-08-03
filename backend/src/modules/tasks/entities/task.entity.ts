import { TaskList } from "../../../modules/tasks-lists/entities/task-list.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;

  @ManyToOne(() => TaskList, {
    onDelete: "CASCADE",
  })
  list: TaskList;

  @CreateDateColumn({
    type: "timestamp with time zone",
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    name: "updated_at",
  })
  updatedAt: Date;
}
