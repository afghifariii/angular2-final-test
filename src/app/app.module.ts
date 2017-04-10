import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoListService } from "./to-do-list/to-do-list.service";
import { MockXHRBackend } from "./mock-xhr-backend";
import { ToDoFormComponent } from './to-do-form/to-do-form.component';
import { lookupListToken, lookupLists } from "./provider";
import { routing } from "./app.routing";
import { PriorityListPipe } from "./to-do-list/priority-list.pipe";
import { HoverDirective } from "./hover.directive";

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoComponent,
    ToDoFormComponent,
    PriorityListPipe,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    HttpModule
  ],
  providers: [ToDoListService, {provide: XHRBackend, useClass: MockXHRBackend}, { provide: lookupListToken, useValue: lookupLists }],
  bootstrap: [AppComponent]
})
export class AppModule { }
