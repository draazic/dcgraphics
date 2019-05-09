import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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


}