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
  showAssignmentsByEnrolledSubjects: any[] = [];
  showassignmentsbyemail: any[] = [];
  filteredAssignments: any[] = [];
  constructor(private formBuilder: FormBuilder, private assigmentService: AssignmentService,
    private enrollmentService: EnrollmentService
  ) {
  }
  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      subject: ['', Validators.required],
      assignment: ['', Validators.required],
      assignmentFile: ['', Validators.required],
    });
    this.showData();
    this.getAssignmentQuestion();
    this.getSubjectList();
    this.getAssignmentsByEnrolledSubjectsFunction();
    this.getassignmentsbyemailFunction();
  }
  onSubmit(): void {
    if (this.assignmentForm.valid) {
      const formData = new FormData();
      formData.append('subject', this.assignmentForm.get('subject')!.value);
      formData.append('assignment', this.assignmentForm.get('assignment')!.value);
      formData.append('assignmentFile', this.assignmentForm.get('assignmentFile')!.value);

      this.assigmentService.postAnswerAssignment(formData).subscribe(
        res => {
          console.log('Assignment submitted successfully:', res);
          this.assignmentForm.reset();
        },
        error => {
          console.error('Error submitting assignment:', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.assignmentForm.patchValue({
        assignmentFile: file
      });
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
  getAssignmentsByEnrolledSubjectsFunction() {
    this.assigmentService.getAssignmentsByEnrolledSubjects().subscribe((res) => {
      console.log(res);
      this.showAssignmentsByEnrolledSubjects = res.assignments
    })
  }
  getassignmentsbyemailFunction() {
    this.assigmentService.getassignmentsbyemailStudent().subscribe((res) => {
      console.log(res);
      this.showassignmentsbyemail = res.Assignment
      debugger
    })
  }
}
