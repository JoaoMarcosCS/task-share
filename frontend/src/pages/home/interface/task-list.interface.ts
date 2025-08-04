export interface TaskList {
  createdAt: Date;
  id: string;
  owner: {
    email: string;
    name: string;
    id: string;
  };
  updatedAt: Date;
  title: string;
}
