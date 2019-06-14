import { Component, OnInit } from '@angular/core';
import {FormService} from '../form.service';
import {RandomService} from '../randomImages.service';



@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent implements OnInit {
  private clients =[];
  private images =[];

  constructor(private formService : FormService, private randomService:RandomService) { }

  

  ngOnInit() {
    this.formService.getClients().subscribe((res : any[])=>{
      this.clients = res;
      console.log(this.clients)
  });

    this.randomService.getImages().subscribe((res : any[])=>{
      this.images = res;
      console.log(this.images)
  });

}
}
