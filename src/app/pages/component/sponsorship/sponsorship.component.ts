import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department-service/department.service';
import { SponsoeshipService } from '../../../core/services/sponsorship-service/sponsoeship.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-sponsorship',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './sponsorship.component.html',
  styleUrl: './sponsorship.component.css'
})
export class SponsorshipComponent implements OnInit{
 
  departments:any[]=[];
  form!:FormGroup
  sponsorshipByEmailList:any[]=[]


  constructor(private fb: FormBuilder, private http: HttpClient,private departmentService:DepartmentService
    ,private sponsorshipService:SponsoeshipService
  ) {
    this.form = this.fb.group({
      name: ['',],
      faculty: ['', Validators.required],
      semester: ['', Validators.required],
      topic: ['', Validators.required],
      money: ['', Validators.required],
      reason: ['', Validators.required],
      decision:['Pending']
    });
    this.getDeaprtmentList();
    this.getSponsorshipByEmailList();
  }
  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.sponsorshipService.postSponsorshipRequest(this.form.value).subscribe((res)=>{
        console.log(res);
        alertify.success('Sponsorship Requested')
        this.form.reset();
        this.getSponsorshipByEmailList();
      })
      }
  }

    ngOnInit(): void {
    
  }
  getSponsorshipByEmailList(){
    this.sponsorshipService.getSponsorshipByEmail().subscribe((res)=>{
      console.log(res);
      this.sponsorshipByEmailList=res.Sponsorship
    })
  }
 
  getDeaprtmentList(){
    this.departmentService.getDepartmentsList().subscribe((res)=>{
      console.log(res);
      this.departments=res;
      debugger
    })
  }
  
  }