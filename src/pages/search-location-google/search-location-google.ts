import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParamsFromOtherToHomePage,ParamsFromHomePage } from '../../app-interface/app-interface';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import {  LatLng } from '@ionic-native/google-maps';
import {APP_KEY  } from '../../app-key';
declare var google:any;
/**
 * Generated class for the SearchLocationGooglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-location-google',
  templateUrl: 'search-location-google.html',
})
export class SearchLocationGooglePage {
  params:ParamsFromHomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,private mAppModule:AppModuleProvider) {
    this.onLoadParams();
  }
  ionViewDidLoad() {
    this.initAutoComplete();

  }
  // on load params
  onLoadParams(){
    this.params = this.navParams.data;
  }
  // init autocomplete
  initAutoComplete(){
    let input  = document.getElementById('autocomplete-input');
    let options = {
      componentRestrictions: {country: "vn"}
    }
    let autocomplete = new google.maps.places.Autocomplete(input,options);
    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);
      autocomplete.addListener('place_changed', ()=>{
        let place = autocomplete.getPlace();
        let latlng:LatLng = new LatLng(place.geometry.location.lat(),place.geometry.location.lng());
        let name:string = place.name;
        let type:string = this.params.type;
        let params:ParamsFromOtherToHomePage={
            latlng:latlng,
            location:name,
            type:type
        }
        this.navCtrl.parent.parent.pop();
        this.mAppModule.pushlishEvent(APP_KEY.EVENT_PUSH_PARAMS_TO_HOME,params);
      });

  }
}
