import { Component, OnInit,ViewChild } from '@angular/core';
import {User} from '../../user.interface';
import {UserService} from '../../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('login') loginValues;


  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Zéèàç]{2,4}$";
  isLoginError : boolean = false;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
  }

  onSubmit(user:User){
    console.log(user)
    var email= user.email;
    var password=user.password;

    this.userService.userAuthentication(user).subscribe((data: any)=>{
      console.log(data)
      localStorage.setItem('token',data.access_token);
      this.router.navigate(['/homelog'])

    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;

    });

  }

}
