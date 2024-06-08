import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { CommonModule } from '@angular/common';
import { ModelQuestionService } from '../../../core/services/model-service/model-question.service';

@Component({
  selector: 'app-course-enroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-enroll.component.html',
  styleUrl: './course-enroll.component.css'
})
export class CourseEnrollComponent {
  showCourseList:any;
  userRole: string|null | undefined;
  constructor(private http:HttpClient, private enrollmentService:EnrollmentService
    ,private modelQuestionService:ModelQuestionService
  ){
    this.showCourse();
  this.userRole =localStorage.getItem('userRole')

  }
showCourse(){
//   this.enrollmentService.getEnrollmentData().subscribe((res)=>{
//     console.log(res);
//     this.showCourseList=res;
// })
this.enrollmentService.getEnrollmentDataByEmail().subscribe((data)=>{
  // this.subject=data
  // console.log("Subject is "+this.subject);
  this.showCourseList = data;
})

}
}
