import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http:HttpClient) { }
  postClub(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'joinclub',obj)
  }
}
