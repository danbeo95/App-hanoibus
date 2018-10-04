export class Instructions {
    icon:string;
    instruction:any;
    duration:string='';
    distance:any;
    constructor(data?:any){
        this.parse(data);
    }
    parse(data){
        if(data.icon)this.icon = InstructionsIconUrl[(data.icon).toLowerCase()];
        if(data.instruction) this.instruction = data.instruction;
        if(data.duration) this.duration = data.duration;
        if(data.distance) this.distance = data.distance;
    }
}
export const InstructionsIconUrl = {
    start:'assets/imgs/icon_departure.png',
    end:'assets/imgs/icon_arrival.png',
    walking:'assets/imgs/icon_walk_small.png',
    transit:'assets/imgs/icon_bus_small.png',
    arrivalstop:'assets/imgs/icon_busstop_small.png'
}