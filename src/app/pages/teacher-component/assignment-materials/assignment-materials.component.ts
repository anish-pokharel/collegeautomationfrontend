import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment-materials',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './assignment-materials.component.html',
  styleUrl: './assignment-materials.component.css'
})
export class AssignmentMaterialsComponent implements OnInit {

  assignmentForm!:FormGroup;
  constructor(private formBuilder:FormBuilder ){
  }
  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      subject: ['', Validators.required],
      assignment: ['', Validators.required],
      assignmentFile: ['', Validators.required],
      rollno: ['', Validators.required],
      remarks: ['', Validators.required],
    });
  }
  onSubmit(){
    console.log('BUTTON IS CLCJFAHJ');
    console.log(this.assignmentForm);
  }


  
}