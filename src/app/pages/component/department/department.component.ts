import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department-service/department.service';
import * as alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { PopUpService } from '../../../core/popup/pop-up.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent  implements OnInit{
  createFacultyForm!:FormGroup;
  departmentList:any[]=[];
  showTeacherData:any[]=[]

constructor(private formBuilder:FormBuilder,private departmentService:DepartmentService,
  private userService:UserAuthService,
  private confirmationService: PopUpService
){
  this.teacherData()
}
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
  editDepartment(departmentId: string): void {
    console.log('Edit department with ID:', departmentId);
    const departmentToUpdate = this.departmentList.find(
      (department) => department._id === departmentId
    );
    if (!departmentToUpdate) {
      console.error('Department not found');
      return;
    }

    this.createFacultyForm.patchValue({
      createFaculty: departmentToUpdate.createFaculty,
      hod: departmentToUpdate.hod
    });

    console.log('Form values patched:', this.createFacultyForm.value);

    this.departmentService
      .updateDepartment(departmentId, this.createFacultyForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.departmentList = this.departmentList.filter(
            (department) => department._id !== departmentId
          );
          this.confirmationService.showSuccessMessage(
            'Department updated successfully'
          );

          this.showDepartmentList();
        },
        (error) => {
          console.error('Error updating department:', error);
          this.confirmationService.showErrorMessage(
            'Error updating department'
          );
        }
      );
  }

  async deleteDepartment(departmentId:string){
    const confirmed = await this.confirmationService.showConfirmationPopup()
    if(confirmed){



    console.log('Delete department with ID:', departmentId);
    this.departmentService.delDepartmentList(departmentId).subscribe((res)=>{
      console.log(res);
      this.showDepartmentList();
      debugger
    })
  }
else{
  this.confirmationService.showErrorMessage('Sorry cannot be deleted')
}

  }
  teacherData() {
    this.userService.getTeacherData().subscribe((res) => {
      this.showTeacherData = res.faculty
    })
  }

}
