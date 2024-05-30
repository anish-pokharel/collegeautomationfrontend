import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-enrollment-key',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './enrollment-key.component.html',
  styleUrl: './enrollment-key.component.css'
})
export class EnrollmentKeyComponent implements OnInit {
  enrollmentForm!:FormGroup;
// subjects:any[]=[{name :'',credit:'', code:''}]

constructor(private formBuilder:FormBuilder,
  private enrollmentService:EnrollmentService

){
  this.enrollmentForm = this.formBuilder.group({
    enrollmentKey: ['', Validators.required],
    subjects: this.formBuilder.array([this.createSubject()])
  });


}
ngOnInit(): void {
  
}
createSubject(): FormGroup {
  return this.formBuilder.group({
    name: ['', Validators.required],
    credit: ['', Validators.required],
    code: ['', Validators.required]
  });
}

get subjects(): FormArray {
  return this.enrollmentForm.get('subjects') as FormArray;
}

addSubject(): void {
  this.subjects.push(this.createSubject());
}

submitForm() {
console.log('object');
alertify.success('button is clicked')
const check = this.enrollmentForm.valid
debugger
if (this.enrollmentForm.valid) {
  console.log(this.enrollmentForm.value);
  this.enrollmentService.postEnrollment(this.enrollmentForm.value).subscribe((res) => {
    if (res) {
      console.log(res);
      alertify.success('Enrollment is added');
    } else {
      alertify.error('Response is empty');
    }
  });
} else {
  alertify.error('Sorry, the form is invalid');
}
}
}