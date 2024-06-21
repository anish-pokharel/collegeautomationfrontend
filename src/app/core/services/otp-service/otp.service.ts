import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http:HttpClient) { }


  sendOtp(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'send-otp',obj)
  }
  getAttendance():Observable<any>{
    return this.http.get(environment.api_url+'attendance')
  }
  verifyOtp(email: string, otp: string):Observable<any>{
    return this.http.post(environment.api_url+'verify-otp',{ email, otp, })
  }
}