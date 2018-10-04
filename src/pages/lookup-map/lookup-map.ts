import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { ParamsToLookUp } from '../../app-interface/app-interface';
import { Busstation } from '../../app-class/busstation';
import { GoogleMap, MarkerOptions,LatLng } from '@ionic-native/google-maps';
import { APP_KEY } from '../../app-key';

/**
 * Generated class for the LookupMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lookup-map',
  templateUrl: 'lookup-map.html',
})
export class LookupMapPage {
  mBusstation: Busstation;
  mDirectionFilter: any;
  mTogglePopup: boolean = false;
  mDirection: string = APP_KEY.KEY_START;
  mMap: GoogleMap;
  @ViewChild('map_canvas') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mAppModule: AppModuleProvider) {
    this.onLoadParams();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LookupMapPage');
    this.loadMap();
  }
  // load map
  loadMap() {
    this.mAppModule.getGoogleMapController().loadMap(this.mapElement).subscribe((res) => {
      this.mMap = res.map;
      // this.addPolyline();
      this.addMarker();
    })

  }
  // add poliline
  addPolyline() {
    let overviewPath = [];
    this.mDirectionFilter['Geo'].forEach(item => {
      overviewPath.push(item);
    });
    this.mAppModule.getGoogleMapController().addPolyline(this.mMap, overviewPath)
  }
  // on load params
  onLoadParams() {
    this.mBusstation = this.navParams.data.busstation;
    this.mDirectionFilter = this.mBusstation.go;
    console.log(this.mBusstation);
  }
  // on select direction
  onSelectDirection() {
    if (this.mDirection == APP_KEY.KEY_START) {
      this.mDirectionFilter = this.mBusstation.go;
    }
    else {
      this.mDirectionFilter = this.mBusstation.re;
    }
    this.mMap.clear().then(() => {
      this.addMarker();
    });
  }
  // add marker busstop
  addMarker() {
    let markerOptions: Array<MarkerOptions> = [];
    this.mDirectionFilter['Station'].forEach((item,index) => {
      let title:string = item['Name'];
      let markerOption:MarkerOptions={
        position:new LatLng(item.Geo.Lat,item.Geo.Lng),
        icon:{
          url:'assets/imgs/icon_busstop_small.png',
          size:{
            width:25,
            height:25
          }
        },
        title:title
      }
      markerOptions.push(markerOption);
    });
    this.mAppModule.getGoogleMapController().moveCamera(this.mMap,markerOptions).then(()=>{
      this.addPolyline();
      // this.mAppModule.getGoogleMapController().addMarker(this.mMap,markerOptions);

    })
  }
  // on click busstation
  onClickBusStation(item){
    let position = new LatLng(item.Geo.Lat,item.Geo.Lng);
    this.mAppModule.getGoogleMapController().animateCamera(this.mMap,position).then(()=>{

    })
  }
}
