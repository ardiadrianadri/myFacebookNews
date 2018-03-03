import { Component, Input } from '@angular/core';

import { FacebookData } from '../core/facebook-types';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'fpn-distribution',
  templateUrl: './article-distribution.component.html',
  styleUrls: ['./article-distribution.component.css']
})
export class ArticleDistributionComponent {

  @Input()
  public dataFaceBook: FacebookData;
}
