import { NgModule, SkipSelf, Optional } from '@angular/core';

import { FaceBookDataService } from './facebook.service';

@NgModule({
  providers: [
    FaceBookDataService
  ]
})
export class CoreModule {

  constructor(@SkipSelf() @Optional() private _parent: CoreModule) {
    if (_parent) {
      throw new Error ('Core module should be imported only once');
    }
  }
}
