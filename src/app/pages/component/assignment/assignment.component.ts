import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent {
  assignmentForm!:FormGroup
  constructor(private formBuilder:FormBuilder ){
  }
  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      subject: ['', Validators.required],
      assignment: ['', Validators.required],
      assignmentFile: ['', Validators.required],
      rollno: ['', Validators.required],
     
    });
  }
  onSubmit(){
    console.log('BUTTON IS CLCJFAHJ');
    console.log(this.assignmentForm.value);
  }
}
