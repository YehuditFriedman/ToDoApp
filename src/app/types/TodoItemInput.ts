
export class TodoItemInput {
  id?: string | null;
  name!: string;
  body?: string | null;
  city?: string | null;
  temperature?: string | null;
  completed?: boolean | null;
}