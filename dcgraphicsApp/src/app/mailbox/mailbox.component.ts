import { Component,Inject, OnInit, OnDestroy } from '@angular/core';
import {FormService} from '../form.service';
import {MailService} from '../service/mail.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material';
import {Client}    from '../interface/client.interface';
import {Mail}    from '../interface/mail.interface';
import { ScrollTopService } from '../service/scrolltop.service';
import { Subscription } from "rxjs";









@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent implements OnInit,OnDestroy {
  private clients =[];
  private images =[];
  private subscribeArray: Subscription[] = [];
  private subscribeClientArray: Subscription[] = [];



  constructor(private formService : FormService, private  dialog:  MatDialog,private scrollTopService : ScrollTopService) { }

  

  ngOnInit() {
    this.scrollTopService.setScrollTop();

    this.subscribeArray.push(
      this.formService.getClients().subscribe((res : any[])=>{
        this.clients = res;
        console.log(this.clients)
      })
    )
  
}



ModalSend(client:Client){
  this.dialog.open(DialogSendMailDialog,{ 
    height: '520px',
    width: '600px',
    
    data: {
      mail: client.mail,
      name: client.name,
      forname: client.forname
    }});
}

delCard(id){
  this.subscribeClientArray.push(
    this.formService.deleteClient(id).subscribe((res : any[])=>{
      console.log(res);
      this.formService.getClients().subscribe((res : any[])=>{
        this.clients = res;
      });
    })
  )
  
 }

 ngOnDestroy() {
  this.subscribeArray.forEach((s) => {
    s.unsubscribe();
  })
  this.subscribeClientArray.forEach((s) => {
    s.unsubscribe();
  })
}

}

@Component({
  selector: 'dialog-send',
  templateUrl: 'dialog-send.html',
})
export class DialogSendMailDialog implements OnDestroy{

  private subscribeArray: Subscription[] = [];


  constructor(
    private mailService : MailService,
    public dialogRef: MatDialogRef<DialogSendMailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Client
    ) {}

  onNoClick(): void {
    this.dialogRef.close();

  }

  onSubmit(mail:Mail){
    this.subscribeArray.push(
      this.mailService.createMail(mail).subscribe(
        (res)=>{
        console.log('success');
        console.log(res);
          },
        err=>{
        console.log(" not Error..");
          })
    )
    
      this.dialogRef.close();
  }

  
  ngOnDestroy(){
    this.subscribeArray.forEach((s) => {
      s.unsubscribe();
    })
  }

}
