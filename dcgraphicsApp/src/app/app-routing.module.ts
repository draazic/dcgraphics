import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { HomelogComponent } from './homelog/homelog.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MygaleryComponent } from './mygalery/mygalery.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
//import { routerTransition } from './router.animations';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'homelog', component: HomelogComponent,canActivate:[AuthGuard]
        // children:[
        //   { path: 'mailbox', component: MailboxComponent},
        //   { path: 'mygalery', component: MygaleryComponent}
        // ]
      },
        
  { path: 'mailbox', component: MailboxComponent,canActivate:[AuthGuard]},
  { path: 'mygalery', component: MygaleryComponent,canActivate:[AuthGuard]},


  { path: 'signup', component: UserComponent, data:{state:'signup'},
    children:[{path : '',component: SignUpComponent}]},

  { path: 'login', component: UserComponent, data:{state:'signin'},
    children:[{path : '',component: SignInComponent}]},

  {path:'', redirectTo:'/login', pathMatch : 'full'}  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
