import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Client }  from './interface/client.interface';
import { Observable, of } from 'rxjs';
@Injectable()
export class FormService {

  baseUrl:string ="http://localhost:3000/api";

  constructor(private http: HttpClient) { }

    getClients():Observable<Client[]> {
        return this.http.get<Client[]>(this.baseUrl + '/clients');
    }
    createClient(client:Client):Observable<Object>{
      return this.http.post(this.baseUrl + '/client',client);
    }

    getCivilites():Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl + '/civilites');
    }

    getObjets():Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl + '/objets');
    }

    deleteClient(id:number):Observable<Client[]>{
      return this.http.delete<Client[]>(this.baseUrl + '/clients/'+id);

    }
}