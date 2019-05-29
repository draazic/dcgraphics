import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {User} from './user.interface';

@Injectable()

export class UserService {

    baseUrl:string ="http://localhost:3000/api";



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
        
        var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.post(this.baseUrl+'/login', data,{headers: reqHeader})
    }


    getUser(){
        return this.http.get(this.baseUrl +'/me', 
        {headers: new HttpHeaders({'Authorization':localStorage.getItem('token')})})

    }

}