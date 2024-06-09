import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClubService } from '../../../core/services/club_service/club.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-join-clubs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './join-clubs.component.html',
  styleUrl: './join-clubs.component.css'
})
export class JoinClubsComponent implements OnInit{
clubForm!:FormGroup
clubListData:any[]=[]
showJoinedClub:any

constructor(private http:HttpClient, private clubService:ClubService,private formBuilder:FormBuilder){
  this.clubList();
  this.showJoinedClubFunction()

}


  ngOnInit(): void {
    this.clubForm=this.formBuilder.group({
      joinedBy:[''],
      clubStatus:['',Validators.required],
      clubName:['',Validators.required],
      reason:['',Validators.required],
      joinedDate:['',],
    })
  
}
onJoin(){
  debugger
  if(this.clubForm.valid){
    this.clubService.postJoinClub(this.clubForm.value).subscribe((res)=>{
      console.log(res);
      this.clubForm.reset()
      alertify.success('Joined Club Requested ')
      this.clubList()
      this.showJoinedClubFunction();
      debugger
    })
  }
  else{
    console.log('Please Enter The Valid Data');
    alertify.error('Joined Club Failed ')
  }

}


clubList(){
  this.clubService.getClubList().subscribe((res)=>{
    console.log(res.clubName);
    this.clubListData= res.clubName
  })
}
showJoinedClubFunction(){
this.clubService.getClubListByEmail().subscribe((res)=>{
  console.log(res+"joined club is ");
  this.showJoinedClub=res.JoinedClubs;
})
}


}
