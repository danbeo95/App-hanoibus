import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookupPage } from './lookup';

@NgModule({
  declarations: [
    LookupPage,
  ],
  imports: [
    IonicPageModule.forChild(LookupPage),
  ],
})
export class LookupPageModule {}
