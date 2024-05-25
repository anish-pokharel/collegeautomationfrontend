import { Component } from '@angular/core';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  constructor(private userData:UserAuthService){
    this.userData.getuserDara().subscribe((res: any)=>{
      console.log(res);
      debugger
    })
  }

}
