export interface Comments {
  id: string;
  content: string;
  user: {
    name: string;
  };
  createdAt: Date;
}
