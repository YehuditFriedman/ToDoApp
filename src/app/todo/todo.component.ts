import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APIService } from '../API.service';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { ITodoItem } from 'models/ITodoItem';
import { ITodoItemInput } from 'models/ITodoItemInput';
import { TodoItemInput } from '../types/TodoItemInput';
import { AppsyncService } from '../appsync.service';
import { buildMutation } from 'aws-appsync';
import { createTodoInput } from 'src/graphql/inputs';
import { createTodo } from '../../graphql/mutations';
import { listTodos } from '../../graphql/queries';
import gql from "graphql-tag";
import { DocumentNode } from 'graphql';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  @Input()
  Todo!: ITodoItem;
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();
  private inEdit = false;
  allTodos: any = [];
  showTask = false;

  constructor(private api: APIService, private appsync: AppsyncService) { }

  async ngOnInit() {
    this.appsync.hc().then((client: { watchQuery: (arg0: { query: DocumentNode; fetchPolicy: string; }) => any; }) => {
      const observable = client.watchQuery({
        query: gql(listTodos),
        fetchPolicy: 'cache-and-network'
      });
      // observable.subscribe(({}) => {
        
      // });
    })
    // then((client) => {
    //   const observable  = client.watchQuery({
    //     query: gql(listTodos),
    //     fetchPolicy: 'cache-and-network'
    //   })
    //   observable.subscribe(({data}) => {
    //     this.allTodos = data.listTodos.items;
    //   });
    // });
    // let result = await this.api.ListTodos();
    // this.allTodos = result.items;

    // this.api.OnCreateTodoListener.subscribe({
    //   next: (todo:any) => {
    //     let newTodo = todo.value.data.onCreateTodo;
    //     this.allTodos.push(newTodo);
    //   }
    // })
  }
  async createTodo(todoName: any) {
    if (todoName.value.length) {
      const client = await this.appsync.hc();
      const result = await client.mutate(buildMutation(
        client,
        gql(createTodo),
        {
          inputType: gql(createTodoInput),
          variables: {
            input: {
              name: todoName.value
            }
          }
        },
        _variables => [gql(listTodos)],
        "Todo"
      ))
      this.allTodos.push(result.data.createTodo);
      todoName.value = null;
      // const newTodo = {
      //   name: todoName.value,
      //   description: 'sample description'
      // }
      // await this.api.CreateTodo(newTodo);   

    }

  }
  async listTodos() {
    let result = await this.api.ListTodos();
    this.allTodos = result.items;
  }
  showNewTask() {
    this.showTask = !this.showTask;
  }



  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }

  get InEdit(): boolean {
    return this.inEdit;
  }

  Save() {
    const todo: ITodoItemInput = new TodoItemInput();
    todo.completed = false;
    todo.name = this.Todo.name;
    todo.body = this.Todo.body;
    todo.id = this.Todo.id;

    this.Edit(false);
  }

  Complete() {

    this.Edit(false);
    this.Todo.completed = true;
  }

  Delete() {

  }

}
