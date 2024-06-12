import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentService } from '../../../core/services/assignment-service/assignment.service';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent {
  assignmentForm!: FormGroup;
  showAssignmentAnswer: any[] = [];
  showAssignmentQuestion: any[] = [];
  subjectList: any[] = [];
  constructor(private formBuilder: FormBuilder, private assigmentService: AssignmentService,
    private enrollmentService: EnrollmentService
  ) {
  }
  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      subject: ['', Validators.required],
      assignment: ['', Validators.required],
      assignmentFile: ['', Validators.required],
      rollno: [''],

    });
    this.showData();
    this.getAssignmentQuestion();
    this.getSubjectList();
  }
  onSubmit() {
    console.log('BUTTON IS Clicked');
    console.log(this.assignmentForm.value);
    const assignmentFormData = this.assignmentForm.value
    if (this.assignmentForm.valid) {
      this.assigmentService.postAnswerAssignment(assignmentFormData).subscribe((res) => {
        console.log(res);
        this.showData()
        this.assignmentForm.reset()
      })

    }
  }
  showData() {
    this.assigmentService.getAnswerAssignment().subscribe((res) => {
      console.log(res);
      this.showAssignmentAnswer = res;
      debugger
    })
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }

  getSubjectList() {
    this.enrollmentService.getSubjectDataList().subscribe((res) => {
      console.log(res);
      this.subjectList = res.subjects;
      debugger
    })
  }
  getAssignmentQuestion() {
    this.assigmentService.getGiveAssignment().subscribe((res) => {
      console.log(res);
      this.showAssignmentQuestion = res
    })
  }
}
