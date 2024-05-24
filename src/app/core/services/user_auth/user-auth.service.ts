import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http:HttpClient) { }
postuserRegister(obj:any):Observable<any>{
  return this.http.post(environment.api_url+'signup',obj)
}
postUserSignIn(obj:any):Observable<any>{
  return this.http.post(environment.api_url+'signin',obj)
}
}
