import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, Platform, App } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { AppConfig } from '../../app-config';
import { ParamsFromHomePage, ParamsFromOtherToHomePage } from '../../app-interface/app-interface';
import { APP_KEY } from '../../app-key';
import { SearchLocationPage } from '../../pages/search-location/search-location';
import { ReslutFindRoadPage } from '../../pages/reslut-find-road/reslut-find-road';
import { HistoryPage } from '../../pages/history/history';
import { History } from '../../app-class/history';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  LocationService,
  MyLocation,
  GoogleMapsMapTypeId,
  ILatLng,
  MarkerIcon
} from '@ionic-native/google-maps';
import { Locations } from '../../app-class/locations';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  mLocations: Array<Locations> = [];
  mMarkerOptions: Array<MarkerOptions> = [];
  mMap: GoogleMap;
  @ViewChild('map_canvas') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public platform: Platform,
    private mAppModule: AppModuleProvider, private mZone: NgZone) {
    this.loadMap();
    this.mLocations.push(new Locations());
    this.mLocations.push(new Locations());
    this.setIconToMarker();
    this.subscribeEvent();
  }
  // init marker
  initMarker(position: LatLng) {
    this.mLocations[0].setPositionMarker(position);
    this.mAppModule.getGoogleMapController().addMarker(this.mMap, [this.mLocations[0].markerOptions]);
  }
  // set icon url to marker
  setIconToMarker() {
    this.mLocations[0].setIconMarker(AppConfig.urlIconStart);
    this.mLocations[1].setIconMarker(AppConfig.urlIconEnd);
  }
  // load map
  loadMap() {
    this.platform.ready().then(() => {
      this.mAppModule.getGoogleMapController().loadMap(this.mapElement).subscribe((res) => {
        this.mMap = res.map;
        let cameraPosition = res.location;
        this.mAppModule.getGoogleMapController().geocode(cameraPosition).subscribe((address) => {
          this.initMarker(cameraPosition);
          this.mZone.run(() => {
            this.mLocations[0].setLalng(cameraPosition);
            this.mLocations[0].setLocation(address);
          })
        })
      });
    });
  }
  // push search location tabs
  pushSearchLocationPage(type: string) {
    let params: ParamsFromHomePage = {
      type: type
    }
    this.navCtrl.push(SearchLocationPage, { info: params });
  }
  // on subscribe event
  subscribeEvent() {
    this.mAppModule.subscribeEvent(APP_KEY.EVENT_PUSH_PARAMS_TO_HOME, (data) => {
      this.onLoadParams(data);
    })
  }
  // on load params
  onLoadParams(data: ParamsFromOtherToHomePage) {
    let type = data.type;
    if (type == APP_KEY.KEY_START) {
      this.mLocations[0].parse(data);
      this.mLocations[0].setPositionMarker(data.latlng);
    }
    else {
      this.mLocations[1].parse(data);
      this.mLocations[1].setPositionMarker(data.latlng);
      let position = this.mLocations[1].setPositionMarker(data.latlng);
    }
    this.moveCamera();
  }
  // swicth location
  swithLocation() {
    this.mLocations.reverse();
    this.setIconToMarker();
    this.switchMarker();
  }
  // move camera
  moveCamera() {
    let arrayMakersOptions: Array<MarkerOptions> = [];
    this.mLocations.forEach((item) => {
      if (item.markerOptions.position.lat !== 0) {
        arrayMakersOptions.push(item.markerOptions);
      }
    })
    this.mAppModule.getGoogleMapController().moveCamera(this.mMap, arrayMakersOptions).then(()=>{
    });
  }
  // switch marker
  switchMarker() {
   this.moveCamera();
  }
  // move my location
  moveMyLocation() {
    this.mAppModule.getGoogleMapController().moveMyLocation(this.mMap);
  }
  // push to result find road page
  pushResultFindRoadPage() {
    if (this.mLocations[0].location !== '') {
      this.mAppModule.showToast('Vui lòng chọn điểm đến');
    }
    else if (this.mLocations[1].location !== '') {
      this.mAppModule.showToast('Vui lòng chọn điểm đi');
    }
    else {
      let params = Object.assign([], this.mLocations);
      this.saveToHistory();
      this.navCtrl.push(ReslutFindRoadPage, { locations: params });
    }
  }
  // save direction to storage
  bookmark() {
    this.mAppModule.getDataFromStorage(APP_KEY.STORAGE_BOOKMARK).then((data) => {
      if (data == null || data.length == 0) {
        data = [];
        data.push(this.mLocations);
      }
      else if (this.checkBookmark(data, this.mLocations)) {
        data.push(this.mLocations);
      }
      this.mAppModule.saveStorage(APP_KEY.STORAGE_BOOKMARK, data).then(() => {
        this.mAppModule.showToast('Tuyến đường đã được lưu lại !');
      })
    })
  }
  // check bookmark
  checkBookmark(data: Array<Array<Locations>>, locations: Array<Locations>): Boolean {
    let isCanBookmark: Boolean = true;
    data.forEach((item) => {
      if (locations[0].compareLocation(item[0]) && locations[1].compareLocation(item[1])) {
        isCanBookmark = false;
      }
    });
    return isCanBookmark;
  }
  // push histrory page
  pushHistoryPage(){
    this.navCtrl.push(HistoryPage);
  }
  // save to history
  saveToHistory(){
    this.mAppModule.getDataFromStorage(APP_KEY.STORAGE_HISTORY).then((data)=>{
      if(data==null||data.length==0){
        data = [];
      }
      let history = new History();
      let locations = Object.assign([],this.mLocations);
      history.setLocations(locations);
      data.push(history);
      this.mAppModule.saveStorage(APP_KEY.STORAGE_HISTORY,data);
    })
  }
}
