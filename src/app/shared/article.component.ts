import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { FacebookData } from '../core/facebook-types';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'fpn-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  public facebookData: FacebookData;

  @Input()
  public classification = 0;

  @Output()
  public actionClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public active = false;

  ngOnInit () {
    console.log (this.facebookData);
  }

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
