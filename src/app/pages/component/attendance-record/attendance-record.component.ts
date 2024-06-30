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
  enteredDateOtp!: string;




  constructor(private formBuilder: FormBuilder, private otpService: OtpService,
    private enrollmentservice: EnrollmentService,private userService:UserAuthService
  ) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.enrollmentservice.getenrollmentDatabyEnrolledsubject().subscribe((res) => {
      console.log(res);
      this.enrollmentDatabyEnrolledsubject = res.users
      debugger
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
  sendAllOtps(): void {
    this.enrollmentDatabyEnrolledsubject.forEach(item => {
      const obj = {
        studentId: item.rollno,
        email: item.email
      };
      this.otpService.sendOtp(obj).subscribe(
        response => {
          console.log(`OTP sent successfully to ${item.email}`, response);
        },
        error => {
          console.error(`Error sending OTP to ${item.email}`, error);
        }
      );
    });
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
        },
        error => {
          console.error('Error marking attendance:', error);
        }
      );
  }
}

 