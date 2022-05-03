import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { ITodoItem } from 'models/ITodoItem';
import { TodoItemInput } from '../types/TodoItemInput';
import { AppsyncService } from '../appsync.service';
import { createTodo } from 'src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  allTodos: any;

  constructor(private api: APIService, private appsync: AppsyncService) {

  }
  body = "add description about the task";
  city = '';
  title = "add title task";
  submitted = false;
  completed = false;
  showTask = false;

  showNewTask() {
    this.showTask = !this.showTask;
  }



  ngOnInit() {
  }

  async Add() {
    let todo: ITodoItem = new TodoItemInput();
    todo.name = this.title;
    todo.body = this.body;
    todo.city = this.city;


    await API.graphql(graphqlOperation(createTodo, {input: todo}));
    this.allTodos.push(todo);
    this.Reset(); 


  }

  private Reset(): void {
    this.title = '';
    this.body = '';
    this.city = '';
  }

}


