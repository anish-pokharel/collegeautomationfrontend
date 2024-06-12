import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentService } from '../../../core/services/assignment-service/assignment.service';
import { ModelQuestionService } from '../../../core/services/model-service/model-question.service';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { PopUpService } from '../../../core/popup/pop-up.service';

@Component({
  selector: 'app-assignment-materials',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assignment-materials.component.html',
  styleUrl: './assignment-materials.component.css'
})
export class AssignmentMaterialsComponent implements OnInit {

  assignmentForm!: FormGroup;
  modelQuestionForm!: FormGroup;
  subjectList: any[] = [];
  assignmentList:any[]=[]
  modelQuestionList:any[]=[]

  constructor(private formBuilder: FormBuilder, private assignmentService: AssignmentService,
    private modelAssignment: ModelQuestionService, private enrollmentService: EnrollmentService,
    private confirmationService: PopUpService,

  ) {
    this.getSubjectList();
    this.showAssignmentList();
    this.showModelQuestionList();
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
      file:  ['', Validators.required],
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.assignmentForm.patchValue({
        assignmentFile: file
      });
    }
  }
  onSubmit() {
    if (this.assignmentForm.valid) {
      const formData = new FormData();
      formData.append('subject', this.assignmentForm.get('subject')!.value);
      formData.append('assignmentName', this.assignmentForm.get('assignmentName')!.value);
      formData.append('assignmentFile', this.assignmentForm.get('assignmentFile')!.value);
      formData.append('remarks', this.assignmentForm.get('remarks')!.value);

      this.assignmentService.postGiveAssignment(formData).subscribe(
        (res) => {
          console.log(res);
          this.assignmentForm.reset();
          this.confirmationService.showSuccessMessage('Added successfully');
        },
        (err) => {
          console.error(err);
          this.confirmationService.showErrorMessage('Sorry, cannot add a file');
          debugger
        }
      );
    } else {
      this.confirmationService.showErrorMessage('Please fill all required fields');
    }
  }

  showAssignmentList() {
    this.assignmentService.getGiveAssignment().subscribe((res) => {
      console.log(res);
      this.assignmentList=res
    })
  }
  showModelQuestionList() {
    this.modelAssignment.getModelQuestion().subscribe((res) => {
      console.log(res);
      this.modelQuestionList=res;
    })
  }

  


  getSubjectList() {
    this.enrollmentService.getSubjectDataList().subscribe((res) => {
      console.log(res);
      this.subjectList = res.subjects;
      debugger
    })
  }

  onFileChangeQuestion(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.modelQuestionForm.patchValue({
        file: file
      });
    }
  }

  onSubmitQuestion(): void {
    if (this.modelQuestionForm.valid) {
      const formData = new FormData();
      formData.append('subject', this.modelQuestionForm.get('subject')!.value);
      formData.append('model_question', this.modelQuestionForm.get('model_question')!.value);
      formData.append('file', this.modelQuestionForm.get('file')!.value);

      this.modelAssignment.postModelQuestion(formData).subscribe(
        (res) => {
          console.log(res);
          this.modelQuestionForm.reset();
          this.confirmationService.showSuccessMessage('Model question added successfully');
        },
        (err) => {
          console.error(err);
          this.confirmationService.showErrorMessage('Cannot add model assignment');
        }
      );
    } else {
      this.confirmationService.showErrorMessage('Please fill all required fields');
    }
  }

}