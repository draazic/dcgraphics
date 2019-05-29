import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        color: "#2B292E"
        
      })),
      state('hide',   style({
        opacity: 0,
        
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class NavComponent implements OnInit {
  state = 'hide'
  isLog: Observable<boolean>

  constructor(public el: ElementRef, private userService: UserService) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop
      const scrollPosition = window.pageYOffset

      if (scrollPosition >= componentPosition) {
        this.state = 'show'
      } else {
        this.state = 'hide'
      }
      if (scrollPosition <= componentPosition) {
        this.state = 'hide'
      } else {
        this.state = 'show'
      }

    }

  ngOnInit() {
    
   
  }

}
