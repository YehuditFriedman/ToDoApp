import { Component, OnInit } from '@angular/core';
import { ITodoItem } from 'models/ITodoItem';
import { AppsyncService } from '../appsync.service';
import { TodoItemInput } from '../types/TodoItemInput';
import { updateTodo, deleteTodo } from '../../graphql/mutations';
import {updateTodoInput, deleteTodoInput} from '../../graphql/inputs';
import { listTodos } from '../../graphql/queries';
import gql from 'graphql-tag';
import { ApixuService } from '../apixu.service';
import { buildMutation } from 'aws-appsync';
import { API } from 'aws-amplify';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor(private appsync: AppsyncService, private apixuService: ApixuService) { }

  private inEdit = false;
  private inSave = false;
  allTodos: any;
  listFilter = 'dfd';
  Title = 'hello';
  title = 'sdf';
  Description = 'sleep and sleep';

  description = 'j';

  cities: String[] = ['Beit Shemesh', 'Jerusalem', 'Lod'];

  todos: ITodoItem[] = [{ id: "16", name: 'sleep', body: 'tomorrow', city: 'jerusalem', completed: false,temperature: '12' },
  { id: "164", name: 'smile', body: 'today', city: 'beit Shemesh', completed: true ,temperature: '22'}];


  ngOnInit(): void {
    this.appsync.hc().then((client: any) => {
      const observable = client.watchQuery({
        query: gql(listTodos),
        fetchPolicy: 'cache-and-network'
      });
      observable.subscribe((data: any) => {
        this.allTodos = data?.allTodos?.items;

      });
      this.allTodos.forEach((todo:any) => {
        if (todo.city) {
          this.apixuService.getWeather(todo.city).subscribe((data:any) => {
            todo.temperature =data.current.temperature
         })
        }
      });

    });
  }


  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }
  get InEdit(): boolean {
    return this.inEdit;
  }

  get InSave(): boolean {
    return this.inSave;
  }
  async Delete(id: any) {

    await API.graphql({
      query: deleteTodo,
      variables: {input: {ID: id}},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    // const client = await this.appsync.hc();
    // const result = await client.mutate(buildMutation(
    //   client,
    //   gql(updateTodo),
    //   {
    //     inputType: gql(updateTodoInput),
    //     variables: {
    //       input: {
    //         ID: id
    //       }
    //     },
    //   },
    //   _variables => [gql(listTodos)],
    //   "Todo"
    // ))
  }

  Cancel() {
    this.inEdit = false;
  }
  async Save(oneTodo: ITodoItem) {
    const todo: ITodoItem = new TodoItemInput();
    todo.completed = false;
    todo.name = oneTodo.name;
    todo.body = oneTodo.body;
    todo.city = oneTodo.city
    todo.id = oneTodo.id;



const client = await this.appsync.hc();
    console.log("client", client);
    const result = await client.mutate(buildMutation(
      client,
      gql(updateTodo),
      {
        inputType: gql(updateTodoInput),
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
  
    this.Edit(false);
  }
  
}