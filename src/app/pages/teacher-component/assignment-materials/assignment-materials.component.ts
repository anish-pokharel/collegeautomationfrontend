import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentService } from '../../../core/services/assignment-service/assignment.service';
import { ModelQuestionService } from '../../../core/services/model-service/model-question.service';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';

@Component({
  selector: 'app-assignment-materials',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './assignment-materials.component.html',
  styleUrl: './assignment-materials.component.css'
})
export class AssignmentMaterialsComponent implements OnInit {

  assignmentForm!:FormGroup;
  modelQuestionForm!: FormGroup;
  subjectList:any[]=[];

  constructor(private formBuilder:FormBuilder,private assignmentService:AssignmentService,
    private modelAssignment:ModelQuestionService,    private enrollmentService:EnrollmentService

   ){
    this.getSubjectList()
  }
  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      subject: ['', Validators.required],
      assignmentName: ['', Validators.required],
      assignmentFile: ['', Validators.required],
      remarks: ['', Validators.required],
    });
    this.modelQuestionForm = this.formBuilder.group({
      subject: ['', Validators.required],
      model_question: ['', Validators.required],
      file: [''] 
    });
  }
  onSubmit(){
    console.log('BUTTON IS CLCJFAHJ');
    console.log(this.assignmentForm);
    this.assignmentService.postGiveAssignment(this.assignmentForm.value).subscribe((res)=>{
      console.log(res);
    })
  }
  showAssignmentList(){
    this.assignmentService.getGiveAssignment().subscribe((res)=>{
      console.log(res);
    })
  }

  onSubmitQuestion() {
    if (this.modelQuestionForm.valid) {
    this.modelAssignment.postModelQuestion(this.modelQuestionForm.value).subscribe((res)=>{
      console.log(res);
    }) 
    }
  }


  getSubjectList(){
    this.enrollmentService.getSubjectDataList().subscribe((res)=>{
      console.log(res);
      this.subjectList=res.subjects;
      debugger
    })
  }
  
}