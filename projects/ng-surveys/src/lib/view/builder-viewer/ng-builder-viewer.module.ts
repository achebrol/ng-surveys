import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap';

import { NgBuilderViewerComponent } from './ng-builder-viewer.component';
import {SharedCommonModule} from '../../shared/shared-common.module';
import {BuilderModule} from '../../builder/builder.module';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    SharedCommonModule,
    BuilderModule,
  ],
  declarations: [NgBuilderViewerComponent],
  exports: [NgBuilderViewerComponent]
})
export class NgBuilderViewerModule { }
