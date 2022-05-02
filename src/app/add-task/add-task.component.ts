import { Task } from '../../app/types/Task';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { Guid } from 'guid-typescript';
import { ITodoItemInput } from 'models/ITodoItemInput';
import { TodoItemInput } from '../types/TodoItemInput';
import { AppsyncService } from '../appsync.service';
import gql from 'graphql-tag';
import { listTodos } from 'src/graphql/queries';
import { buildMutation } from 'aws-appsync';
import { createTodo } from 'src/graphql/mutations';
import { createTodoInput } from 'src/graphql/inputs';
import { DocumentNode } from 'graphql';

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
  Description = ''

  model = new Task("18", this.title, this.body, this.city, this.completed);

  

  async onSubmit() { 
    const newTodo = {
      name: this.title,
      body: this.body,
    }
    await this.api.CreateTodo(newTodo);
    this.submitted = true;
   }
   showNewTask() {
     this.showTask = !this.showTask;
   }

   

  ngOnInit() {
    this.appsync.hc().then((client: { watchQuery: (arg0: { query: DocumentNode; fetchPolicy: string; }) => any; }) => {
      const observable = client.watchQuery({
        query: gql(listTodos),
        fetchPolicy: 'cache-and-network'
      });
      // observable.subscribe(({data}) => {
      //   this.allTodos =data.allTodos.items;
        
      // });
    })

  }

  async Add() {let todo: ITodoItemInput = new TodoItemInput();
    todo.completed = false;
    todo.id = Guid.create().toString();
    todo.name = this.title;
    todo.body = this.body;
    todo.city =this.city;

    // await this.api.CreateTodo(todo);      
    // this.Reset();



      const client = await this.appsync.hc();
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
      // const newTodo = {
      //   name: todoName.value,
      //   description: 'sample description'
      // }
      // await this.api.CreateTodo(newTodo);   


  }

  private Reset(): void {
    this.title = ``;
    this.body = ``;
  }

}















// import { APIService } from '../API.service';
// import { Apollo } from 'apollo-angular';
// import gql from 'graphql-tag';
// import { Guid } from 'guid-typescript';
// import { ITodoItemInput } from '../../../models/ITodoItemInput';
// import { TodoItemInput } from '../../app/types/todoItemInput';

// @Component({
//   selector: 'app-add-task',
//   templateUrl: './add-task.component.html',
//   styleUrls: ['./add-task.component.css']
// })
// export class AddTaskComponent implements OnInit {

//   name!: string;
//   body?: string;
//   constructor(private api: APIService) { }

//   ngOnInit(): void {
//   }

//   async Add() {
//     const todo: ITodoItemInput = new TodoItemInput();
//     todo.completed = false;
//     todo.id = Guid.create().toString();
//     todo.CreationDate = new Date();
//     todo.name = this.name;
//     todo.body = this.body;


//     await this.api.CreateTodo(todo);



//     this.Reset();
//   }

//   private Reset(): void {
//     this.name = ``;
//     this.body = ``;
//   }

// }


