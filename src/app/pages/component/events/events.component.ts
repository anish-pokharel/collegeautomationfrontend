import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../core/services/event-service/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  
  eventForm!:FormGroup;
  eventList:any[]=[];


  constructor(private formBuilder:FormBuilder,private eventService:EventService){
    this.formvalue();
   
  }
ngOnInit(): void {
  this.getEventList()
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
      this.eventService.postaddEventList(this.eventForm.value).subscribe((res)=>{
        console.log(res);
        this.getEventList();
      this.eventForm.reset();
      })
    }
  }
  getEventList(){
    this.eventService.getEventListList().subscribe((res)=>{
      console.log(res);
      this.eventList=res.events;
    })
  }
  editEvent(eventId:string){

  }
  deleteEvent(eventId:string){
    this.eventService.delEventList(eventId).subscribe((res)=>{
      console.log(res);
      this.getEventList()
    })
  }
}
