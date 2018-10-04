import { NgModule, Pipe } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLocationBusstopPage } from './search-location-busstop';
import  { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    SearchLocationBusstopPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLocationBusstopPage),
    PipesModule
  ],
})
export class SearchLocationBusstopPageModule {}
