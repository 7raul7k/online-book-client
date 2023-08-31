import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UpdateBookComponent} from "./components/update-book/update-book.component";

let NewStudentComponent;
const routes: Routes = [
  { path: "" , component: HomeComponent},
  { path: "add" , component: NewStudentComponent},
  { path: "update/:id" , component: UpdateBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
