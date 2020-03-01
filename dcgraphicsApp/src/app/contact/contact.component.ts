import { Component, OnInit, Inject, ViewChild, OnDestroy  } from '@angular/core';
import{FormGroup, FormControl, Validators} from '@angular/forms'
import { Observable, observable} from 'rxjs';
import {FormService} from '../form.service';
import {Client}    from '../interface/client.interface';
import {Civilite}    from '../interface/civilite.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material';
import { ScrollTopService } from '../service/scrolltop.service';
import { Subscription } from "rxjs";




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  private clients =[];
  private civilites =[];
  private objets =[];
  addcontact:Client;

  @ViewChild('contact', {static: false}) formValues; // Added this
  
  namePattern = "^[a-zA-Z éèàç]+$"; 
  phonePattern = "^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9 ]*$";
  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Zéèàç]{2,4}$";
  entPattern = "^[a-zA-Z0-9 éèàç]+$";
  
  private subscribeClientArray: Subscription[] = [];
  private subscribeClient2Array: Subscription[] = [];
  private subscribeCivDelArray: Subscription[] = [];
  private subscribeObjetDelArray: Subscription[] = [];
  
  
  constructor(private formService : FormService, private  dialog:  MatDialog, private scrollTopService : ScrollTopService) {}

  onSubmit(client:Client){
   
    console.log(client);
    
    this.subscribeClientArray.push(
      this.formService.createClient(client).subscribe(
        (res)=>{
        console.log('success');
        this.formValues.resetForm();
        console.log(res);
          },
        err=>{
        console.log(" not Error..");
        this.formValues.resetForm();
          } 
        )
    )
 
      
      this.dialog.open(DialogOverviewExampleDialog,{ 
        height: '400px',
        width: '600px',
        data: {
          name: client.name,
          forname: client.forname
        }});
     
      
    

       
  }
  

  
  
  ngOnInit() {
    this.scrollTopService.setScrollTop();


    
    this.subscribeClient2Array.push(
      this.formService.getClients().subscribe((res : any[])=>{
        this.clients = res;
        //console.log(this.clients)
      })
    )

  


  this.subscribeCivDelArray.push(
    this.formService.getCivilites().subscribe((res : any[])=>{
      this.civilites = res;      
    })
  )
 
  this.subscribeObjetDelArray.push(
    this.formService.getObjets().subscribe((res : any[])=>{
      this.objets = res;
    })
  )
  


  
  }

  

  ngOnDestroy() {
    this.subscribeClientArray.forEach((s) => {
      s.unsubscribe();
    })
    this.subscribeCivDelArray.forEach((s) => {
      s.unsubscribe();
    })
    this.subscribeObjetDelArray.forEach((s) => {
      s.unsubscribe();
    })
    this.subscribeClient2Array.forEach((s) => {
      s.unsubscribe();
    })
  }


}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Client) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
