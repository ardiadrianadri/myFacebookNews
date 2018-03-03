import { Injectable } from '@angular/core';

import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Injectable()
export class FaceBookDataService {

  constructor(
    private _facebookService: FacebookService
  ) {

    const initParams: InitParams = {
      appId: '347324799087196',
      xfbml: true,
      version: 'v2.12'
    };

    this._facebookService.init(initParams);
  }

  public login(): Promise<LoginResponse> {
    return this._facebookService.login();
  }
}
