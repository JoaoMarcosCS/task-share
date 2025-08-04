export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  list: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    owner: {
      id: string;
    };
  };
}
