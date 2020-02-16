import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import {Position} from '../interface/position.interface';

@Injectable()

export class DataCurrentService {

    private Position = new Subject<Position>();

    constructor(){
        this.Position = new BehaviorSubject(null);        
      }

      setPosition(position:Position):void{
        this.Position.next(position);
      }

      getPosition(){
        return this.Position; 
      }

      
}