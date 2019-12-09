import { Component, OnInit ,Input} from '@angular/core';
import {Position} from '../../interface/position.interface';
import * as L from 'leaflet';
import {DataCurrentService} from '../../service/dataCurrent.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  position:Position;

  constructor(
    private dataCurrentService : DataCurrentService, 

  ) { }

 

  

  ngOnInit() {
    //console.log(this._position)

    this.dataCurrentService.getPosition().subscribe((position:Position)=>{
      this.position=position
      console.log(this.position)

      if (this.position != null){

        // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
        //const myfrugalmap = L.map('frugalmap').setView([50.6311634, 3.0599573], 12);
        const myfrugalmap = L.map('frugalmap').setView([this.position.lat, this.position.long], 12);

 
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Frugal Map'
        }).addTo(myfrugalmap);


        const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
        });
        L.marker([this.position.lat, this.position.long], {icon: myIcon}).bindPopup('Vous êtes ici..').addTo(myfrugalmap).openPopup();

      }

        

    })

  


  }

}
