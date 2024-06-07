import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }
  postDepartmentsList(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'postDepartments',obj)
  }
  getDepartmentsList():Observable<any>{
    return this.http.get<any>(environment.api_url+'getDepartments')
  }
  delDepartmentList(id:string):Observable<any>{
    return this.http.delete<any>(environment.api_url+(`departments/${id}`))
  }
}
