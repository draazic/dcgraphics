import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import{FormGroup, FormControl, Validators} from '@angular/forms'
import { Observable, observable} from 'rxjs';
import {FormService} from '../form.service';
import {Client}    from '../interface/client.interface';
import {Civilite}    from '../interface/civilite.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private clients =[];
  private civilites =[];
  private objets =[];
  addcontact:Client;

  @ViewChild('contact') formValues; // Added this
  
  namePattern = "^[a-zA-Z éèàç]+$"; 
  phonePattern = "^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9 ]*$";
  emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Zéèàç]{2,4}$";
  entPattern = "^[a-zA-Z0-9 éèàç]+$"; 
  
  
  constructor(private formService : FormService, private  dialog:  MatDialog) {}

  onSubmit(client:Client){
   
    console.log(client);
    
    
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
      );
      
      this.dialog.open(DialogOverviewExampleDialog,{ 
        height: '400px',
        width: '600px',
        data: {
          name: client.name,
          forname: client.forname
        }});
     
      
    

       
  }
  

  
  
  ngOnInit() {

    

    this.formService.getClients().subscribe((res : any[])=>{
      this.clients = res;
      console.log(this.clients)
  });



  this.formService.getCivilites().subscribe((res : any[])=>{
    this.civilites = res;
    
    
  });

  this.formService.getObjets().subscribe((res : any[])=>{
    this.objets = res;
   
  });


  
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
