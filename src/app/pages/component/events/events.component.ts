import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  
  eventForm!:FormGroup


  constructor(private formBuilder:FormBuilder){
    this.formvalue();
  }


  formvalue(){
    this.eventForm=this.formBuilder.group({
      eventName:['',Validators.required],
      eventDate:['',Validators.required],
      location:['',Validators.required],
      description:['',Validators.required],
      createdDate:['']
    })

  }
  onSubmit(){
    if(this.eventForm.valid){
      console.log(this.eventForm.value);
      this.eventForm.reset();
    }
  }
}
