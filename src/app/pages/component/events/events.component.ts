import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../core/services/event-service/event.service';
import { PopUpService } from '../../../core/popup/pop-up.service';

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
  eventEmailList:any[]=[];
  minDate: string | undefined;



  constructor(private formBuilder:FormBuilder,private eventService:EventService,private confirmationService:PopUpService){
    this.formvalue();
   
  }
ngOnInit(): void {
  this.getEventList();
  this.getEventListByEmailFunction();
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  this.minDate =this.formatDate(minDate)
}

  formvalue(){
 // Today + 2 days

    this.eventForm=this.formBuilder.group({
      eventName:['',Validators.required],
      eventDate: [, [Validators.required]],
      location:['',Validators.required],
      description:['',Validators.required],
      createdDate:['']
    })

  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  onSubmit(){
    if(this.eventForm.valid){
      console.log(this.eventForm.value);
      this.eventService.postaddEventList(this.eventForm.value).subscribe((res)=>{
        console.log(res);
        this.getEventList();
      this.eventForm.reset();
      this.getEventListByEmailFunction()
      })
    }
  }
  getEventList(){
    this.eventService.getEventListList().subscribe((res)=>{
      console.log(res);
      this.eventList=res.events;
    })
  }
  getEventListByEmailFunction(){
    this.eventService.getEventByEmailAPI().subscribe((res)=>{
      console.log(res);
      this.eventEmailList=res.Events;
    })
  }
  editEvent(eventId:string){

  }
  async deleteEvent(eventId:string){
    const confirm = await this.confirmationService.showConfirmationPopup()
    if(confirm){


    this.eventService.delEventList(eventId).subscribe((res)=>{
      this.getEventListByEmailFunction()
      this.getEventList()
      this.confirmationService.showSuccessMessage('Delete SucessFully')
    })
  }
  else{
    this.confirmationService.showErrorMessage('Sorry Cannot be Deleted')
  }

  }
}
