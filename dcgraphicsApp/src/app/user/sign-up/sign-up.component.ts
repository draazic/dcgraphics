import { Component, OnInit } from '@angular/core';
import {User} from '../../user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user : User;

  namePattern = "^[a-zA-Z éèàç]+$"; 
  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Zéèàç]{2,4}$";

  constructor() { }

  onSubmit(user:User){
    console.log(user)
  }

  ngOnInit() {
  }

}
