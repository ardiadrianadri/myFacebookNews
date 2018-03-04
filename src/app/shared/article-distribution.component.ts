import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

import { FacebookData, IndexesArticle } from '../core/facebook-types';
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
  private _from: IndexesArticle = null;

  constructor (private _changeDetect: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Array: ', this.dataFaceBook);
    console.log('First Element: ', this.dataFaceBook[this._actualIndex++]);
    this.firstLineData = this.dataFaceBook[this._actualIndex++];
    this.secondLineData = this.dataFaceBook.slice(this._actualIndex, this._actualIndex += 2 );
    this.thirdLineData = this.dataFaceBook.slice(this._actualIndex, this._actualIndex += 4 );
  }

  public removeArticle(idArt: IndexesArticle) {
    const defaultArticle: FacebookData = {
      message: 'There is not more articles...',
      full_picture: 'assets/sad.jpeg',
      description: 'Maybe you should give more life to your social networks'
    };

    const newArticle = (this.dataFaceBook[this._actualIndex]) ? this.dataFaceBook[this._actualIndex] : defaultArticle;

    switch (idArt.line) {
      case 0:
        this.firstLineData = newArticle;
        break;
      case 1:
        this.secondLineData[idArt.index] = newArticle;
        break;
      case 2:
        this.thirdLineData[idArt.index] = newArticle;
        break;
    }

    this._actualIndex++;
  }

  private _copyDataFacebook ({full_picture = '', message= '', description= ''}): FacebookData {
    return {full_picture: full_picture, message: message, description: description};
  }

  public moveArticleSuccess(to: IndexesArticle) {
    let fromArticle: FacebookData;
    let toArticle: FacebookData;

    switch (this._from.line) {
      case 0:
        fromArticle = this._copyDataFacebook(this.firstLineData);
        break;
      case 1:
        fromArticle = this._copyDataFacebook(this.secondLineData[this._from.index]);
        break;
      case 2:
        fromArticle = this._copyDataFacebook(this.thirdLineData[this._from.index]);
    }

    switch (to.line) {
      case 0:
        toArticle = this._copyDataFacebook(this.firstLineData);
        break;
      case 1:
        toArticle = this._copyDataFacebook(this.secondLineData[to.index]);
      break;
      case 2:
        toArticle = this._copyDataFacebook(this.thirdLineData[to.index]);
      break;
    }

    switch (this._from.line) {
      case 0:
        this.firstLineData = this._copyDataFacebook(toArticle);
        break;
      case 1:
        this.secondLineData[this._from.index] = this._copyDataFacebook(toArticle);
        break;
      case 2:
        this.thirdLineData[this._from.index] = this._copyDataFacebook(toArticle);
        break;
    }

    switch (to.line) {
      case 0:
        this.firstLineData = this._copyDataFacebook(fromArticle);
        break;
      case 1:
        this.secondLineData[to.index] = this._copyDataFacebook(fromArticle);
        break;
      case 2:
        this.thirdLineData[to.index] = this._copyDataFacebook(fromArticle);
        break;
    }

  }

  public changeArticle(from: IndexesArticle) {
    this._from = from;
  }
}
