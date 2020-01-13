import { Component, OnInit } from '@angular/core';
import {PortfolioService} from '../service/portfolio.service';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})


export class PortfolioComponent implements OnInit {
  private images =[];
  breakpoint: number;
  

  constructor(private portfolioService : PortfolioService) { 
   
  }

  ngOnInit() {
    //this.breakpoint = (window.innerWidth >= 1024) ? 8 : 8;
    this.breakpoint = (window.innerWidth <= 850) ? 4 : 4;
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
   
    this.portfolioService.getPortfolios().subscribe((res : any[])=>{
      this.images = res;
      console.log(this.images);

      var array=this.images.length;
     
      for (var i = 0; i < array; i++){

        this.images[i].cols=Math.floor(Math.random() * 1)+1;
        this.images[i].rows=Math.floor(Math.random() * 4)+2;       
        this.images[i].color='#DDBDF1';
        
      }
    });
  
  
  }
  onResize(event) {
    console.log("coucou")
    //this.breakpoint = (window.innerWidth >= 1024) ? 4 : null;
    this.breakpoint = (event.target.innerWidth <= 850) ? 4 : 4;
    this.breakpoint = (event.target.innerWidth <= 420) ? 1 : 4;

  }

}
