import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance-record',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './attendance-record.component.html',
  styleUrl: './attendance-record.component.css'
})
export class AttendanceRecordComponent  implements OnInit {
  attendanceForm!: FormGroup;
  userRole: string|null | undefined;

  students = [
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
    // Add more students as needed
  ];

  constructor(private formBuilder: FormBuilder) { }

 
  ngOnInit(): void {
    const formControls: { [key: number]: FormControl } = {};
    this.students.forEach(student => {
      formControls[student.id] = new FormControl(false);
    });

    this.attendanceForm = new FormGroup(formControls);
  }

  submitAttendance() {
    // Handle form submission (save attendance data)
    console.log(this.attendanceForm.value);
    // You can send this data to your backend to store in your database
  }
}