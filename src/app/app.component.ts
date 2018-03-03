import { Component, OnInit } from '@angular/core';

import { FaceBookDataService } from './core/facebook.service';

import { FacebookState, FacebookAction, FaceBookActionTypes, FaceBookStateTypes, FacebookData } from './core/facebook-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private static defaultTitle = 'Welcome to personal news paper';

  public title = AppComponent.defaultTitle;
  public stateStr: FaceBookStateTypes;
  public stateNotConnected = FaceBookStateTypes.NOT_CONNECTED;
  public dataFaceBook: FacebookData;

  constructor( private _facebookData: FaceBookDataService ) {}

  ngOnInit () {
    this.stateStr = this._facebookData.getValue().state;
    this._facebookData
    .subscribe((state: FacebookState) => {
      this.stateStr = state.state;
      console.log ('new state: ', state);
      this._updateState(state);
    });
  }

  public doLogin() {
   const action: FacebookAction = {
     type: FaceBookActionTypes.IDENTIFY
   };

   this._facebookData.actions.next(action);
  }

  public doLogout() {
    const action: FacebookAction = {
      type: FaceBookActionTypes.LOGOUT
    };

    this._facebookData.actions.next(action);
  }

  private _updateState (newState: any) {
    switch (newState.state) {
      case FaceBookStateTypes.IDENTIFIED:
        this.title = `Welcome ${newState.data.name} to your personal news paper`;
        this.dataFaceBook = newState.data.posts.data[0];
        break;
      case FaceBookStateTypes.NOT_CONNECTED:
        this.title = AppComponent.defaultTitle;
        break;
    }
  }

 }
