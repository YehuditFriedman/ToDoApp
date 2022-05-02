import { Component, OnInit } from '@angular/core';
import { ITodoItemInput } from 'models/ITodoItemInput';
import { Task } from '../types/Task';
import { TodoItemInput } from '../types/TodoItemInput';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor() { }

  private inEdit = false;
  private inCancel = false;
  private inSave = false;
  listFilter = 'dfd';
  Title = 'hello';
  title = 'sdf';
  Description = 'sleep and sleep';
  description = 'j';

  cities: String[] = ['Beit Shemesh', 'Jerusalem', 'Lod'];

  todos: Task[] = [{ id: "16", name: 'sleep', body: 'tomorrow', city: 'jerusalem', completed: false },
  { id: "164", name: 'smile', body: 'today', city: 'beit Shemesh', completed: true }];


  ngOnInit(): void {
  }


  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }
  get InEdit(): boolean {
    return this.inEdit;
  }

  get InCancel(): boolean {
    return this.inCancel;
  }
  get InSave(): boolean {
    return this.inSave;
  }
  Delete() {
    alert('task is deleted');
  }

  Cancel(inCancel: boolean) {
    this.inCancel = inCancel
  }
  Save(inSave: boolean) {
    this.inSave = inSave;
    const todo: ITodoItemInput = new TodoItemInput();
    todo.completed = false;
    todo.name = this.todos[1].name;
    todo.body = this.todos[1].body;
    todo.city = this.todos[1].city
    todo.id = this.todos[1].id;
  
    this.Edit(false);
  }
  
}
