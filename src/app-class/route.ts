export class Route {
    bounds:any;
    fare:any;
    duration:Duration;
    distance:Distance;
    legs:Array<any> = [];
    overview_path:Array<any> = [];
    overview_polyline:string;
    warnnings:Array<any>= [];
    waypoint_order:Array<any>=[];
    total_busstop:number = 1;
    constructor(data?:any){
        if(data){
            this.parse(data);
        }
    }
    public parse(data){
        if(data.bounds)this.bounds = data.bounds;
        if(data.fare) this.fare = data.fare;
        if(data.legs) this.legs = data.legs;
        if(data.overview_path) this.overview_path = data.overview_path;
        if(data.overview_polyline) this.overview_polyline = data.overview_polyline;
        if(data.warnnings) this.warnnings = data.warnnings;
        if(data.waypoint_order) this.waypoint_order = data.waypoint_order;
        if(data.total_busstop) this.total_busstop = data.total_busstop;
        if(data.distance) this.distance = data.distance;
        if(data.duration) this.duration = data.duration;
     }
     private calculateDuration(duration:number){
        
     }
}
export interface Duration{
    text:string;
    value:number;
}
export interface Distance {
    text:string;
    value:number;
}
