import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Student } from "../students/student";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  students: Observable<Student[]>;

  constructor(
    private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.students = this.store
      .collection("students")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Student;
            data.key = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  createStudent(student: Student): void {
    this.store
      .collection("students")
      .add({ age: student.age, name: student.name });
  }

  // updateStudent(key: string, value: any) {
  updateStudent(key: string, student: Student) {
    this.store
      .collection("students")
      .doc(key)
      .update({ name: student.name, age: student.age });
  }

  deleteStudent(key: string) {
    // this.store.doc(`students/${key}`).delete();
    this.store.collection("students").doc(key).delete();
  }

  getStudentsList(): Observable<Student[]> {
    return this.students;
  }

  getStudent(key: string): Observable<Student> {
    let result = this.store.doc("students/" + key);
    return result.valueChanges();
  }

  // deleteAll() {
  deleteAll(students: Student[]) {
    for (const student of students) {
      this.store.collection("students").doc(student.key).delete();
    }
  }
}
