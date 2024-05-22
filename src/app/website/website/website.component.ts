import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent {
  constructor(private router:Router) {
    
  }
  loginButton(){
    this.router.navigate(['login'])
  }
  registerButton(){
    this.router.navigate(['register'])
  }
}
