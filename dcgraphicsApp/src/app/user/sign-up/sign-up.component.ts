import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from '../../user.interface';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user : User;

  @ViewChild('register') registerValues;

  namePattern = "^[a-zA-Z éèàç]+$"; 
  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Zéèàç]{2,4}$";

  constructor(private userService : UserService) { }

  onSubmit(user:User){
    console.log(user)

    this.userService.createUser(user).subscribe(
      (res)=>{
        // console.log('success');
        console.log(res);
        this.registerValues.resetForm();
          },
        err=>{
        console.log(" not Error..");
        this.registerValues.resetForm();
          }

    );

  }

  ngOnInit() {
  }

}
