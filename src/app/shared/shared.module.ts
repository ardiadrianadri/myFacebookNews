import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

import { ArticleComponent } from './article.component';
import { ArticleDistributionComponent } from './article-distribution.component';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule
  ],
  declarations: [
    ArticleComponent,
    ArticleDistributionComponent
  ],
  exports: [
    ArticleComponent,
    MatIconModule,
    ArticleDistributionComponent
  ]
})
export class SharedModule {}
