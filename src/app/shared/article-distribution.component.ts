import { Component, Input, OnInit } from '@angular/core';

import { FacebookData } from '../core/facebook-types';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'fpn-distribution',
  templateUrl: './article-distribution.component.html',
  styleUrls: ['./article-distribution.component.css']
})
export class ArticleDistributionComponent implements OnInit {

  @Input()
  public dataFaceBook: FacebookData[];

  public firstLineData: FacebookData;
  public secondLineData: FacebookData[];
  public thirdLineData: FacebookData[];

  private _actualIndex = 0;

  ngOnInit() {
    console.log('Array: ', this.dataFaceBook);
    console.log('First Element: ', this.dataFaceBook[this._actualIndex++]);
    this.firstLineData = this.dataFaceBook[this._actualIndex++];
    this.secondLineData = this.dataFaceBook.slice(this._actualIndex, this._actualIndex += 2 );
    this.thirdLineData = this.dataFaceBook.slice(this._actualIndex, this._actualIndex += 4 );
  }
}
