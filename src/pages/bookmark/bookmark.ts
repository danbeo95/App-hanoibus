import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import {APP_KEY } from '../../app-key';
import {Locations } from '../../app-class/locations';
import {ReslutFindRoadPage } from '../../pages/reslut-find-road/reslut-find-road';
import { ParamsToResultMap,ParamsToResult  } from '../../app-interface/app-interface';
/**
 * Generated class for the BookmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {
  mLocations:Array<Locations> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private mAppModule:AppModuleProvider) {
    this.getBookMark();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage');
  }
  // get bookmark
  getBookMark(){
    this.mAppModule.getDataFromStorage(APP_KEY.STORAGE_BOOKMARK).then((data)=>{
      if(data!==null){
        this.mLocations = data;
        console.log(data);
      }
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
