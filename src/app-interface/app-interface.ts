import { LatLng } from '@ionic-native/google-maps';
import { Locations } from '../app-class/locations';
import { Busstation } from '../app-class/busstation';

export interface ParamsFromHomePage{
    type:string
}
export interface ParamsFromOtherToHomePage{
    latlng:LatLng,
    location:string,
    type:string
}
export interface ResponseDirectionRoute {
    geocoded_waypoints:Array<any>,
    routes:Array<any>,
    status:string,
    request:any;

}
export interface ParamsToResultMap{
    route:any;
    routes:any;
    locations:any;
}
export interface ParamsToResult{
    locations:Array<Locations>;
}
export interface ParamsToLookUp{
    busstation:Busstation
}
export interface Route {
    
}