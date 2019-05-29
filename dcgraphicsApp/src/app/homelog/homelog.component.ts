import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../user.service';

@Component({
  selector: 'app-homelog',
  templateUrl: './homelog.component.html',
  styleUrls: ['./homelog.component.scss'],
  animations: [ routerTransition ]
})
export class HomelogComponent implements OnInit {
  user: any;

  constructor(private userService : UserService) { }

  getState(o) {
    console.log(o)
    return o.activatedRouteData.state;
  }

  ngOnInit() {
    this.userService.getUser().subscribe((data : any)=>{
      this.user = data;
      console.log(data)
    })
  }

  getUser(){}

}
