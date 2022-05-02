import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodoItem } from 'models/ITodoItem';
import { ITodoItemInput } from 'models/ITodoItemInput';
import { Task } from '../types/Task';
import { TodoItemInput } from '../types/TodoItemInput';

@Component({
  selector: 'app-card-todo',
  templateUrl: './card-todo.component.html',
  styleUrls: ['./card-todo.component.css']
})
export class CardTodoComponent implements OnInit {

  constructor() { }

  private inEdit = false;
  listFilter = 'dfd';
  Title = 'hello';
  title = 'sdf';
  Description = 'sleep and sleep';
  description = 'j';

  // todos: Task[] = [{id: 16,  name: 'sleep', body: 'tomorrow', city:'jerusalem', completed: false},
  // {id: 16,  name: 'smile', body: 'today', city:'beit Shemesh', completed: true}];


  ngOnInit(): void {
  }


  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }
  get InEdit(): boolean {
    return this.inEdit;
  }
  Delete() {
    alert('task is deleted');
  }


  @Input()
  Todo!: ITodoItem;
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  Save() {
    // const todo: ITodoItemInput = new TodoItemInput();
    // todo.completed = false;
    // todo.name = this.Todo.name;
    // todo.body = this.Todo.body;
    // todo.city = this.Todo.city
    // todo.id = this.Todo.id;

    this.Edit(false);
  }

  Complete() {

    this.Edit(false);
    this.Todo.completed = true;
  }
}
