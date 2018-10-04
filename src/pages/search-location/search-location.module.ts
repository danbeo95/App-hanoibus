import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLocationPage } from './search-location';

@NgModule({
  declarations: [
    SearchLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLocationPage),
  ]
})
export class SearchLocationPageModule {}
