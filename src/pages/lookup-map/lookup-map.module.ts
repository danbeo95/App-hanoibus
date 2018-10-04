import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookupMapPage } from './lookup-map';

@NgModule({
  declarations: [
    LookupMapPage,
  ],
  imports: [
    IonicPageModule.forChild(LookupMapPage),
  ],
})
export class LookupMapPageModule {}
