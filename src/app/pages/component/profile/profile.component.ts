import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userData:any[]=[];
  showUserProfileData:any=null;
constructor(private userService:UserAuthService ){}
  ngOnInit(): void {
  this.userService.getuserDara().subscribe((res)=>{
    console.log("the response is "+res);
    this.userData=res.userData
    console.log('hello'+this.userData);
    console.log(this.userData);
    debugger
  })
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
