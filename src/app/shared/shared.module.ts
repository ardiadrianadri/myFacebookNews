import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

import { ArticleComponent } from './article.component';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule
  ],
  declarations: [
    ArticleComponent
  ],
  exports: [
    ArticleComponent,
    MatIconModule
  ]
})
export class SharedModule {}
