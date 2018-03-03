import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

import { FacebookData } from '../core/facebook-types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'fpn-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  @Input()
  public facebookData: FacebookData;

  @Output()
  public actionClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public active = false;

  public onClose () {
    this.actionClose.emit(true);
  }

  @HostListener('mouseenter')
  private _getActive() {
    this.active = true;
  }

  @HostListener('mouseleave')
  private _lostActive() {
    this.active = false;
  }
}
