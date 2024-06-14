import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../../core/services/assignment-service/assignment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-work.component.html',
  styleUrl: './student-work.component.css'
})
export class StudentWorkComponent implements OnInit{
  getAssignmentsBySubjectData:any[]=[]
constructor(private assignmentService:AssignmentService){}
  ngOnInit(): void {
    this.getAssignmentsBySubjectFunction()
    
  }


  getAssignmentsBySubjectFunction(){
    this.assignmentService.getAssignmentsBySubjectAPI().subscribe((res)=>{
      this.getAssignmentsBySubjectData=res.Assignment
    })
  }
}
