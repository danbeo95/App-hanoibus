import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Busstop } from '../../app-class/busstop';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { ParamsFromOtherToHomePage,ParamsFromHomePage } from '../../app-interface/app-interface';
import { APP_KEY } from '../../app-key';
/**
 * Generated class for the SearchLocationBusstopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-location-busstop',
  templateUrl: 'search-location-busstop.html',
})
export class SearchLocationBusstopPage {
  mBusstops:Array<Busstop>=[];
  mBusstopsFilter:Array<Busstop>=[];
  itemsPerload:number = 20;
  mSearchData:string = '';
  mParams:ParamsFromHomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,private mAppModule:AppModuleProvider) {
      this.loadBusstop();
      this.onLoadParams();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchLocationBusstopPage');
  }
  // load bus stop
  loadBusstop(){
    this.mAppModule.showLoading();
    this.mAppModule.getLoaddataController().getDataBusstop().subscribe((data)=>{
      this.mBusstops = data;
      this.mBusstopsFilter = this.mBusstops.slice(0,this.itemsPerload);
      this.mAppModule.hideLoad();
    })
  }
  // doInfinite
  doInfinite(infinite){
    this.itemsPerload = this.itemsPerload + 10 ;
    this.mBusstopsFilter = this.mBusstops.slice(0,this.itemsPerload);
    infinite.complete();
    if(this.itemsPerload>this.mBusstops.length || this.itemsPerload == this.mBusstops.length){
      infinite.enable(false);
    }
  }
  // onSearch
  onSearch(){
    if(this.mSearchData == ''){
      this.mBusstopsFilter = this.mBusstops.slice(0,this.itemsPerload);
    }
    else{
      this.mBusstopsFilter = this.mBusstops.filter((item)=>{
        return item['name'].toLowerCase().indexOf(this.mSearchData.toLowerCase()) !== -1;
      })
    }
  }
  // on load params
  onLoadParams(){
    this.mParams = this.navParams.data;
  }
  // back to home
  backToHome(item:Busstop){
    let type = this.mParams.type;
    let params:ParamsFromOtherToHomePage = {
      type:type,
      location:item.name,
      latlng:item.latlng
    }
    this.navCtrl.parent.parent.pop();
    this.mAppModule.pushlishEvent(APP_KEY.EVENT_PUSH_PARAMS_TO_HOME,params);
  }
}
