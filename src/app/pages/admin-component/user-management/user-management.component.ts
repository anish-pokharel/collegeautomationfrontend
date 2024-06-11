import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import * as alertify from 'alertifyjs';
import { ClubService } from '../../../core/services/club_service/club.service';
import { DepartmentService } from '../../../core/services/department-service/department.service';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  userForm!:FormGroup;
  clubForm!:FormGroup;
  showTeacherData:any[]=[];
  showTeacherCount:number=0;
  subjectListCount:number=0;
  showStudentData:any[]=[];
  showStudentCount:number=0;
  showSecretaryData:any[]=[];
  showSecretaryCount:number=0;
  
  constructor(private formBuilder:FormBuilder, private userService:UserAuthService,
    private clubService:ClubService,private departmentService:DepartmentService,
    private enrollmentService:EnrollmentService
  ){
      this.userService.getStudentData().subscribe((res)=>{
        this.showStudentCount=res.count
        this.showStudentData=res.student
      })
      this.userService.getSecretarytData().subscribe((res)=>{
        this.showSecretaryCount=res.count
        this.showSecretaryData=res.secretary
      })
    }
  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rollno: ['', ],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    })
    this.teacherData();
    this.getSubjectList()
    
  }
  createUser(){
    if(this.userForm.valid){
      const formData= this.userForm.value;
      console.log(formData);
      const passwordMatch=this.userForm.value.password=== this.userForm.value.confirmPassword;
      if(passwordMatch){
        this.userService.postuserRegister(this.userForm.value).subscribe((res)=>{
          console.log(res);
          alertify.success('User Added Sucessfully')
          this.userForm.reset();
          this.teacherData()
        })
      }
      else{
        alertify.error('Password Doesnot Match')
      }
    
    }
    else{
      console.error('Form is inavalid')
      alertify.error('Input Valid Form')
    }

  }
  teacherData(){
    this.userService.getTeacherData().subscribe((res)=>{
      this.showTeacherCount=res.count
      this.showTeacherData=res.faculty
    })
  }
  getSubjectList(){
    this.enrollmentService.getSubjectDataListAll().subscribe((res)=>{
      console.log(res);
      this.subjectListCount=res.count;
    })
  }
  
  
  
}
