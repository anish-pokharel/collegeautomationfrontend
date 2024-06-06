import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }


  postDepartmentsList(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'postDepartments',obj)
  }
  getDepartmentsList():Observable<any>{
    return this.http.get<any>(environment.api_url+'getDepartments')
  }
}