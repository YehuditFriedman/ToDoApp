import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { ITodoItem } from 'models/ITodoItem';
import { TodoItemInput } from '../types/TodoItemInput';
import { AppsyncService } from '../appsync.service';
import gql from 'graphql-tag';
import { listTodos } from 'src/graphql/queries';
import { buildMutation } from 'aws-appsync';
import { createTodo } from 'src/graphql/mutations';
import { createTodoInput } from 'src/graphql/inputs';
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
    this.appsync.hc().then((client: any) => {
      const observable = client.watchQuery({
        query: gql(listTodos),
        fetchPolicy: 'cache-and-network'
      });
      observable.subscribe((data: any) => {
        this.allTodos = data?.allTodos?.items;

      });

    });
  }

  async Add() {
    let todo: ITodoItem = new TodoItemInput();
    todo.name = this.title;
    todo.body = this.body;
    todo.city = this.city;


    await API.graphql(graphqlOperation(createTodo, {input: todo}));
    const client = await this.appsync.hc();
    console.log("client", client);
    const result = await client.mutate(buildMutation(
      client,
      gql(createTodo),
      {
        inputType: gql(createTodoInput),
        variables: {
          input: {
            name: todo.name,
            body: todo.body,
            city: todo.city
          }
        }
      },
      _variables => [gql(listTodos)],
      "Todo"
    ))
    this.allTodos.push(result.data.createTodo);
    this.Reset(); 


  }

  private Reset(): void {
    this.title = '';
    this.body = '';
    this.city = '';
  }

}


