import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department-service/department.service';
import * as alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent  implements OnInit{
  createFacultyForm!:FormGroup;
  departmentList:any[]=[]
constructor(private formBuilder:FormBuilder,private departmentService:DepartmentService){}
  ngOnInit(): void {
    
    this.facultyFormData();
    this.showDepartmentList();
  }

  facultyFormData(){
    this.createFacultyForm= this.formBuilder.group({
      createFaculty:['',Validators.required],
      hod:['',Validators.required]
    })
  }
  createFaculty(){
    if(this.createFacultyForm.valid){
      console.log(this.createFacultyForm.value);
      this.departmentService.postDepartmentsList(this.createFacultyForm.value).subscribe((res)=>{
        console.log(res);
        alertify.success("Department added")
        this.showDepartmentList();
        this.createFacultyForm.reset();

      })
    }

  }
  showDepartmentList(){
    this.departmentService.getDepartmentsList().subscribe((res)=>{
      console.log(res);
      this.departmentList= res
      debugger
    })
  }
  editDeaprtment(departmentId:string){
    console.log('Edit department with ID:', departmentId);

  }
  deleteDepartment(departmentId:string){
    console.log('Delete department with ID:', departmentId);
    this.departmentService.delDepartmentList(departmentId).subscribe((res)=>{
      console.log(res);
      this.showDepartmentList();
      debugger
    })

  }

}
