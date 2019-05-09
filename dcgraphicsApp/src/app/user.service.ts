import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user.interface';

@Injectable()

export class UserService {

    baseUrl:string ="http://localhost:3000/api";


  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.baseUrl + '/users');
}
  createUser(user:User){
    return this.http.post(this.baseUrl + '/user',user);
}


}