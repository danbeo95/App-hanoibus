import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APP_KEY } from '../../app-key';
import { SearchLocationBusstopPage } from '../../pages/search-location-busstop/search-location-busstop';
import { SearchLocationMapPage} from '../../pages/search-location-map/search-location-map';
import { SearchLocationGooglePage } from '../../pages/search-location-google/search-location-google';
/**
 * Generated class for the SearchLocationPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})
export class SearchLocationPage {
  title: string = '';
  rootParams:any;
  searchLocationGoogleRoot = SearchLocationGooglePage;
  searchLocationMapRoot = SearchLocationMapPage;
  searchLocationBusstopRoot = SearchLocationBusstopPage;


  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.onLoadParams();
  }
  ionViewDidLoad(){
  }
  ionViewDidEnter() {
  }
  onLoadParams() {
    let params = this.navParams.get('info');
    this.rootParams = params;
    if (params['type'] == APP_KEY.KEY_START) {
      this.title = 'Chọn Điểm Đi'
    }
    else {
      this.title = 'Chọn Điểm Đến'
    }
  }
}
// on load params

