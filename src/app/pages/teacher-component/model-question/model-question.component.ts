import { Component, OnInit } from '@angular/core';
import { ModelQuestionService } from '../../../core/services/model-service/model-question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-question.component.html',
  styleUrl: './model-question.component.css'
})
export class ModelQuestionComponent implements OnInit {
  userRole: string | null | undefined;

  getQuestionsByEnrolledSubjectData:any[]=[]
constructor(private modelService:ModelQuestionService){
  this.userRole = localStorage.getItem('userRole')
  this.getQuestionsByEnrolledSubjectFunction()
}
  ngOnInit(): void {
    
  }
  getQuestionsByEnrolledSubjectFunction(){
    this.modelService.getQuestionsByEnrolledSubjectAPI().subscribe((res)=>{
      console.log(res);
      this.getQuestionsByEnrolledSubjectData=res.Model_Questions
    })
  }
}
