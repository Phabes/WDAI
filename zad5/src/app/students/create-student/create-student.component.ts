import { Component, OnInit } from "@angular/core";

import { Student } from "../student";
import { StudentService } from "../../services/student.service";

@Component({
  selector: "app-create-student",
  templateUrl: "./create-student.component.html",
  styleUrls: ["./create-student.component.css"],
})
export class CreateStudentComponent implements OnInit {
  student: Student = new Student();
  submitted = false;

  constructor(private studentService: StudentService) {}

  ngOnInit() {}

  newStudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  save() {
    this.studentService.createStudent(this.student);
    this.student = new Student();
  }

  onSubmit() {
    if (this.isNum(this.student.age)) {
      this.submitted = true;
      this.save();
    }
  }

  isNum(val: number) {
    return !isNaN(val);
  }
}
