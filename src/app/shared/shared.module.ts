import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

import {DndModule} from 'ng2-dnd';

import { ArticleComponent } from './article.component';
import { ArticleDistributionComponent } from './article-distribution.component';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule,
    DndModule.forRoot()
  ],
  declarations: [
    ArticleComponent,
    ArticleDistributionComponent
  ],
  exports: [
    ArticleComponent,
    MatIconModule,
    ArticleDistributionComponent,
    DndModule
  ]
})
export class SharedModule {}
