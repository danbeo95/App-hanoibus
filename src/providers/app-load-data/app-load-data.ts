import {HttpClient } from '@angular/common/http';
import { Busstop } from '../../app-class/busstop';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { LatLng } from '@ionic-native/google-maps';
import { Busstation } from '../../app-class/busstation';
export class LoaddataController{
    mHttp:HttpClient;
    itemsPerLoad:number = 10;
    constructor(){
    }
    // set http
    setHttp(http:HttpClient){
        this.mHttp = http;
    }
    // get data bus stop from json
    getDataBusstop():Observable<Array<Busstop>>{
        return Observable.create((observer:Observer<any>)=>{
            this.mHttp.get('../assets/data/busstop.json').subscribe((data)=>{
                let arrayBustops:Array<Busstop> = this.fillterBusstop(data);
                observer.next(arrayBustops); 
                observer.complete();
            },e=>{
                observer.next([]);
                observer.complete();
            })
        })
    }
    // getDataBusstation
    getDataBusstation():Observable<Array<Busstation>>{
        return Observable.create((observer:Observer<any>)=>{
            let arrayStations:Array<Busstation>=[];
            this.mHttp.get('../assets/data/busstop.json').subscribe((data:any)=>{
                let arrayBusstaions:Array<Busstation> = [];
                data.forEach((item)=>{
                    arrayBusstaions.push(new Busstation(item));
                })
                observer.next(arrayBusstaions); 
                observer.complete();
            },e=>{
                observer.next([]);
                observer.complete();
            })
        })
    }
    // filter busstop
    private fillterBusstop(data):Array<Busstop>{
        let arrayBustops:Array<Busstop> = [];
        data.forEach(item => {
            let code:string = item['Code'];
            let stations:Array<any> = item['Go']['Station'];
            stations.forEach((station)=>{
                arrayBustops.push(new Busstop({
                    code:code,
                    name:station['Name'],
                    latlng:new LatLng(station['Geo']['Lat'],station['Geo']['Lng'])
                }))
            })
        }); 
        return arrayBustops;
    }
    
}