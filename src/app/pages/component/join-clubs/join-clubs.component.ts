import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClubService } from '../../../core/services/club_service/club.service';
import * as alertify from 'alertifyjs';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { PopUpService } from '../../../core/popup/pop-up.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-clubs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './join-clubs.component.html',
  styleUrl: './join-clubs.component.css'
})
export class JoinClubsComponent implements OnInit {
  clubForm!: FormGroup
  clubListData: any[] = []
  showJoinedClub: any
  showJoinedClubRejected: any
  showJoinedClubAccepted: any
  createFacultyForm!: FormGroup;
  createClubForm!: FormGroup;
  userRole: string | null | undefined;
  secretaryList: any[] = []
  JoinedClubbyClubName: any[] = []
  requestedJoinClub: any[] = []
  isEditMode: boolean = false;
  addClubId: string | null = null;



  constructor(private http: HttpClient, private clubService: ClubService, private formBuilder: FormBuilder
    , private userService: UserAuthService, private confirmationService: PopUpService,
    private route: ActivatedRoute,) {
    this.clubList();
    this.showJoinedClubFunction();
    this.createClubForm = this.formBuilder.group({
      clubStatus: ['', Validators.required],
      clubName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      contactEmail: ['', Validators.required],
      createdDate: ['']
    })
  }
  ngOnInit(): void {
    this.clubForm = this.formBuilder.group({
      joinedBy: [''],
      clubStatus: ['', Validators.required],
      clubName: ['', Validators.required],
      reason: ['', Validators.required],
      joinedDate: ['',],
      decision: ['Pending']
    })
    this.userRole = localStorage.getItem('userRole')
    this.getClubEmail();
    this.showJoinedClubbyClubNameFunction();
    this.addClubId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.addClubId;

  }
  createClub() {
    console.log('button is clicked'); 
    if (this.createClubForm.valid) {


      if (this.isEditMode && this.addClubId) {
        this.clubService.updateClubList(this.addClubId, this.createClubForm.value).subscribe(res => {
          alertify.success("Discussion updated");
          this.clubList();
          this.createClubForm.reset();
        }, error => {
          console.error('Error updating discussion:', error);
          alertify.error("Error updating discussion");
          this.createClubForm.reset();
        });
      }
      else{


      console.log(this.createClubForm.value);
      this.clubService.postAddClub(this.createClubForm.value).subscribe((res) => {
        console.log(res);
        alertify.success("Club added")
        this.createClubForm.reset();
        this.clubList()
      })
    }
  }
    else {
      alertify.error('Input valid Form')
    }
  }
  clubList() {
    this.clubService.getClubList().subscribe((res) => {
      console.log(res.clubName);
      this.clubListData = res.clubName
    })
  }
  editClub(clubId: string) {
    console.log(clubId+'hello');
    debugger
    this.clubService.getClubListById(clubId).subscribe((res) => {
      if (!res) {
        this.confirmationService.showErrorMessage('Club is Not Found')
      }
      this.isEditMode = true;
      this.addClubId = clubId;
      this.createClubForm.patchValue({
        clubStatus: res.clubStatus,
        clubName: res.clubName,
        contactNumber: res.contactNumber,
        contactEmail: res.contactEmail,
        createdDate: res.createdDate,
      })
      debugger
      console.log('Form values patched:', this.createClubForm.value);

    })
    debugger

  }
  async deleteClub(clubId: string) {
    const confirmed = await this.confirmationService.showConfirmationPopup()
    if (confirmed) {
      this.clubService.delDeleteClubList(clubId).subscribe((res) => {
        console.log(res);
        alertify.success('Club is deleted Sucessfully')
        this.clubList();
      })
    }
    else {
      this.confirmationService.showErrorMessage('Sorry, Cannot be Delete')
    }

  }

 
  onJoin() {
    debugger
    if (this.clubForm.valid) {
      this.clubService.postJoinClub(this.clubForm.value).subscribe((res) => {
        console.log(res);
        this.clubForm.reset()
        alertify.success('Joined Club Requested ')

        this.showJoinedClubFunction();
        debugger
      })
    }
    else {
      console.log('Please Enter The Valid Data');
      alertify.error('Joined Club Failed ')
    }

  }



  showJoinedClubFunction() {
    this.clubService.getClubListByEmail().subscribe((res) => {
      console.log(res + "joined club is ");
      this.showJoinedClub = res.Requested_Clubs;
      this.showJoinedClubAccepted = res.Accepted_Clubs
      this.showJoinedClubRejected = res.Rejected_Clubs
    })
  }

  showJoinedClubbyClubNameFunction() {
    this.clubService.getJoinedClubbyClubnameApi().subscribe((res) => {
      console.log(res + "joined club is ");
      this.JoinedClubbyClubName = res.Requested_Clubs

      debugger

    })
  }

  getClubEmail() {
    this.userService.getSecretarytData().subscribe((res) => {
      console.log(res);
      this.secretaryList = res.secretary;
      debugger
    })
  }
  deleteRequest(RequestId: string) { }

}
