import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHandler,HttpUserEvent,HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
//import { UserService } from '../service/user.service';
import 'rxjs/add/operator/do'
import { tap } from "rxjs/operators";

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
    export class AuthInterceptor implements HttpInterceptor{

        constructor(private router: Router){}

        intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
            //throw new Error("Method not implemented")
            if(req.headers.get('No-Auth')=="True")
                return next.handle(req.clone());

                if(localStorage.getItem('token') != null){
                    const clonedreq = req.clone({
                        headers:req.headers.set("Authorization",localStorage.getItem('token'))
                    });
                    return next.handle(clonedreq)
                    .pipe(
                        tap(
                            succ => {},
                            err => {
                                debugger;
                                if(err.status === 401)
                                this.router.navigateByUrl('/login')
                            }
                        )
                       
                    )
                }
        }
    }