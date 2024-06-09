import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department-service/department.service';
import { SponsoeshipService } from '../../../core/services/sponsorship-service/sponsoeship.service';

@Component({
  selector: 'app-sponsorship',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './sponsorship.component.html',
  styleUrl: './sponsorship.component.css'
})
export class SponsorshipComponent implements OnInit{
  itemsPerPage = 5;
  currentPage = 1;
  totalItems= 0;
  totalPages:number[]=[];
  paginatedItems:any[]=[];
  departments:any[]=[];
  form!:FormGroup
  
  items = [
    { clubName: 'Mark', position: 'Otto', joinedDate: '2022-01-01' },
    { clubName: 'Jacob', position: 'Thornton', joinedDate: '2022-01-02' },
    { clubName: 'Larry', position: 'the Bird', joinedDate: '2022-01-03' },
    { clubName: 'John', position: 'Doe', joinedDate: '2022-01-04' },
    { clubName: 'Jane', position: 'Doe', joinedDate: '2022-01-05' },
    { clubName: 'Smith', position: 'Jones', joinedDate: '2022-01-06' },
    { clubName: 'Emily', position: 'Johnson', joinedDate: '2022-01-07' },
    { clubName: 'Michael', position: 'Brown', joinedDate: '2022-01-08' },
    { clubName: 'Sarah', position: 'Davis', joinedDate: '2022-01-09' },
    { clubName: 'David', position: 'Miller', joinedDate: '2022-01-10' }
  ];


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
      decision:['']
    });
    this.getDeaprtmentList();
  }
  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.sponsorshipService.postAnswerAssignment(this.form.value).subscribe((res)=>{
        console.log(res);
        this.form.reset();
      })
      }
  }

    ngOnInit(): void {
      this.totalItems = this.items.length;
      this.totalPages = Array(Math.ceil(this.totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
      this.setPage(1);
  }
  setPage(page:number):void{
    if(page < 1 || page > this.totalPages.length ) return;
    this.currentPage= page;
    const startIndex= (page-1)*this.itemsPerPage;
    const endIndex = startIndex+ this.itemsPerPage;
    this.paginatedItems= this.items.slice(startIndex,endIndex)
  }
  getDeaprtmentList(){
    this.departmentService.getDepartmentsList().subscribe((res)=>{
      console.log(res);
      this.departments=res;
      debugger
    })
  }
  }