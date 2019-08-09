import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import {PortfolioService} from '../service/portfolio.service';
import {Portfolio}    from '../interface/portfolio.interface';
import{FormGroup, FormControl, Validators,FormBuilder,} from '@angular/forms'
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';






@Component({
  selector: 'app-mygalery',
  templateUrl: './mygalery.component.html',
  styleUrls: ['./mygalery.component.scss']
})

export class MygaleryComponent implements OnInit {



  //constructor(private portfolioService : PortfolioService , private formBuilder: FormBuilder) { }
 
  form: FormGroup;
  file:any
  loading: boolean = false;
  private images =[];
  fileToUpload: File = null;
  

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private portfolioService : PortfolioService, private fb: FormBuilder) {
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

     // this.form.controls['uploadfile'].setValue(file ? file.name : '');
   

   
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
    this.portfolioService.getPortfolios().subscribe((res : any[])=>{
      this.images = res;
      console.log(this.images)
  });
   
  }

}
