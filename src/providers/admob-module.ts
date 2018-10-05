import {AdMobFreeBannerConfig,AdMobFree} from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';
export class AdmobController{
    mAdmob:AdMobFree;
    constructor(){
    }
    public setAdmob(admob){
        this.mAdmob = admob;
    }
    public showAdmobOnIos(){
        this.mAdmob.banner.config(AdmobConfigIos);
        this.mAdmob.banner.prepare().then(()=>{
            console.log('ok banner show')
        },e=>{
            console.log('error admob',e);
        })
    }
    public showAdmobOnAndroid(){
        this.mAdmob.banner.config(AdmobConfigAndroid);
        this.mAdmob.banner.prepare().then(()=>{
            console.log('ok banner show')
        },e=>{
            console.log('error admob',e);
        })
    }
}

export const AdmobConfigIos:AdMobFreeBannerConfig = {
    isTesting:false,
    id:'ca-app-pub-7630879376303461/3848846950',
    autoShow:true
}
export const AdmobConfigAndroid:AdMobFreeBannerConfig={
    isTesting:false,
    id:'ca-app-pub-7630879376303461/7838446167',
    autoShow:true
}