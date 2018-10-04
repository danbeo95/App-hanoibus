import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppModuleProvider } from '../../providers/app-module/app-module';
import { APP_KEY } from '../../app-key';
import { History } from '../../app-class/history';
import { ReslutFindRoadPage } from '../reslut-find-road/reslut-find-road';
import { Locations } from '../../app-class/locations';
import { ParamsToResult} from '../../app-interface/app-interface';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  mHistories:Array<History>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private mAppModule:AppModuleProvider) {
    this.getHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  getHistory(){
    this.mAppModule.getDataFromStorage(APP_KEY.STORAGE_HISTORY).then((data)=>{
      if(data){
        this.mHistories = data.reverse();

      }
      console.log(data);
    })
  }
   // push result find road page
   pushResultFindRoadPage(item:Array<Locations>){
    let params:ParamsToResult = {
      locations:Object.assign([],item)
    }
    this.navCtrl.push(ReslutFindRoadPage,params);
  }
}
