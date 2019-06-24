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
import {FormService} from './form.service';
import { MatButtonModule, MatCardModule,  MatInputModule, MatFormFieldModule,MatDialogModule,MatIconModule } from '@angular/material';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomelogComponent } from './homelog/homelog.component';
import { UserService } from './service/user.service';
//import { MaterialModule } from '@angular/material';

import {RandomService} from './randomImages.service';

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MygaleryComponent } from './mygalery/mygalery.component';
//import { MatIconModule } from '@angular/material/icon';


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
    HomelogComponent,
    MailboxComponent,
    MygaleryComponent
   
    
  ],
  imports: [
    //MaterialModule.forRoot(),
    CommonModule,
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
    MatIconModule, 
    ToastrModule.forRoot(
       {
        positionClass:'toast-top-right',  
        closeButton: true, }
      
    )

    
  ],
  entryComponents:[DialogOverviewExampleDialog], 
  providers: [FormService, UserService, AuthGuard, RandomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
