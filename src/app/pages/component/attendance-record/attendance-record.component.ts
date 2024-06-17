import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpService } from '../../../core/services/otp-service/otp.service';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';

@Component({
  selector: 'app-attendance-record',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './attendance-record.component.html',
  styleUrl: './attendance-record.component.css'
})
export class AttendanceRecordComponent implements OnInit {
  enteredOtp: string | undefined;
  enteredSubject: string | undefined;
  enteredDate: string | undefined;
  enteredRemarks: string | undefined;
  verified = false;
  invalidOtp = false;
  error = '';
 

  userRole: string | null | undefined;
  enrollmentDatabyEnrolledsubject: any[] = [] 
  studentAttendance: any[] = [] 
  email!: string;
  otp!: string;
  name!: string;



  constructor(private formBuilder: FormBuilder, private otpService: OtpService,
    private enrollmentservice: EnrollmentService,private userService:UserAuthService
  ) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.enrollmentservice.getenrollmentDatabyEnrolledsubject().subscribe((res) => {
      console.log(res);
      this.enrollmentDatabyEnrolledsubject = res.users
    })
    this.userService.getuserDataLogin().subscribe((res)=>{
      console.log(res);
      res.data
      // this.studentId =  res.data._id;
        this.name =  res.data.name;
        this.email =  res.data.email;
        // this.rollno =  res.data.rollno;
        // this.subject =  res.data.subject;
        // this.remarks =  res.data.remarks;
    })
    this.otpService.getAttendance().subscribe((student) => {
      this.studentAttendance = student.attendance;

    })
  }
  
 

  submitAttendance() {

  }

  
  sendOtp(item: any): void {
    const obj = {
      studentId: item.rollno,
      email: item.email
    };
    this.otpService.sendOtp(obj).subscribe(
      response => {
        console.log('OTP sent successfully', response);
      },
      error => {
        console.error('Error sending OTP', error);
      }
    );
  }
  verifyOTP() {
    this.otpService.verifyOtp(this.email, this.otp)
      .subscribe(
        response => {
          console.log('Attendance marked successfully');
          // Handle success (e.g., show confirmation to user)
        },
        error => {
          console.error('Error marking attendance:', error);
          // Handle error (e.g., show error message to user)
        }
      );
  }
}
//   verifyOtp(){
//     this.otpService.verifyOtp({
     
//       Name: this.name,
//       Email: this.email,
//       Rollno: this.rollno,
//       Subject: this.enteredSubject,
//       Remarks: this.enteredRemarks,
//       Date: this.enteredDate,
//       EnteredOtp: this.enteredOtp,
    
//     })
//     .subscribe(
//       (response) => {
//         this.verified = true;
//         this.invalidOtp = false;
//         this.error = '';
//       },
//       (error) => {
//         if (error.status === 400) {
//           this.invalidOtp = true;
//           this.error = '';
//         } else {
//           this.error = error.error;
//         }
//       }
//     );
// }

  
 