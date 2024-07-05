import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent implements OnInit {
  constructor(private router:Router) {
  }
  loginButton(){
    this.router.navigate(['login'])
  }
  registerButton(){
    this.router.navigate(['register'])
  }
  checkUserToken(): void {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit(): void {
    this.checkUserToken();
    
  }
}
