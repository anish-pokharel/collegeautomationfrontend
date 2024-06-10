import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SponsoeshipService {

  constructor(private http:HttpClient) { }


  postSponsorshipRequest(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'postsponsorship',obj)
  }
  getSponsorshipRequest():Observable<any>{
    return this.http.get<any>(environment.api_url+'getsponsorship')
  }
  getSponsorshipByEmail():Observable<any>{
    return this.http.get<any>(environment.api_url+'getsponsorshipbyemail')
  }
}