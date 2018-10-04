import {LatLng} from '@ionic-native/google-maps';
export class Locations {
    location:string='';
    latlng:LatLng;
    type:string='';
    markerOptions:any={
        position:{lat:0,lng:0},
        icon:{
            size:{
                width:25,
                height:30
            }
        }
    };
    constructor(data?:any){
        if(data){
        this.parse(data);
        }
    }
    parse(data){
        if(data.location)this.location = data.location;
        if(data.latlng) this.latlng = data.latlng;
        if(data.type) this.type = data.type;
        if(data.markerOptions) this.markerOptions = data.markerOptions;
    }
    public setLalng(latlng){
        this.latlng = latlng;
    }
    public setMarkerOption(markerOption){
        this.markerOptions = markerOption;
    }
    public setPositionMarker(position){
        this.markerOptions.position = position;
        this.latlng = position;
    }
    public setIconMarker(url:string){
        this.markerOptions.icon.url = url;
    }
    public setLocation(location:string){
        this.location = location;
    }
    public compareLocation(input:Locations){
        return (this.latlng.lat==input.latlng.lat&&this.latlng.lng==input.latlng.lng);
    }
}