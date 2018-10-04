import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultFindroadMapPage } from './result-findroad-map';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    ResultFindroadMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultFindroadMapPage),
    PipesModule
  ],
})
export class ResultFindroadMapPageModule {}
