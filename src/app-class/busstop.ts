import  { LatLng } from '@ionic-native/google-maps';
export class Busstop{
    latlng:LatLng;
    code:string='';
    name:string='';
    constructor(data?:any){
        if(data){
            this.parse(data);
        }
    }
    parse(data){
        if(data.latlng) this.latlng = data.latlng;
        if(data.name) this.name = data.name;
        if(data.code) this.code = data.code;
    }
}