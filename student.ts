import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentComponent implements OnInit {
  studentForm!: FormGroup;
  students: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: [''],
      name: [''],
      java: [''],
      python: ['']
    });

    this.loadStudents();
  }

  loadStudents() {
    this.http.get<any[]>('http://localhost:9090/view').subscribe(data => {
      this.students = data;
    });
  }

  saveStudent() {
    const student = this.studentForm.value;
    this.http.post('http://localhost:9090/save', student).subscribe(() => {
      this.loadStudents();
      this.studentForm.reset();
    });
  }

  editStudent(student: any) {
    this.studentForm.patchValue(student);
  }

  deleteStudent(id: number) {
    this.http.delete(`http://localhost:9090/del/${id}`).subscribe(() => {
      this.loadStudents();
    });
  }
}