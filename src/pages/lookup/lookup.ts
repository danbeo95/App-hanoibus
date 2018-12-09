import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { Busstop } from '../../app-class/busstop';
import { LookupMapPage } from '../lookup-map/lookup-map';
import { Busstation } from '../../app-class/busstation';
import { ParamsToLookUp  } from '../../app-interface/app-interface';
/**
 * Generated class for the LookupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lookup',
  templateUrl: 'lookup.html',
})
export class LookupPage {
  mBusstops:Array<Busstop> = [];
  itemPerLoad:number = 15;
  constructor(public navCtrl: NavController, public navParams: NavParams,private mAppModule:AppModuleProvider) {
    this.getBusstop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LookupPage');
  }
  // get busstop
  getBusstop(){
    this.mAppModule.showLoading();
    this.mAppModule.getLoaddataController().getDataBusstation().subscribe((data)=>{
      this.mBusstops = data;
      this.mAppModule.hideLoad();
    })
  }
  // push LookupMapPage

  pushLookupMapPage(item:Busstation){
    let params:ParamsToLookUp={
      busstation:item
    }
    this.navCtrl.push(LookupMapPage,params);
  }
  // doInfinite
  doInfinite(infinite){
    this.itemPerLoad = this.itemPerLoad + 10;
    infinite.complete();
    if(this.itemPerLoad>this.mBusstops.length||this.itemPerLoad==this.mBusstops.length){
      infinite.enable(false);
    }
  }
}
