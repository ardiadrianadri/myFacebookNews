import { Component, Input, OnInit } from '@angular/core';

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
}
