import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { StudentDetailsComponent } from "./students/student-details/student-details.component";
import { StudentsListComponent } from "./students/students-list/students-list.component";
import { CreateStudentComponent } from "./students/create-student/create-student.component";
import { StudentService } from "./services/student.service";
import { UpdateStudentComponent } from "./students/update-student/update-student.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentDetailsComponent,
    StudentsListComponent,
    CreateStudentComponent,
    UpdateStudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [StudentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
