import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { Student } from "../student";

@Component({
  selector: "app-student-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"],
})
export class StudentsListComponent implements OnInit {
  students: Student[];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudentsList().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  getStudentsList() {}

  deleteStudents() {
    // this.studentService.deleteAll();
    this.studentService.deleteAll(this.students);
  }
}
