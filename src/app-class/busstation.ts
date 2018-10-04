import  { LatLng } from '@ionic-native/google-maps';
import { Output } from '@angular/core';
export class Busstation{
    latlng:LatLng;
    code:string='';
    name:string='';
    re:any;
    go:any;
    constructor(data?:any){
        if(data){
            this.parse(data);
        }
    }
    parse(data){
        if(data.latlng) this.latlng = data.latlng;
        if(data.Name) this.name = data.Name;
        if(data.Code) this.code = data.Code;
        if(data.Re) this.re = data.Re;
        if(data.Go) this.go = data.Go;
    }
    pareGoLatLng(data){
        let output:Array<LatLng> = [];
        if(data){
            data.forEach((item)=>{
                output.push(new LatLng(item['Geo']['Lat'],item['Geo']['Lat']));
            })
        }
        return output;
    }
    pareReLatLng(data){
        let output:Array<LatLng> = [];
        if(data){
            data.forEach((item)=>{
                output.push(new LatLng(item['Re']['Lat'],item['Re']['Lat']));
            })
        }
        return output;
    }
}