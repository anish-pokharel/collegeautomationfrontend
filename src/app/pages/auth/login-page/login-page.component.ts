import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { CommonModule } from '@angular/common';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private userSignIn: UserAuthService,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.checkUserToken()
  }
  checkUserToken(): void {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.router.navigate(['/dashboard']);
    }
  }
  loginButton(){
    if(this.loginForm.valid){
      debugger
      this.userSignIn.postUserSignIn(this.loginForm.value).subscribe((res)=>{
        debugger
        if (res && res.message === 'Login Sucessfull'){
          console.log(res);
          console.log(this.loginForm.value)
          console.log(this.loginForm)
          localStorage.setItem('userData',JSON.stringify(this.loginForm.value));
          localStorage.setItem('userRole',res.role)
          // localStorage.setItem('userRole',JSON.stringify(res.role))
          // localStorage.setItem('userToken',JSON.stringify(res.token))
          localStorage.setItem('userToken',res.token)
          debugger
          this.router.navigate(['/dashboard'])
          
          alertify.success('Login  Sucessfull')
        }
        else{
          alertify.error('enter Valid username and password')

        }
      })
    }
    else{
      alertify.error('error')
    }
  }



}
