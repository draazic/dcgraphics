import { Component, OnInit } from '@angular/core';
import {PortfolioService} from '../service/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  private images =[];
  breakpoint: number;
  

  constructor(private portfolioService : PortfolioService) { 
   
  }

  ngOnInit() {
    //this.breakpoint = (window.innerWidth >= 851) ? 4 : null;

    //this.breakpoint = (window.innerWidth <= 850) ? 2 : 4;
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;



  
    
    this.portfolioService.getPortfolios().subscribe((res : any[])=>{
      this.images = res;
      console.log(this.images);

      var array=this.images.length;
      console.log(array);
      for (var i = 0; i < array; i++){

        this.images[i].cols=Math.floor(Math.random() * 1)+1;
        this.images[i].rows=Math.floor(Math.random() * 4)+2;       
        this.images[i].color='#DDBDF1';
        console.log(this.images);
      }
    });
  
  
  }
  onResize(event) {
    //this.breakpoint = (event.target.innerWidth >= 851) ? 4 : null;

    //this.breakpoint = (event.target.innerWidth <= 850) ? 2 : 4;
    this.breakpoint = (event.target.innerWidth <= 420) ? 1 : 4;

  }
  
 
  

}
