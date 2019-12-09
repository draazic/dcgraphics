import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from '../../interface/user.interface';
import {UserService} from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

  animations:[

   
  ]


})
export class SignUpComponent implements OnInit {
  user : User;
  animationState = 'in';
  divName:string

  @ViewChild('register', {static: false}) registerValues;

  namePattern = "^[a-zA-Z éèàç]+$"; 
  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Zéèàç]{2,4}$";

  constructor(private userService : UserService, private toaster: ToastrService) { }

  onSubmit(user:User){
    console.log(user)

    this.userService.createUser(user).subscribe(
      (res)=>{
        console.log('success');
        console.log(res);
        
        this.toaster.success('User registration successfull','Hello !!!');
        this.registerValues.resetForm();
        
       
          },
        err=>{
        console.log("Error..");
        this.toaster.error('Problem with registration','Hello !!!');
        this.registerValues.resetForm();
          }

    );

  }

  ngOnInit() {
    
    
  }

}
