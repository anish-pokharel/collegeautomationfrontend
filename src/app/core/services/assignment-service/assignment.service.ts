import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private http:HttpClient) { }


  postAnswerAssignment(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'postAnswerAssignment',obj)
  }
  getAnswerAssignment():Observable<any>{
    return this.http.get<any>(environment.api_url+'getassignments')
  }
}