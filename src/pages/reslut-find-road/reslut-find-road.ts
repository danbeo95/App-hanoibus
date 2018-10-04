import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertOptions, Alert} from 'ionic-angular';
import { Route } from '../../app-class/route';
import { AppModuleProvider} from '../../providers/app-module/app-module';
import {ResultFindroadMapPage } from '../../pages/result-findroad-map/result-findroad-map';
import { ParamsToResultMap } from '../../app-interface/app-interface';
/**
 * Generated class for the ReslutFindRoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reslut-find-road',
  templateUrl: 'reslut-find-road.html',
})
export class ReslutFindRoadPage {
  mLocations:Array<any>=[];
  mRoutes:Array<Route> = [];
  mInputAlerts:Array<any> = [
    {
      type:'radio',
      value:'duration',
      label:'Thời gian di chuyển',
      checked:false
    },
    {
      type:'radio',
      value:'distance',
      label:'Quãng đường di chuyển',
      checked:false
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,private mAppModule:AppModuleProvider) {
    this.onLoadParams();
    this.onDirectionRoute();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReslutFindRoadPage');
  }
  // on load params
  onLoadParams(){
    this.mLocations  = this.navParams.get('locations');
   
  }
  // on search direction route
  onDirectionRoute(){
    this.mAppModule.showLoading();
    this.mAppModule.getGoogleMapController().directionsRoute(this.mLocations).subscribe((routes)=>{
      this.mRoutes = routes;
      console.log(routes);
      this.mAppModule.hideLoad();
    });
  }
  // push to result map page
  pushResultFindRoadMapPage(route:Route){
    let params:ParamsToResultMap={
      route:route,
      locations:this.mLocations,
      routes:this.mRoutes
    }
    this.navCtrl.push(ResultFindroadMapPage,params);
  }
  // switch location
  switchLocation(){
    this.mLocations.reverse();
    this.onDirectionRoute();
  }
  // sort
  sort(){
    let alertOptions:AlertOptions = {
      title:'Lọc',
      inputs:this.mInputAlerts,
      buttons:[
        {
          text:'Cancel'
        },
        {
          text:'Ok',
          handler:(value)=>{
            this.doSort(value);
          }
        }
      ]
    };
    this.mAppModule.getAlertCtrl().create(alertOptions).present();
  }
  // do sort
  doSort(key:string){
    console.log(key);
    this.mRoutes = this.mAppModule.getGoogleMapController().sortRoute(this.mRoutes,key);
  }
}
