import { Component, OnInit } from '@angular/core';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';
declare function mymethod():any; 
  


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    mymethod();

  }

}
