import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-internal-records',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './internal-records.component.html',
  styleUrl: './internal-records.component.css'
})
export class InternalRecordsComponent implements OnInit{


  addStudent!:FormGroup;
  constructor(private formBuilder:FormBuilder){}
 
  ngOnInit(): void {
    this.addStudent= this.formBuilder.group({
      'student-name': ['', Validators.required],
      'student-roll-no': [0, Validators.required],
      'student-internal-data': ['', Validators.required],
      'remarks': ['']
    })
  
  }


  addStudentRecord() {
   if(this.addStudent.valid){
    console.log(this.addStudent.value);
   }
   else{
    console.error('Form is not valid')
   }
    }
}
