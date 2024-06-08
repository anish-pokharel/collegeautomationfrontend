import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../core/services/user_auth/user-auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../core/services/feedback/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedbackTableData: any[] = [];
  pagedFeedbackTableData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5; // Set items per page to 10
  totalPages = 0;
  pages: number[] = [];

  constructor(private formBuilder: FormBuilder, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      feedbackBy:[''],
      feedbackGroup: ['Admin', Validators.required],
      feedbackAbout: ['', Validators.required]
    });
    this.getFeedbackList();
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const formValue = this.feedbackForm.value;
      this.feedbackService.postFeedbackData(formValue).subscribe((res: any) => {
        console.log(res);
        this.getFeedbackList();
        this.feedbackForm.reset();
      });
    }
  }

  getFeedbackList(): void {
    this.feedbackService.getFeedbackData().subscribe((res: any) => {
      console.log(res);
      this.feedbackTableData = res.feedbackList;
      this.calculatePagination();
    });
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.feedbackTableData.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.setPage(1); // Set initial page
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.feedbackTableData.length);
    this.pagedFeedbackTableData = this.feedbackTableData.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
}