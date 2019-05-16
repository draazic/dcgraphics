import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-homelog',
  templateUrl: './homelog.component.html',
  styleUrls: ['./homelog.component.scss'],
  animations: [ routerTransition ]
})
export class HomelogComponent implements OnInit {

  constructor() { }

  getState(o) {
    console.log(o)
    return o.activatedRouteData.state;
  }

  ngOnInit() {
  }

}
