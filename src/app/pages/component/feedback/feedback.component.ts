import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../core/services/feedback/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  feedbackForm!:FormGroup;
  feedbackTableData:any[]=[];
  constructor(private userData:UserAuthService, private formBuilder:FormBuilder,private feedbackService:FeedbackService){
    this.feedBackUserData()
    this.getFeedbackList()
  }
feedBackUserData(){
  this.userData.getuserDara().subscribe((res:any)=>{
    console.log(res);
  })
}
ngOnInit(): void {
  this.feedbackForm= this.formBuilder.group({
    feedbackGroup: ['', Validators.required],
    feedbackAbout: ['', Validators.required]
  });
}
onSubmit(){
  if (this.feedbackForm.valid) {
    const formValue = this.feedbackForm.value;
    console.log(formValue);
    this.feedbackService.postFeedbackData(formValue).subscribe((res)=>{
      console.log(res);
    })
    
  }
}
getFeedbackList(){
  this.feedbackService.getFeedbackData().subscribe((res)=>{
    console.log(res);
    this.feedbackTableData=res.feedback;
    debugger
  })
}

}
