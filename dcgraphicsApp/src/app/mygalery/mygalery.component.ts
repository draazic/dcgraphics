import { Component, OnInit, ViewChild ,ElementRef, OnDestroy } from '@angular/core';
import {PortfolioService} from '../service/portfolio.service';
import {Portfolio}    from '../interface/portfolio.interface';
import{FormGroup, FormControl, Validators,FormBuilder,} from '@angular/forms'
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { ScrollTopService } from '../service/scrolltop.service';
import { Subscription } from "rxjs";








@Component({
  selector: 'app-mygalery',
  templateUrl: './mygalery.component.html',
  styleUrls: ['./mygalery.component.scss']
})

export class MygaleryComponent implements OnInit, OnDestroy {



  //constructor(private portfolioService : PortfolioService , private formBuilder: FormBuilder) { }
 
  form: FormGroup;
  file:any
  loading: boolean = false;
  private images =[];
  fileToUpload: File = null;
  private subscribePortArray: Subscription[] = [];
  private subscribePortDelArray: Subscription[] = [];

  

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(private portfolioService : PortfolioService, private fb: FormBuilder,private scrollTopService : ScrollTopService) {
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




  delImage(id){
    this.subscribePortDelArray.push(
      this.portfolioService.deletePortfolio(id).subscribe((res : any[])=>{
        //console.log(res);
        this.portfolioService.getPortfolios().subscribe((res : any[])=>{
          this.images = res;
      });
    })
  )
   
  }
  
  


  ngOnInit() {
    this.scrollTopService.setScrollTop();

    this.subscribePortArray.push(
      this.portfolioService.getPortfolios().subscribe((res : any[])=>{
        this.images = res;
      })
      
    )
   
   
  }

  ngOnDestroy() {
    this.subscribePortArray.forEach((s) => {
      s.unsubscribe();
    })
    this.subscribePortDelArray.forEach((s) => {
      s.unsubscribe();
    })
  }

}
