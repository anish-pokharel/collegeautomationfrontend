import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobVacancyService } from '../../../core/services/jobVacancy-service/job-vacancy.service';
import { PopUpService } from '../../../core/popup/pop-up.service';
import * as alertify from 'alertifyjs';

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

  constructor(private fb: FormBuilder, private http: HttpClient,private jobVacancyService:JobVacancyService ,
    private confirmationService:PopUpService
  ) {
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
        this.showJobVacancy()
        this.vacancyForm.reset()
        this.confirmationService.showSuccessMessage('Vacancy Added')
      })
    }
    else{
      this.confirmationService.showErrorMessage('Please Enter the valid Vacancy ')
    }
  }
  showJobVacancy(){
    this.jobVacancyService.getAnswerAssignment().subscribe((res)=>{
      this.jobVacancyList= res;
    })
  }
  editVacancy(vacancyId: string) {
    const vacancyToUpdate = this.jobVacancyList.find(vacancy => vacancy._id === vacancyId);
    if (!vacancyToUpdate) {
      console.error('Vacancy not found');
      return;
    }
    this.vacancyForm.patchValue({
      vacancyPosition: vacancyToUpdate.vacancyPosition,
      vacancyExperience: vacancyToUpdate.vacancyExperience,
      vacancyLevel: vacancyToUpdate.vacancyLevel,
      vacancySubject: vacancyToUpdate.vacancySubject,
      vacancyQualification: vacancyToUpdate.vacancyQualification,
      time: vacancyToUpdate.time,
      vacancySalary: vacancyToUpdate.vacancySalary,
    });
  
    console.log('Form values patched:', this.vacancyForm.value);
     
    this.jobVacancyService.updateVacancy(vacancyId, this.vacancyForm.value).subscribe((res) => {
      console.log(res);
      this.confirmationService.showSuccessMessage('Vacancy updated successfully');
      this.showJobVacancy();
    }, (error) => {
      console.error('Error updating vacancy:', error);
      this.confirmationService.showErrorMessage('Error updating vacancy');
    });
  }

  async deleteVacancy(vacancyId:string){
    const confirmed = await this.confirmationService.showConfirmationPopup();
    if(confirmed){
    this.jobVacancyService.delVacancyList(vacancyId).subscribe((res)=>{
      console.log(res);
     this.confirmationService.showSuccessMessage('Delete Sucessfully Done');
      this.showJobVacancy()
    })
  }
  else{
    this.confirmationService.showErrorMessage('Sorry Cannot be Deleted');
  }
  }
}
