import {GoogleMap,LatLng } from '@ionic-native/google-maps';
export interface ResponseLoadMap{
    map:GoogleMap,
    location?:LatLng
}