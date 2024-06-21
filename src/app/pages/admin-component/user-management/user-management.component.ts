import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import * as alertify from 'alertifyjs';
import { ClubService } from '../../../core/services/club_service/club.service';
import { DepartmentService } from '../../../core/services/department-service/department.service';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { PopUpService } from '../../../core/popup/pop-up.service';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  userForm!: FormGroup;
  clubForm!: FormGroup;
  showTeacherData: any[] = [];
  showTeacherCount: number = 0;
  subjectListCount: number = 0;
  showStudentData: any[] = [];
  showStudentCount: number = 0;
  showSecretaryData: any[] = [];
  showSecretaryCount: number = 0;

  constructor(private formBuilder: FormBuilder, private userService: UserAuthService,
    private clubService: ClubService, private departmentService: DepartmentService,
    private enrollmentService: EnrollmentService, private confirmationService: PopUpService
  ) {
  
    
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rollno: [null],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    })
    this.teacherData();
    this.getSubjectList()
    this.secretaryCount()
    this.studentCount()

  }
  createUser() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log(formData);
      const passwordMatch = this.userForm.value.password === this.userForm.value.confirmPassword;
      if (passwordMatch) {
        this.userService.postuserRegister(this.userForm.value).subscribe((res) => {
          console.log(res);
          debugger
          alertify.success('User Added Sucessfully')
          this.userForm.reset();
          this.teacherData()
          this.secretaryCount()
          this.studentCount()
        })
      }
      else {
        const passwordControl = this.userForm.get('password');
        const confirmPasswordControl = this.userForm.get('confirmPassword');
        if (passwordControl?.errors?.['minLength']) {
          alertify.error('Password must be atleast 6 Characters long')
        }
        else {
          alertify.error('Password doesnot')
        }
      }
    }
    else {
      alertify.error('Please, Enter the valid input')
      console.log(this.userForm.value);
    }
  }
  studentCount(){
    this.userService.getStudentData().subscribe((res) => {
      this.showStudentCount = res.count
      this.showStudentData = res.student
    })
  }
  secretaryCount(){
    this.userService.getSecretarytData().subscribe((res) => {
      this.showSecretaryCount = res.count
      this.showSecretaryData = res.secretary
    })
  }
  teacherData() {
    this.userService.getTeacherData().subscribe((res) => {
      this.showTeacherCount = res.count
      this.showTeacherData = res.faculty
    })
  }
  getSubjectList() {
    this.enrollmentService.getSubjectDataListAll().subscribe((res) => {
      console.log(res);
      this.subjectListCount = res.count;
    })
  }

  async deleteTeacher(teacherId: string) {
    const confirmed = this.confirmationService.showConfirmationPopup()
    if (await confirmed) {
      debugger
      this.userService.delTeacherList(teacherId).subscribe((res) => {
        console.log(res);
        this.teacherData()
        this.confirmationService.showSuccessMessage('User deleted sucessfully')
      })
    }
    else {
      this.confirmationService.showErrorMessage('Sorry cannot be deleted')
    }
  }

}
