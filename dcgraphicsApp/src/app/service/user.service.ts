import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {User} from '../interface/user.interface';

@Injectable()

export class UserService {

    baseUrl:string ="http://localhost:3000/api";
    private loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }

    getUsers():Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + '/register');
    }
    
    createUser(user:User):Observable<Object>{
        return this.http.post(this.baseUrl + '/register',user);
    }

    userAuthentication(user):Observable<Object>{
        console.log(user)
        var data = "email="+user.email+"&password="+user.password;
        //console.log(data)
        
        //this.loggedIn.next(true);
        var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.post(this.baseUrl+'/login', data,{headers: reqHeader})

    }

    get isLoggedIn() {
        //this.loggedIn.next(true);
        if (localStorage.getItem('token') != null){
            this.loggedIn.next(true);  
        }
        return this.loggedIn.asObservable(); // {2}
      }


    getUser(){
        this.loggedIn.next(true);
        return this.http.get(this.baseUrl +'/me', 
        {headers: new HttpHeaders({'Authorization':localStorage.getItem('token')})}
        )
        //{'Authorization':localStorage.setItem('token');}

    }

}