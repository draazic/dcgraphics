import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { HomelogComponent } from './homelog/homelog.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
//import { routerTransition } from './router.animations';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'portfolio', component: PortfolioComponent },
  //{ path: 'homelog', component: HomelogComponent, data:{state:'homelog'}},

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
