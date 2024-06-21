import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-internal-records',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './internal-records.component.html',
  styleUrl: './internal-records.component.css'
})
export class InternalRecordsComponent implements OnInit{

  enrollmentDatabyEnrolledsubject:any[]=[]
  addStudent!:FormGroup;
  studentMarksForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private enrollmentservice: EnrollmentService,){}
 
  ngOnInit(): void {
    this.addStudent= this.formBuilder.group({
      'student-name': ['', Validators.required],
      'student-roll-no': [0, Validators.required],
      'student-internal-data': ['', Validators.required],
      'remarks': ['']
    })
    this.enrollmentservice.getenrollmentDatabyEnrolledsubject().subscribe((res) => {
      console.log(res);
      this.enrollmentDatabyEnrolledsubject = res.users
      console.log(this.enrollmentDatabyEnrolledsubject);
    })
    this.initializeForm();

   
  
  }
  initializeForm(): void {
    this.studentMarksForm = this.formBuilder.group({
      students: this.formBuilder.array([])  // FormArray to hold multiple students
    });

    // Populate form controls dynamically based on enrollmentDatabyEnrolledsubject
    this.enrollmentDatabyEnrolledsubject.forEach(student => {
      const studentFormGroup = this.formBuilder.group({
        name: [student.name, Validators.required],
        email: [student.email, Validators.required],
        rollno: [student.rollno, Validators.required],
        marks: ['', Validators.required]
      });

      // Push each student form group into the form array
      (this.studentMarksForm.get('students') as FormArray).push(studentFormGroup);
    });
  }

  submitForm(): void {
   
    if (this.studentMarksForm.valid) {
      const formData = this.studentMarksForm.value;
      console.log(formData);

      // Here you can send formData to your backend or handle as needed
      // Example of sending data to backend:
      // this.yourService.submitFormData(formData).subscribe(response => {
      //   console.log('Form submitted successfully');
      // }, error => {
      //   console.error('Error submitting form', error);
      // });
    } else {
      // Handle form validation errors if any
      console.error('Form is invalid');
    }
  }
  addStudentRecord() {
   if(this.addStudent.valid){
    console.log(this.addStudent.value);
   }
   else{
    console.error('Form is not valid')
   }
    }
}
