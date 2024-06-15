import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../../core/services/department-service/department.service';
import { ClubService } from '../../../core/services/club_service/club.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userData:any[]=[];
  showUserProfileData:any=null;
  clubList:any[]=[]
  formProfile!:FormGroup;
  userRole: string|null | undefined;
constructor(private userService:UserAuthService,private clubService:ClubService ,private formBuilder:FormBuilder ){

  this.formProfile = this.formBuilder.group({
    photo: [null, Validators.required], // Assuming you handle file upload separately
    address: ['', Validators.required],
    biography: [''],
    facebook: [''],
    instagram: [''],
    whataspp: [''],
    website: ['']
  });

}
  ngOnInit(): void {
  this.userService.getuserDara().subscribe((res)=>{
    console.log("the response is "+res);
    this.userData=res.userData
    console.log('hello'+this.userData);
    console.log(this.userData);
    debugger
  })
  this.userRole =localStorage.getItem('userRole')

  this.showUserProfile();
  this.showClub();
}

showUserProfile(){
  this.userService.getuserDataLogin().subscribe((res)=>{
    console.log(res);
    this.showUserProfileData=res.data;
    console.log(this.showUserProfileData);
  })  
}

showClub(){
  this.clubService.getClubList().subscribe((res)=>{
    console.log(res);
    this.clubList=res.clubName
  })
}
editClub(clubId:string){}
deleteClub(clubId:string){
  this.clubService.delDeleteClubList(clubId).subscribe((res)=>{
    console.log(res);
    this.showClub()
  })
}
submitProfileForm(){}
}
