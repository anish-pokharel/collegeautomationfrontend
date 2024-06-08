import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClubService } from '../../../core/services/club_service/club.service';

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

constructor(private http:HttpClient, private clubService:ClubService,private formBuilder:FormBuilder){
  this.clubList();

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
onSubmit(){
  if(this.clubForm.valid){
    this.clubService.postClub(this.clubForm.value).subscribe((res)=>{
      console.log(res);
      this.clubForm.reset()
      this.clubList()
    })
  }
  else{
    console.log('Please Enter The Valid Data');
  }

}


clubList(){
  this.clubService.getClubList().subscribe((res)=>{
    console.log(res.clubName);
    this.clubListData= res.clubName
  })
}



}
