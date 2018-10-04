import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLocationMapPage } from './search-location-map';

@NgModule({
  declarations: [
    SearchLocationMapPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLocationMapPage),
  ],
})
export class SearchLocationMapPageModule {}
