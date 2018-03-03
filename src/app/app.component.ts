import { Component } from '@angular/core';

import { FaceBookDataService } from './core/facebook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private facebookData: FaceBookDataService ) {}

  doLogin() {
    this.facebookData.login()
    .then(
      data => {
        console.log ('Data: ', data);
      }
    )
    .catch(error => { console.log ('Error: ', error); });
  }
 }
