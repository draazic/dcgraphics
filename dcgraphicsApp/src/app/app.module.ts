import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent,DialogOverviewExampleDialog } from './contact/contact.component';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { Http, HttpModule } from '@angular/http'; 
import { HttpClientModule } from '@angular/common/http'
import {FormService} from './form.sevices';
import { MatButtonModule, MatCardModule,  MatInputModule, MatFormFieldModule,MatDialogModule } from '@angular/material';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomelogComponent } from './homelog/homelog.component';

//import { MessageComponent } from './message/message.component';
//import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    DialogOverviewExampleDialog,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    HomelogComponent
   
    
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParallaxScrollModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatDialogModule,
    //FlexLayoutModule
    
  ],
  entryComponents:[DialogOverviewExampleDialog], 
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
