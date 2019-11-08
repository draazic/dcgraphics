import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../service/user.service';
import { WeatherService } from '../service/weather.service';
import { LocationService } from '../service/location.service';
import{FormGroup, FormControl, Validators,FormBuilder,} from '@angular/forms'
import {PortfolioService} from '../service/portfolio.service';


import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ConditionalExpr } from '@angular/compiler';
import { LayoutModule } from '@angular/cdk/layout';
import { getOrCreateCurrentQueries } from '@angular/core/src/render3/state';



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
  public longitude;
  public latitude;

  form: FormGroup;
  file:any
  loading: boolean = false;
  private images =[];
  fileToUpload: File = null;


  @ViewChild('fileInput') fileInput: ElementRef;




  constructor(private userService : UserService, 
    private weatherService : WeatherService,
    private router: Router,
    private datePipe: DatePipe,
    private locationService : LocationService,
    private portfolioService : PortfolioService, private fb: FormBuilder) { 
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
      console.log(file.name);
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
    
    this.portfolioService.createPortfolio(formModel).subscribe((res)=>{
      console.log('success');
      //this.formValues.resetForm();
      console.log(res);
      this.portfolioService.getPortfolios().subscribe((res : any[])=>{
        this.images = res;
        console.log(this.images)
      });
        },
      err=>{
      console.log(" Error..");
      //this.formValues.resetForm();
        } 
      );
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
  }

  clearFile() {
    this.form.get('uploadfile').setValue(null);
    this.fileInput.nativeElement.value = '';
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
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
         
         this.weatherService.getData(pos.lat ,pos.lng).subscribe((data : any)=>{
          this.weather=data;

    
        })
      });

    this.userService.getUser().subscribe((data : any)=>{
      this.user = data;
      console.log(this.user)
    
    });

       

  }
  



}
