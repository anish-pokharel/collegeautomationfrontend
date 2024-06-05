import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }
  postEnrollment(obj: any): Observable<any> {
    return this.http.post(environment.api_url + 'enrollmentCreate', obj)
  }
  getEnrollmentData():Observable<any>{
    return this.http.get<any>(environment.api_url+'enrollmentData')
  }
postEnrollmentJoin(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'postEnrollmentKeyForm',obj)
}


}
