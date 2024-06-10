import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiscussionService } from '../../../core/services/discussion/discussion.service';
import * as alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
// import * as $ from 'jquery';


@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent implements OnInit {
  constructor(private formBuilder: FormBuilder , private discussionService:DiscussionService) { }
  discussionTable!: FormGroup;
  discussionData: any[]=[];
  userRole: string|null | undefined;
  @ViewChild('exampleModal') editModal!: ElementRef;
    ngOnInit(): void {
    this.discussionTable = this.formBuilder.group({
      discussion_topic: ['', Validators.required],
      date: ['', Validators.required],
      decision_by: [''],
      decision: ['', Validators.required],
    })
    this.getDiscissionTable();
    this.userRole =localStorage.getItem('userRole')

  }
  addDiscussion() {

    
    if (this.discussionTable.valid) {
      const formData = this.discussionTable.value;
      console.log(formData);
      //this.discussionService.postDiscussion(this.discussionTable.value).subscribe((res)=>{
        this.discussionService.postDiscussion(formData).subscribe(
          (res) => {  
      console.log(res);
        alertify.success('Discussion Added');
        this.getDiscissionTable(); 
        this.discussionTable.reset()
      },
      (error) => {
        console.error('Error adding discussion:', error);
        alertify.error('Failed to add discussion. Please try again.');
      });

    }
    else{
      alertify.error("Form is invalid")
      const formData = this.discussionTable.value;
      console.log(formData);
      debugger
    }
  }
  getDiscissionTable() {
    this.discussionService.getdiscussionData().subscribe((res: any) => {
      this.discussionData = res.discussion;
      console.log(this.discussionData);
    });

}
editDiscussion(discussinId:string){
  const discussionToEdit = this.discussionData.find(discussion => discussion._id === discussinId);
  if (discussionToEdit) {
    this.discussionTable.patchValue({
      discussion_topic: discussionToEdit.discussion_topic,
      date: discussionToEdit.date,
      decision: discussionToEdit.decision
    });
      // this.editModal.nativeElement.classList.add('show');
    if (this.editModal) {
      this.editModal.nativeElement.classList.add('show');
      this.editModal.nativeElement.style.display = 'block';
    }
   
    this.discussionService.updateDiscussion(this.discussionTable.value,discussinId).subscribe((res)=>{
      console.log(res);
    })
}}
deleteDiscussion(discussinId:string){
  debugger
  this.discussionService.deleteDiscussion(discussinId).subscribe((res)=>{
    debugger 
    alertify.success('discussion is deleted')
    this.getDiscissionTable()
  })
}

closeModal() {
  if (this.editModal) {
    this.editModal.nativeElement.classList.remove('show');
    this.editModal.nativeElement.style.display = 'none';
    this.discussionTable.reset()

  }
}
}