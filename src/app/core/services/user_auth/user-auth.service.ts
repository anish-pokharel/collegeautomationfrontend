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
getuserDara():Observable<any>{
  return this.http.get(environment.api_url+'userdata')
}

setUserDara(user:any){
  localStorage.setItem('userData',JSON.stringify(user))
}
getUserData(){
  return JSON.parse(localStorage.getItem('userData')||'{}')
}
setUserRole(role: string) {
  localStorage.setItem('userRole', role);
}

getUserRole() {
  return localStorage.getItem('userRole');
}

setUserToken(token: string) {
  localStorage.setItem('userToken', token);
}

getUserToken() {
  return localStorage.getItem('userToken');
}

isLoggedIn(): boolean {
  return !!this.getUserToken();
}

logout() {
  localStorage.removeItem('userData');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userToken');
}

}
