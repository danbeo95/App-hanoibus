import { Locations } from './locations';
export class History{
    date:Date = new Date();
    locations:Array<Locations>;
    constructor(data?:any){
        if(data){
            this.parse(data);
        }
    }
    parse(data){
        if(data.locations) this.locations =data.locations;
    }
    public setLocations(locations:Array<Locations>):void{
        this.locations = locations;
    }
}