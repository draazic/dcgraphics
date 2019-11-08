import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()

export class WeatherService {

    baseUrl:string ="https://www.prevision-meteo.ch/services/json";

  constructor(private http: HttpClient) { }

  getData(lat,lng) {
    console.log(lat)  
    return this.http.get<any[]>(this.baseUrl + '/lat='+lat+'lng='+lng);
}





}