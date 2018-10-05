import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, MarkerOptions, LatLng } from '@ionic-native/google-maps';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { Route } from '../../app-class/route';
import { Locations } from '../../app-class/locations';
import { Instructions } from '../../app-class/instructions';
import { APP_KEY } from '../../app-key';
/**
 * Generated class for the ResultFindroadMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result-findroad-map',
  templateUrl: 'result-findroad-map.html',
})
export class ResultFindroadMapPage {
  @ViewChild('map_canvas') mapElement: ElementRef;
  mMap: GoogleMap;
  mRoute: Route;
  mTogglePopup: boolean;
  mLocations: Array<Locations> = [];
  mMarkerBusstop: Array<MarkerOptions> = [];
  mInstructions: Array<Instructions> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private mAppModule: AppModuleProvider) {
    this.onLoadParams();
  }

  ionViewDidLoad() {
    this.loadMap();
    this.filterInstruction();
  }
  // load params
  onLoadParams() {
    this.mRoute = this.navParams.get('route');
    console.log(this.mRoute);
    this.mLocations = this.navParams.get('locations');
    this.findLocationBusstop();
  }
  // load map
  loadMap() {
    this.mAppModule.getGoogleMapController().loadMap(this.mapElement).subscribe((response) => {
      this.mMap = response.map;
      this.initMarker();
      this.mAppModule.getGoogleMapController().addPolyline(this.mMap, this.mRoute.overview_path).then(() => {
        this.addMarkerBusstop();
      }, e => {
        console.log('error' + e);
      });
    })
  }
  // add marker stat $$ end
  initMarker() {
    let makerOptions: Array<MarkerOptions> = [];
    this.mLocations.forEach((item) => {
      makerOptions.push(item.markerOptions);
    })
    this.mAppModule.getGoogleMapController().addMarker(this.mMap, makerOptions);
  }
  // find loction busstop
  findLocationBusstop() {
    let steps: Array<any> = this.mRoute.legs[0].steps;
    steps.forEach((step) => {
      if (step['travel_mode'] == APP_KEY.TRAVEL_MODE_TRANSIT) {
        let latlngBusstop: LatLng = new LatLng(step['start_location'].lat(), step['start_location'].lng());
        let latlngArrivalStop: LatLng = new LatLng(step['transit']['arrival_stop']['location'].lat(),step['transit']['arrival_stop']['location'].lng());
        let markerOptionsBusstop: MarkerOptions = {
          position: latlngBusstop,
          icon: {
            url: 'assets/imgs/icon_busstop_small.png',
            size: {
              width: 25,
              height: 25
            }
          }
        };
        let markerOptionsArrovalstop: MarkerOptions = {
          position: latlngArrivalStop,
          icon: {
            url: 'assets/imgs/icon_bus_big_1.png',
            size: {
              width: 25,
              height: 23
            }
          }
        };
        this.mMarkerBusstop.push(markerOptionsBusstop);
        this.mMarkerBusstop.push(markerOptionsArrovalstop);
      }
    })
  };
  // add marker busstop
  addMarkerBusstop() {
    this.mMarkerBusstop.forEach((item) => {
      this.mMap.addMarker(item);
    })
  }
  // filter instruction
  filterInstruction() {
    let steps: Array<any> = this.mRoute.legs[0].steps;
    this.addLocationStart();
    // filter betwwen transit or walking
    steps.forEach((step) => {
      if (step['travel_mode'] == APP_KEY.TRAVEL_MODE_WAKLKING) {
        let instruction = new Instructions({
          icon: 'walking',
          instruction: step.instructions,
          duration: step.duration,
          distance: step.distance
        });
        this.mInstructions.push(instruction);
      }
      else if (step['travel_mode'] == APP_KEY.TRAVEL_MODE_TRANSIT) {
        let transit = step.transit;
        let line = transit['line'];
        let instructionBus = new Instructions({
          icon: 'transit',
          instruction: line['name'],
          distance: step.distance,
          duration: step.duration
        });
        let arrivalStop = transit['arrival_stop'];
        let instructionArrivalStop = this.fillterArrivalStop(arrivalStop);
        this.mInstructions.push(instructionBus);
        this.mInstructions.push(instructionArrivalStop);
      }
    });
    // push end location
    this.addLocationEnd();
  }
  // filter instruction arrival stop
  fillterArrivalStop(arrivalStop):Instructions{
    return new Instructions({
      icon: 'arrivalstop',
      instruction: arrivalStop['name']
    })
  }
  // add location start
  addLocationStart(){
    let legs = this.mRoute.legs[0];
    this.mInstructions.push(new Instructions({
      icon: 'start',
      instruction: legs['start_address']
    }))
  }
  // add location end
  addLocationEnd(){
    let legs = this.mRoute.legs[0];
    this.mInstructions.push(new Instructions({
      icon: 'end',
      instruction: legs['end_address']
    }))
  }
  // moveMyLocation
  moveMyLocation(){
    this.mAppModule.getGoogleMapController().moveMyLocation(this.mMap);
  }
}
