import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClubService } from '../../../core/services/club_service/club.service';
import * as alertify from 'alertifyjs';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { PopUpService } from '../../../core/popup/pop-up.service';
import { ActivatedRoute } from '@angular/router';
interface ClubData {
  Requested_Clubs: Club[];
  Accepted_Clubs: Club[];
  Rejected_Clubs: Club[];
}
interface Club {
  _id: string;
  joinedBy: string;
  clubName: string;
  reason: string;
  joinedDate: string;
  decision: string;
  // Add more properties as needed
}
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

  createFacultyForm!: FormGroup;
  createClubForm!: FormGroup;
  userRole: string | null | undefined;
  secretaryList: any[] = []
  JoinedClubbyClubName: ClubData = {
    Requested_Clubs: [],
    Accepted_Clubs: [],
    Rejected_Clubs: []
  };
  requestedJoinClub: any[] = []
  isEditMode: boolean = false;
  addClubId: string | null = null;
  clubListDataForm: any[] = []; 
  selectedClub: any = null;
  filteredClubList: any[] | undefined;



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
    this.clubForm.get('clubStatus')?.valueChanges.subscribe((value) => {
      this.filterClubNames(value);
    });
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
  
  filterClubNames(status: string) {
    if (status === 'Political' || status === 'Non-Political') {
      this.filteredClubList = this.clubListData.filter(club => club.clubStatus === status);
    } else {
      this.filteredClubList = this.clubListData; // Reset to full list if status is invalid
    }
  }

  clubList() {
    this.clubService.getClubList().subscribe((res) => {
      console.log(res.clubName);
      this.clubListData = res.clubName
      this.filteredClubList = this.clubListData; 

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
  onClubSelected(clubName: string) {
    this.selectedClub = this.clubListData.find(club => club.clubName === clubName);
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
      this.showJoinedClub = res
    })
  }

  showJoinedClubbyClubNameFunction() {
    this.clubService.getJoinedClubbyClubnameApi().subscribe((res) => {
      console.log(res + "joined club is ");
      this.JoinedClubbyClubName = res

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
  updateSponsorship(id: string, decision: string) {
    this.clubService.updateClubStatus(id, decision).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error updating sponsorship:', error);
      }
    );
  }

}
