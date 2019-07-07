import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Mail} from '../interface/mail.interface';

@Injectable()

export class MailService {
    baseUrl:string ="http://localhost:3000/api";


    constructor(private http: HttpClient) { }


    createMail(mail:Mail):Observable<Object>{
        return this.http.post(this.baseUrl + '/mail',mail);
    }


}

