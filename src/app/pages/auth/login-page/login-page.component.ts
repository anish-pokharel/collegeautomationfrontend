import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { CommonModule } from '@angular/common';
import * as alertify from 'alertifyjs';
import { PasswordService } from '../../../core/services/password.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  showForgotPasswordModal: boolean = false;
  token: string | null = null;


  constructor(
    private userSignIn: UserAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private passwordResetService: PasswordService

  ) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.route.queryParams.subscribe((params: any) => {
      this.token = params['token'] || null;
      if (this.token) {
        this.showForgotPasswordModal = true;
      }
    });

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

// Open the Forgot Password modal
  openForgotPasswordModal(): void {
    this.showForgotPasswordModal = true;
  }

  // Close the Forgot Password modal
  closeForgotPasswordModal(): void {
    this.showForgotPasswordModal = false;
    this.forgotPasswordForm.reset();
  }
  submitForgotPassword() {
    if (this.token) {
      const { newPassword, confirmPassword } = this.forgotPasswordForm.value;
      this.passwordResetService.resetPassword(this.token, newPassword, confirmPassword).subscribe(
        response => {
          alert('Password reset successful');
          this.showForgotPasswordModal = false;
          this.router.navigate(['/login']);
        },
        error => {
          alert('Failed to reset password');
        }
      );
    } else {
      const { email } = this.forgotPasswordForm.value;
      this.passwordResetService.requestResetPassword(email).subscribe(
        response => {
          alert('Password reset link sent to your email');
          this.showForgotPasswordModal = false;
        },
        error => {
          alert('Failed to send password reset link');
        }
      );
    }
  }

}
