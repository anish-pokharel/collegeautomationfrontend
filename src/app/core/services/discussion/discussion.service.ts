import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private http:HttpClient) { }


  postDiscussion(obj:any):Observable<any>{
    return this.http.post(environment.api_url+'discussion',obj)
  }
  getdiscussionData():Observable<any>{
    return this.http.get(environment.api_url+'getdiscussion')
  }

}
