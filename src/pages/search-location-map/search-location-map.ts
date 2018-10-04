import { Component,ViewChild,ElementRef,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { GoogleMap,GoogleMapsEvent,CameraPosition,LatLng} from '@ionic-native/google-maps';
import { ParamsFromOtherToHomePage,ParamsFromHomePage  } from '../../app-interface/app-interface';
import {APP_KEY  } from '../../app-key';
/**
 * Generated class for the SearchLocationMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-location-map',
  templateUrl: 'search-location-map.html',
})
export class SearchLocationMapPage {
  @ViewChild('map_canvas') mapElement:ElementRef;
  location:string = '';
  mMap:GoogleMap;
  paramsFromHome:ParamsFromHomePage;
  paramstoHomePage:ParamsFromOtherToHomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,private mAppModule:AppModuleProvider,private mZone:NgZone) {
    this.paramsFromHome = this.navParams.data;
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad SearchLocationMapPage');
  }
  // load map
  loadMap() {
      this.mAppModule.getGoogleMapController().loadMap(this.mapElement).subscribe((res)=>{
        this.mMap = res.map;
        this.mMap.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((data:any[])=>{
          let cameraPosition: CameraPosition<LatLng> = data[0];
          this.mAppModule.getGoogleMapController().geocode(cameraPosition.target).subscribe((address)=>{
            let type:string = this.paramsFromHome.type;
            this.paramstoHomePage = {
              type:type,
              latlng:cameraPosition.target,
              location:address
            }
            this.mZone.run(()=>{
              this.location = address;
            })
          })
        })
      },e=>{

      });
  }
  // back to home
  backToHome(){
    let params = Object.assign({},this.paramstoHomePage)
    this.navCtrl.parent.parent.pop().then(()=>{
      this.mAppModule.pushlishEvent(APP_KEY.EVENT_PUSH_PARAMS_TO_HOME,params);
    })
  }
  // moveMyLocation
  moveMyLocation(){
    this.mAppModule.getGoogleMapController().moveMyLocation(this.mMap);
  }
}
