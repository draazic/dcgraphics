import { Component, OnInit } from '@angular/core';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
declare function mymethod():any; 
  


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      // route 'enter' transition
      transition(':enter', [

          // styles at start of transition
          style({ opacity: 0 }),

          // animation and styles at end of transition
          animate('.3s', style({ opacity: 1 }))
      ]),
  ])
    
    
  ]

})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    mymethod();

  }
  

  flipped = false;
  flipped1 = false;
  flipped2 = false;
  //imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkL8GlKZ775j3f0VVgS1rU8L2LoX5UEM6fKv_eGLzeza27WYH"

  flipIt() {
    this.flipped = !this.flipped;
  }

  flipIt1() {
    this.flipped1 = !this.flipped1;
  }

  flipIt2() {
    this.flipped2 = !this.flipped2;
  }

}
