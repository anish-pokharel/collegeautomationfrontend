import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SemesterEnrollComponent } from '../../../pages/component/semester-enroll/semester-enroll.component';
import { AcademicRecordsComponent } from '../../../pages/component/academic-records/academic-records.component';
import { AttendanceRecordComponent } from '../../../pages/component/attendance-record/attendance-record.component';
import { CourseEnrollComponent } from '../../../pages/component/course-enroll/course-enroll.component';
import { DiscussionComponent } from '../../../pages/component/discussion/discussion.component';
import { FeedbackComponent } from '../../../pages/component/feedback/feedback.component';
import { IdCardComponent } from '../../../pages/component/id-card/id-card.component';
import { JoinClubsComponent } from '../../../pages/component/join-clubs/join-clubs.component';
import { SettingComponent } from '../../../pages/component/setting/setting.component';
import { SponsorshipComponent } from '../../../pages/component/sponsorship/sponsorship.component';
import { AssignmentComponent } from '../../../pages/component/assignment/assignment.component';
import { CourseRecordComponent } from '../../../pages/teacher-component/course-record/course-record.component';
import { InternalRecordsComponent } from '../../../pages/teacher-component/internal-records/internal-records.component';
import { ModelQuestionComponent } from '../../../pages/teacher-component/model-question/model-question.component';
import { AssignmentMaterialsComponent } from '../../../pages/teacher-component/assignment-materials/assignment-materials.component';
import { StudentWorkComponent } from '../../../pages/teacher-component/student-work/student-work.component';
import { UserManagementComponent } from '../../../pages/admin-component/user-management/user-management.component';
import { EnrollmentKeyComponent } from '../../../pages/admin-component/enrollment-key/enrollment-key.component';
import { ProfileComponent } from '../../../pages/component/profile/profile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SemesterEnrollComponent,
    AcademicRecordsComponent, AttendanceRecordComponent, CourseEnrollComponent,
    DiscussionComponent, FeedbackComponent, IdCardComponent, JoinClubsComponent,
    SemesterEnrollComponent, SettingComponent, SponsorshipComponent, AssignmentComponent,
    AssignmentMaterialsComponent,CourseRecordComponent,FeedbackComponent,InternalRecordsComponent,
    ModelQuestionComponent,StudentWorkComponent,UserManagementComponent,
    EnrollmentKeyComponent,ProfileComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentSection: string = 'basic'
  constructor(private router: Router) {
    this.currentSection = 'attendance'
  }
  loginButton() {
    this.router.navigate(['login'])
  }
  registerButton() {
    this.router.navigate(['register'])
  }
  showSection(section: string): void {
    this.currentSection = section;

  }
  LogoutButton(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }



}
