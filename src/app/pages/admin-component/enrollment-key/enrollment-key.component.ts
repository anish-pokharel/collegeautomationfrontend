import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-enrollment-key',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './enrollment-key.component.html',
  styleUrl: './enrollment-key.component.css'
})
export class EnrollmentKeyComponent implements OnInit {
  enrollmentForm!:FormGroup;
subjects:any[]=[{name :'',credit:'', code:''}]

constructor(private formBuilder:FormBuilder){}
ngOnInit(): void {
  
}

  addInputField() {
   this.subjects.push({name :'',credit:'', code:''})
  }

  submitForm() {
    console.log('Submitted subjects:', this.subjects);
   
}
}