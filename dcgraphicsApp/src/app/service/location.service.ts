import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()

export class LocationService {

    getPosition(): Promise<any>
    {
      return new Promise((resolve, reject) => {
  
        navigator.geolocation.getCurrentPosition(resp => {
  
            resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          },
          err => {
            reject(err);
          });
      });
  
    }


}