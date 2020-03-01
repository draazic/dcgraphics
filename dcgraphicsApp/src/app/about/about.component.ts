import { Component, OnInit } from '@angular/core';
import { ScrollTopService } from '../service/scrolltop.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private scrollTopService : ScrollTopService) { }

  ngOnInit() {
    this.scrollTopService.setScrollTop();
  }

}
