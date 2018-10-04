import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { HistoryPage } from '../pages/history/history';
import { LookupPage } from '../pages/lookup/lookup';
import { AppModuleProvider } from '../providers/app-module/app-module';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private mAppModule:AppModuleProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title:'Tra Cứu',component:LookupPage},
      {title:'Tuyến Đã Lưu',component:BookmarkPage},
      {title:'Lịch Sử Tìm Đường',component:HistoryPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.mAppModule.showAdmob();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
