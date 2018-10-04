import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReslutFindRoadPage } from './reslut-find-road';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    ReslutFindRoadPage,
  ],
  imports: [
    IonicPageModule.forChild(ReslutFindRoadPage),
    PipesModule
  ],
})
export class ReslutFindRoadPageModule {}
