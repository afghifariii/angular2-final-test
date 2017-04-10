import { Routes, RouterModule } from "@angular/router";

import { ToDoFormComponent } from "./to-do-form/to-do-form.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";

const appRoutes: Routes = [
    {path: 'add', component: ToDoFormComponent},
    {path: '', pathMatch: 'full', redirectTo: 'all'}
];

export const routing = RouterModule.forRoot(appRoutes);