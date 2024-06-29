import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnrollmentService } from '../../../core/services/enrollment_service/enrollment.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-internal-records',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './internal-records.component.html',
  styleUrl: './internal-records.component.css'
})
export class InternalRecordsComponent implements OnInit{
  selectedFile!: File;

  constructor(private formBuilder:FormBuilder,private enrollmentservice: EnrollmentService,private http: HttpClient){}
 
  ngOnInit(): void {
   
    }

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  
    onUpload(): void {
      const valuationType = (document.getElementById('valuationType') as HTMLSelectElement).value;
  
      if (!this.selectedFile) {
        alert('Please select a file');
        return;
      }
  
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);
      uploadData.append('type', valuationType);
  
      this.http.post('http://localhost:3200/internalUpload', uploadData)
        .subscribe(response => {
          console.log('Upload successful', response);
          alert('Upload successful');
        }, error => {
          console.error('Upload error', error);
          alert('Upload error');
        });
    }
  }