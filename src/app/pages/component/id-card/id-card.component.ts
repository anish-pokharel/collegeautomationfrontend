import { Component } from '@angular/core';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.css'
})
export class IdCardComponent {
  showUserProfileData:any=null;
  enrollForm!: FormGroup;

  constructor(private userService:UserAuthService,private formBuilder: FormBuilder){
    this.showUserProfile()
  }
  ngOnInit(): void {
    this.enrollForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      department: ['', Validators.required],
      rollno: ['', Validators.required],
      reason: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required]
    });
  }
  showUserProfile(){
    this.userService.getuserDataLogin().subscribe((res)=>{
      console.log(res);
      this.showUserProfileData=res.data;
      console.log(this.showUserProfileData);
    })  
  }
  onSubmit(): void {
    if (this.enrollForm.valid) {
      console.log('Form values:', this.enrollForm.value);

    } else {
      alert('Form is not valid. Please fill all required fields.');
    }
  }
}
