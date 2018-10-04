import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SearchLocationPageModule} from '../pages/search-location/search-location.module';
import { SearchLocationBusstopPageModule } from '../pages/search-location-busstop/search-location-busstop.module';
import { SearchLocationGooglePageModule} from '../pages/search-location-google/search-location-google.module';
import { SearchLocationMapPageModule} from '../pages/search-location-map/search-location-map.module';
import { ReslutFindRoadPageModule } from '../pages/reslut-find-road/reslut-find-road.module';
import {ResultFindroadMapPageModule  } from '../pages/result-findroad-map/result-findroad-map.module';
import { BookmarkPageModule } from '../pages/bookmark/bookmark.module';
import { HistoryPageModule } from '../pages/history/history.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppModuleProvider } from '../providers/app-module/app-module';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import {IonicStorageModule } from '@ionic/storage';
import {LookupPageModule } from '../pages/lookup/lookup.module';
import { LookupMapPageModule } from '../pages/lookup-map/lookup-map.module';
import { AdMobFree } from '@ionic-native/admob-free';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      pageTransition: 'ios-transition'
    }),
    SearchLocationPageModule,
    SearchLocationBusstopPageModule,
    SearchLocationGooglePageModule,
    SearchLocationMapPageModule,
    ReslutFindRoadPageModule,
    ResultFindroadMapPageModule,
    HttpClientModule,
    BookmarkPageModule,
    HistoryPageModule,
    LookupPageModule,
    LookupMapPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppModuleProvider,
  ]
})
export class AppModule {}
