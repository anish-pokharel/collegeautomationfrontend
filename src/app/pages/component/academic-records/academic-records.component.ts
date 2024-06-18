import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './academic-records.component.html',
  styleUrl: './academic-records.component.css'
})
export class AcademicRecordsComponent implements OnInit{
  itemsPerPage = 5;
  currentPage = 1;
  totalItems= 0;
  totalPages:number[]=[];
  paginatedItems:any[]=[]
  userRole: string | null | undefined;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }
  
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
    ngOnInit(): void {
      this.totalItems = this.items.length;
      this.totalPages = Array(Math.ceil(this.totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
      this.setPage(1);
      this.userRole = localStorage.getItem('userRole')

  }
  setPage(page:number):void{
    if(page < 1 || page > this.totalPages.length ) return;
    this.currentPage= page;
    const startIndex= (page-1)*this.itemsPerPage;
    const endIndex = startIndex+ this.itemsPerPage;
    this.paginatedItems= this.items.slice(startIndex,endIndex)
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:3200/upload', formData).subscribe(
      (response) => {
        console.log(response);
        alert('File uploaded successfully!');
      },
      (error: HttpErrorResponse) => {
        console.error('Error uploading file:', error); // Enhanced error logging
        alert('Error uploading file: ' + (error.error.message || error.message)); // Display error message
      }
    );
  }
}