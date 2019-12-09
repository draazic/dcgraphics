import { Component } from '@angular/core';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})
export class AppComponent {
  title = 'dcgraphicsApp';

  getState(outlet) {
    //console.log(outlet.activatedRouteData.state)

    return outlet.activatedRouteData.state;
  }
}
