import { Component, OnInit, ViewChild ,ElementRef,Inject, Output, EventEmitter, Input } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../service/user.service';
import { WeatherService } from '../service/weather.service';
import { LocationService } from '../service/location.service';
import{FormGroup, FormControl, Validators,FormBuilder,} from '@angular/forms'
import {PortfolioService} from '../service/portfolio.service';
import {MailService} from '../service/mail.service';
import {FormService} from '../form.service';
import {Position} from '../interface/position.interface';
import {DataCurrentService} from '../service/dataCurrent.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material';
import {User}    from '../interface/user.interface';







import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ConditionalExpr } from '@angular/compiler';
import { LayoutModule } from '@angular/cdk/layout';



export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  texte:[];
}

export interface Date {
  lat: number;
  long: number;
 
}

@Component({
  selector: 'app-homelog',
  templateUrl: './homelog.component.html',
  styleUrls: ['./homelog.component.scss'],
  animations: [ routerTransition ]
})
export class HomelogComponent implements OnInit {
  user: any;
  highData:[];
  breakpoint: number;
  tiles:Tile []
  today;
  time;
  myDate = new Date();
  date:any;
  weather:any;
  position: Position;
  

  form: FormGroup;
  file:any
  loading: boolean = false;
  private images =[];
  fileToUpload: File = null;

  num : number = 0;
  newNum : number
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 3,
    
  };
  interval: any;
  currentView: string;
  private clients =[];
  int:number;




  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  name:string;
  content:string;




  constructor(private userService : UserService,
    private formService : FormService,
    private dataCurrentService : DataCurrentService, 
    private weatherService : WeatherService,
    private router: Router,
    private datePipe: DatePipe,
    private locationService : LocationService,
    private portfolioService : PortfolioService, 
    private fb: FormBuilder,
    private  dialog:  MatDialog) { 
      this.createForm();

  }

  

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      uploadfile: ['', Validators.required],
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('uploadfile').setValue(file);  
    }
  }
 
  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.form.get('name').value);
    input.append('content', this.form.get('content').value);
    input.append('uploadfile', this.form.get('uploadfile').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    console.log(formModel);

    this.portfolioService.createPortfolio(formModel).subscribe((res)=>{
      this.portfolioService.getPortfolios().subscribe((res : any[])=>{
        this.images = res;

      });
        },
      err=>{
      console.log(" Error..");
        } 
      );
    setTimeout(() => {
      alert('done!');
      this.loading = false;
      this.form.get('uploadfile').setValue(null);
      this.fileInput.nativeElement.value = '';
      this.name='';
      this.content='';
      
    }, 1000);
  }

  clearFile() {
    this.form.get('uploadfile').setValue(null);
    this.fileInput.nativeElement.value = '';
    this.name='';
    this.content='';
  }





  //Mail Count
  changeView(view) {
    if (view !== this.currentView) {
      this.option = {
        startVal: this.num,
        useEasing: true,
        duration: 3,
      };
      if (this.interval)
      clearInterval(this.interval);
      if (view === 'view1') {
        this.formService.getClients().subscribe((res : any[])=>{
          this.clients = res;
          this.newNum = this.clients.length;
          this.num = this.newNum;
        });
      }
    }
  }

//Modal userSetting
  ModalSend(user:User){
 

  const dialogRef=this.dialog.open(DialogSettingDialog,{ 
      height: '520px',
      width: '600px',
      
    });


  dialogRef.afterClosed().subscribe(()=>{
    this.userService.getUser().subscribe((data : any)=>{
      this.user = data;
      });
    }); 
  }

  getUser(): void{
    this.userService.getUser().subscribe((data : any)=>{
      this.user = data;
    });

  }



  ngOnInit() {
   
    //Date current
    var event = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  };
    this.date=event.toLocaleDateString('fr-FR', options)


    //weather;   
    this.locationService.getPosition().then(pos=>
      {
          this.weatherService.getData(pos.lat ,pos.lng).subscribe((data : any)=>{
          this.weather=data;
          
          this.position = {
            lat : this.weather.city_info.latitude,
            long : this.weather.city_info.longitude
          };
          this.dataCurrentService.setPosition(this.position)
          
        })
      });

   

    //mail Count
    this.changeView('view1');

 
    
    this.getUser();

  }
}




@Component({
  selector: 'dialog-setting',
  templateUrl: 'dialog-setting.html',
})
export class DialogSettingDialog {

  form: FormGroup;
  file:any
  fileToUpload: File = null;
  loading: boolean = false;
  private dataUser =[];
  eventBool: boolean = false;




  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  name:string;
  bio:string;




  constructor(
    private dataCurrentService : DataCurrentService, 
    public dialogRef: MatDialogRef<DialogSettingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService : UserService,
    private fb: FormBuilder,

    ) {this.createForm();}


    createForm() {
      this.form = this.fb.group({
        name: ['', Validators.required],
        bio: ['', Validators.required],
        uploadfile: ['', Validators.required],
      });
    }

    onFileChange(event) {
      if(event.target.files.length > 0) {
        let file = event.target.files[0];
        this.form.get('uploadfile').setValue(file);  
      }
    }

     
  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.form.get('name').value);
    input.append('bio', this.form.get('bio').value);
    input.append('uploadfile', this.form.get('uploadfile').value);
    
    return input;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;

    //this.dataCurrentService.setValueForRefresh(this.loading)

    this.userService.update(formModel).subscribe((res)=>{
      this.userService.getUser().subscribe((res:any[])=>{
        this.dataUser=res;
        
        
      });
        },
      err=>{
      console.log(" Error..");
        } 
      );
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
      
    }, 1000);
  } 

  clearFile() {
    this.form.get('uploadfile').setValue(null);
    this.fileInput.nativeElement.value = '';
    this.name='';
    this.bio='';
  }

}
