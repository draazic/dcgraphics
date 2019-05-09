import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Client }  from './client.interface';
@Injectable()
export class FormService {

  baseUrl:string ="http://localhost:3000/api";

  constructor(private http: HttpClient) { }

    getClients(){
        return this.http.get(this.baseUrl + '/clients');
    }
    createClient(client:Client){
      return this.http.post(this.baseUrl + '/client',client);
    }

    getCivilites(){
      return this.http.get(this.baseUrl + '/civilites');
  }

    getObjets(){
      return this.http.get(this.baseUrl + '/objets');
  }
}