import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-semester-enroll',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './semester-enroll.component.html',
  styleUrl: './semester-enroll.component.css'
})
export class SemesterEnrollComponent implements OnInit{
  enrollmentKeyForm!:FormGroup
  subject:any[]=[];
  enrollmentData: any;
  email:string='';
constructor(private formBuilder:FormBuilder, private enrollmentService:EnrollmentService){
  this.enrollSubject();
  this.semSubject()
  
}

ngOnInit(): void {
  this.enrollmentKeyForm= this.formBuilder.group({
    enrollment_key :['', Validators.required],
    userEmail:['']
  })

}
enrollSubject(){
  console.log(this.subject);
  debugger
}
enrollButton(){
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  if(this.enrollmentKeyForm.valid){
    console.log(this.enrollmentKeyForm.value);
    this.enrollmentService.postEnrollmentJoin(this.enrollmentKeyForm.value).subscribe((res)=>{
      if(res.matchEnrollmentKey){
      
        alertify.success('Enrollment key added ')
        this.semSubject()
        debugger
      }
      else{
        alertify.error('Enrollment key Doesnot Found')
      }
    })
  }
  else{
    alertify.error('Please enter the valid Enrollment Key')
  }
}
semSubject(){

    this.enrollmentService.getEnrollmentDataByEmail().subscribe((data)=>{
      this.subject=data
      console.log("Subject is "+this.subject);
      this.enrollmentData = data;
    })
}

}
