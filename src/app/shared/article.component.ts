import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { FacebookData, IndexesArticle } from '../core/facebook-types';
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
  public classification: IndexesArticle = {
    line: 0,
    index: 0
  };

  @Output()
  public actionClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public title = 'For Gods sake, do not be lazy and write something';
  public defaultImage = 'assets/sad.jpeg';
  public defaultMessage = 'I feel a huge emptiness on this page';

  public active = false;

  ngOnInit () {
    if (this.facebookData) {
      this.title = this.facebookData.message;
      this.defaultImage = this.facebookData.full_picture;
      this.defaultMessage = this.facebookData.description;
    }
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
