import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  showTask = false;

  constructor() { }

  async ngOnInit() {
  }
  showNewTask() {
    this.showTask = !this.showTask;
  }
}
