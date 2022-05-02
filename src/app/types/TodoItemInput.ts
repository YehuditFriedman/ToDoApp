import { ITodoItemInput } from '../../../models/ITodoItemInput';

export class TodoItemInput implements ITodoItemInput {
  id?: string | null;
  name!: string;
  body?: string | null;
  city?: string | null;
  completed?: boolean | null;
}