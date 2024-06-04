import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-semester-enroll',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './semester-enroll.component.html',
  styleUrl: './semester-enroll.component.css'
})
export class SemesterEnrollComponent implements OnInit{
  enrollmentKeyForm!:FormGroup
constructor(){}

ngOnInit(): void {
  
}
}
