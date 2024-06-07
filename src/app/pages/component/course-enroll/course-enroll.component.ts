import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-enroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-enroll.component.html',
  styleUrl: './course-enroll.component.css'
})
export class CourseEnrollComponent {
  showCourseList:any[]=[];
  constructor(private http:HttpClient, private enrollmentService:EnrollmentService){
    this.showCourse();
  }
showCourse(){
  this.enrollmentService.getEnrollmentData().subscribe((res)=>{
    console.log(res);
    this.showCourseList=res;
    console.log(this.showCourseList);
  })
}
}
