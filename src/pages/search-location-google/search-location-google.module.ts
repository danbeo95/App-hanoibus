import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLocationGooglePage } from './search-location-google';

@NgModule({
  declarations: [
    SearchLocationGooglePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLocationGooglePage),
  ],
})
export class SearchLocationGooglePageModule {}
