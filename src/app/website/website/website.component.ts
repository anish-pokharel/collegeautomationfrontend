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



isHovering: boolean = false;
isSliding: boolean =false;
showMessage=false;



showMessagen() {
  this.isHovering = true;
}
hideMessagen() {
  this.isHovering = false;
}
showMessagee() {
  this.isSliding= true;
}
hideMessagee() {
  this.isSliding = false;
}
onInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.value) {
    const value = target.value;
    if (value.trim() !== '') {
      this.showMessage = false;
    } else {
      this.showMessage = true;
    }
  }
}


}
