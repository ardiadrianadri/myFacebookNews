import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

import { FacebookAction, FaceBookActionTypes, FacebookState, FaceBookStateTypes } from './facebook-types';

@Injectable()
export class FaceBookDataService extends BehaviorSubject<FacebookState> {

  public actions: Subject<FacebookAction> = new Subject();

  constructor(
    private _facebookService: FacebookService
  ) {

    super ({state: FaceBookStateTypes.NOT_CONNECTED});
    const initParams: InitParams = {
      appId: '347324799087196',
      xfbml: true,
      version: 'v2.12'
    };

    this._facebookService.init(initParams);

    this.actions
    .subscribe ((action: FacebookAction) => { this._doAction(this.value, action); });
  }

  private _doAction (state: FacebookState, action: FacebookAction) {

    switch (action.type) {
      case FaceBookActionTypes.LOGIN:
        this._login()
        .then((data: LoginResponse) => { this.next({ state: FaceBookStateTypes.CONNECTED, data: data }); })
        .catch((err: any) => { this.next({state: FaceBookStateTypes.ERROR, data: err }); });
        break;
      case FaceBookActionTypes.LOGOUT:
        this._logout()
        .then((data: any) => { this.next({state: FaceBookStateTypes.NOT_CONNECTED, data: data }); })
        .catch((err: any) => { this.next({state: FaceBookStateTypes.ERROR, data: err}); });
        break;
      case FaceBookActionTypes.PROFILE:
        this._getProfile()
        .then((data: any) => { this.next({state: FaceBookStateTypes.IDENTIFIED, data: data }); })
        .catch((err: any) => { this.next({ state: FaceBookStateTypes.ERROR, data: err }); });
        break;
      case FaceBookActionTypes.IDENTIFY:
        this._login()
        .then((data: any) => {
          const chainAction: FacebookAction = {
            type: FaceBookActionTypes.PROFILE
          };

          this.next({ state: FaceBookStateTypes.CONNECTED, data: data });
          this.actions.next(chainAction);
        });
    }

  }

  private _login(): Promise<LoginResponse> {
    return this._facebookService.login();
  }

  private _logout(): Promise<any> {
    return this._facebookService.logout();
  }

  private _getProfile(): Promise<any> {
    return this._facebookService.api('/me');
  }
}
