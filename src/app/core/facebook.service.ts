import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, concatMap } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';

import {
  FacebookService,
  InitParams,
  LoginResponse,
  LoginOptions
} from 'ngx-facebook';

import {
  FacebookAction,
  FaceBookActionTypes,
  FacebookState,
  FaceBookStateTypes
} from './facebook-types';

@Injectable()
export class FaceBookDataService extends BehaviorSubject<FacebookState> {
  private _userId: string = null;

  public actions: Subject<FacebookAction> = new Subject();

  constructor(private _facebookService: FacebookService) {
    super({ state: FaceBookStateTypes.NOT_CONNECTED });
    const initParams: InitParams = {
      appId: '347324799087196',
      xfbml: true,
      version: 'v2.12'
    };

    this._facebookService.init(initParams);

    this.actions.subscribe((action: FacebookAction) => {
      this._doAction(this.value, action);
    });
  }

  private _launchError = (err: any) => {
    this.next({ state: FaceBookStateTypes.ERROR, data: err });
  }

  private _doAction(state: FacebookState, action: FacebookAction) {
    switch (action.type) {
      case FaceBookActionTypes.LOGIN:
        this._login().subscribe((data: LoginResponse) => {
          this.next({ state: FaceBookStateTypes.CONNECTED, data: data });
          this._userId = data.authResponse.accessToken;
        }, this._launchError);
        break;
      case FaceBookActionTypes.LOGOUT:
        this._logout().subscribe((data: any) => {
          this.next({ state: FaceBookStateTypes.NOT_CONNECTED, data: data });
        }, this._launchError);
        break;
      case FaceBookActionTypes.PROFILE:
        this._getProfile().subscribe((data: any) => {
          this.next({ state: FaceBookStateTypes.IDENTIFIED, data: data });
        }, this._launchError);
        break;
      case FaceBookActionTypes.IDENTIFY:
        this._login().pipe(
          concatMap((data: any) => {
            this.next({ state: FaceBookStateTypes.CONNECTED, data: data });
            return this._getProfile();
          })
        )
        .subscribe(
          (data: any) => { this.next({ state: FaceBookStateTypes.IDENTIFIED, data: data }); },
          this._launchError
        );
        break;
    }
  }

  private _login(): Observable<LoginResponse> {
    return Observable.fromPromise(
      this._facebookService.login({
        scope: 'publish_actions,email,user_likes,user_posts'
      })
    );
  }

  private _logout(): Observable<any> {
    return Observable.fromPromise(this._facebookService.logout());
  }

  private _getProfile(): Observable<any> {
    return Observable.fromPromise(
      this._facebookService.api('/me', 'get', {fields: 'id,name,posts{full_picture,message,attachments{type,url,media},description}'})
    );
  }
}
