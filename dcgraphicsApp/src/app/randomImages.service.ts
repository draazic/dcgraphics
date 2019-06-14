import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ImageRandom }  from './imageRandom.interface';
import { Observable} from 'rxjs';
@Injectable()
export class RandomService{

    baseUrl:string ="https://api.unsplash.com";
    //image:any
    constructor(private http: HttpClient) { }

    getImages():Observable<ImageRandom[]> {
        //this.image=this.http.get<ImageRandom[]>(this.baseUrl + "/photos");
        return this.http.get<ImageRandom[]>(this.baseUrl + "/photos?client_id=6271bc67557a732e0ff6cd9c3a891ea6e7fe737eff3094817421330f952baa57");
        //console.log(this.image);
    }

}