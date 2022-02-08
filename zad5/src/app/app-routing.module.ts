import { CreateStudentComponent } from "./students/create-student/create-student.component";
import { StudentsListComponent } from "./students/students-list/students-list.component";
import { UpdateStudentComponent } from "./students/update-student/update-student.component";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "students", pathMatch: "full" },
  { path: "student/:id", component: UpdateStudentComponent },
  { path: "students", component: StudentsListComponent },
  { path: "add", component: CreateStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
