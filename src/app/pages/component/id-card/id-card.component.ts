import { Component } from '@angular/core';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.css'
})
export class IdCardComponent {
  showUserProfileData:any=null;
  constructor(private userService:UserAuthService,){
    this.showUserProfile()
  }
  showUserProfile(){
    this.userService.getuserDataLogin().subscribe((res)=>{
      console.log(res);
      this.showUserProfileData=res.data;
      console.log(this.showUserProfileData);
    })  
  }
}
