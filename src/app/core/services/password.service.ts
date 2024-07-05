import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'http://localhost:3200';

  constructor(private http: HttpClient) {}

  requestResetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-reset-password`, { email });
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password?token=${token}`, { newPassword, confirmPassword });
  }
}