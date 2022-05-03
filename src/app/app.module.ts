import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApixuService } from "./apixu.service";
import {MatFormFieldModule,MatFormFieldControl} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';


import { MatCardModule} from '@angular/material/card';

import { AmplifyService } from 'aws-amplify-angular';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {AppsyncService} from './appsync.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TodoComponent } from './todo/todo.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TodoComponent,
    AddTaskComponent,
    ToDoListComponent,
    WeatherComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AmplifyService, NgbActiveModal, AppsyncService, ApixuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
