import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "src/app/services/student.service";
import { Student } from "../student";

@Component({
  selector: "app-update-student",
  templateUrl: "./update-student.component.html",
  styleUrls: ["./update-student.component.css"],
})
export class UpdateStudentComponent implements OnInit {
  student: Student = new Student();
  edit: Student;
  submitted = false;
  key: string = this.route.snapshot.paramMap.get("id");

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.studentService.getStudent(this.key).subscribe((data: Student) => {
      this.edit = data;
      this.student.name = data.name;
      this.student.age = data.age;
    });
  }

  editStudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  save() {
    this.studentService.updateStudent(this.key, this.student);
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
