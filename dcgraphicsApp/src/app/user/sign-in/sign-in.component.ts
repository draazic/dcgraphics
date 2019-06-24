import { Component, OnInit,ViewChild } from '@angular/core';
import {User} from '../../interface/user.interface';
import {UserService} from '../../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('login') loginValues;


  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Zéèàç]{2,4}$";
  isLoginError : boolean = false;
  //toaster: any;

  constructor(private userService : UserService, private router : Router, private toaster: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(user:User){
    console.log(user)
    var email= user.email;
    var password=user.password;

    this.userService.userAuthentication(user).subscribe((data: any)=>{
      console.log(data)
      localStorage.setItem('token',data.token);
      this.router.navigate(['/homelog'])

    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      this.loginValues.resetForm();
      this.toaster.error('Problem with loggin','Hello verify your mail or your password !!!');

    });

  }

}
