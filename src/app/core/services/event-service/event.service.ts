import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }
  postaddEventList(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'addEvent',obj)
  }
  getEventListList():Observable<any>{
    return this.http.get<any>(environment.api_url+'getEventList')
  }
  delEventList(id:string):Observable<any>{
    return this.http.delete<any>(environment.api_url+(`delEventList/${id}`))
  }
}
