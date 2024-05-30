import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiscussionService } from '../../../core/services/discussion/discussion.service';
import * as alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';

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
  discussionData: any[]=[]
  ngOnInit(): void {
    this.discussionTable = this.formBuilder.group({
      discussion_topic: ['', Validators.required],
      date: ['', Validators.required],
      decision_by: ['', Validators.required],
      decision: ['', Validators.required],
    })
    this.getDiscissionTable()

  }
  addDiscussion() {
    if (this.discussionTable.valid) {
      const formData = this.discussionTable.value;
      console.log(formData);
      this.discussionService.postDiscussion(this.discussionTable.value).subscribe((res)=>{
        console.log(res);
        alertify.success('Discussion Added')
      })

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
}