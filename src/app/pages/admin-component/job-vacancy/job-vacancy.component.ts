import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobVacancyService } from '../../../core/services/jobVacancy-service/job-vacancy.service';

@Component({
  selector: 'app-job-vacancy',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './job-vacancy.component.html',
  styleUrl: './job-vacancy.component.css'
})
export class JobVacancyComponent implements OnInit {
  vacancyForm: FormGroup;
  jobVacancyList:any[]=[];

  constructor(private fb: FormBuilder, private http: HttpClient,private jobVacancyService:JobVacancyService) {
    this.vacancyForm = this.fb.group({
      vacancyPosition: ['', Validators.required],
      vacancyExperience: ['', Validators.required],
      vacancyLevel: ['', Validators.required],
      vacancySubject: ['', Validators.required],
      vacancyQualification: ['', Validators.required],
      time: ['fullTime', Validators.required],
      vacancySalary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.showJobVacancy()
   } 
  onSubmit() {
    if (this.vacancyForm.valid) {
      this.jobVacancyService.postAnswerAssignment(this.vacancyForm.value).subscribe((res)=>{
        console.log(res);
        debugger
      })
     
    }
  }
  showJobVacancy(){
    this.jobVacancyService.getAnswerAssignment().subscribe((res)=>{
      this.jobVacancyList= res;
    })
  }
}
