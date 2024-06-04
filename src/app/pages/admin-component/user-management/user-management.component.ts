import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import * as alertify from 'alertifyjs';
import { ClubService } from '../../../core/services/club_service/club.service';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  userForm!:FormGroup;
  clubForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private userService:UserAuthService,private clubService:ClubService){}
  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // rollno: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    })
    this.clubFormData();
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
  clubFormData(){
    this.clubForm= this.formBuilder.group({
      clubStatus:['',Validators.required],
      clubName:['',Validators.required]
    })
  }
  createClub(){
    if(this.clubForm.valid){
      console.log(this.clubForm.value);
      this.clubService.postClub(this.clubForm.value).subscribe((res)=>{
        console.log(res);
        alertify.success("Club added")
      })
    }
    else{
      alertify.error('Input valid Form')
    }

  }
}
