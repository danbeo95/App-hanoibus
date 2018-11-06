import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleMapController } from '../goolemap-module/goolemap-module';
import { Events, LoadingController, Loading, ToastController, AlertController, Platform } from 'ionic-angular';
import { LoaddataController } from '../app-load-data/app-load-data';
import { Storage } from '@ionic/storage';
import { AdMobFree } from '@ionic-native/admob-free';
import { AdmobController } from '../admob-module';
/*
  Generated class for the AppModuleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppModuleProvider {
  mGoogleMapController: GoogleMapController = null;
  mLoading: Loading = null;
  mLoaddataController: LoaddataController = null;
  mAmodController: AdmobController = null;
  constructor(private mEvents: Events, private mLoadingCtrl: LoadingController,
    private mToastCtrl: ToastController, public mHttp: HttpClient, private mAlertCtrl: AlertController,
    private mStorage: Storage, private mAdmob: AdMobFree, private mPlatform: Platform) {
    this.mGoogleMapController = new GoogleMapController();
    this.mLoaddataController = new LoaddataController();
    this.mAmodController = new AdmobController();
    // this.mAmodController.setAdmob(this.mAdmob);
    this.mLoaddataController.setHttp(this.mHttp);
    console.log('Hello AppModuleProvider Provider');
  }
  // get loaddata controller
  getLoaddataController() {
    return this.mLoaddataController;
  }
  // get googlemap controller
  getGoogleMapController() {
    return this.mGoogleMapController;
  }
  // publish event
  pushlishEvent(key: string, data: any) {
    this.mEvents.publish(key, data);
  }
  // subscribe event
  subscribeEvent(key: string, callback?: any) {
    this.mEvents.subscribe(key, callback);
  }
  // unsubscribe event
  unsubscribeEvent(key: string) {
    this.mEvents.unsubscribe(key);
  }
  // show loading
  showLoading(duration?: number) {
    this.mLoading = this.mLoadingCtrl.create({
      duration: duration ? duration : 10000,
      spinner: 'dots'
    });
    this.mLoading.present();
  }
  // hide loading
  hideLoad() {
    if (this.mLoading) {
      this.mLoading.dismiss();
    }
  }
  // show toast
  showToast(mes: string, duration?: number) {
    this.mToastCtrl.create({
      message: mes,
      duration: duration ? duration : 3000
    }).present();
  }
  // create alert
  getAlertCtrl(): AlertController {
    return this.mAlertCtrl;
  }
  // save to storage
  saveStorage(key: string, data: any) {
    return this.mStorage.set(key, data);
  }
  // get data from storage
  getDataFromStorage(key: string) {
    return this.mStorage.get(key);
  }
  // show admob
  showAdmob() {
    if (this.mPlatform.is('ios')) {
      this.mAmodController.showAdmobOnIos();
    }
    else if (this.mPlatform.is('android')) {
      this.mAmodController.showAdmobOnAndroid();
    }
  }
}
