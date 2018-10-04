import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/Observer';
import { AppConfig } from '../../app-config';
import { ResponseLoadMap } from '../../app-interface/google-map';
import { ResponseDirectionRoute } from '../../app-interface/app-interface';
import { Route } from '../../app-class/route';
import { Locations } from '../../app-class/locations';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  LocationService,
  MyLocation,
  GoogleMapsMapTypeId,
  ILatLng,
  Geocoder,
  GeocoderResult,
  LatLngBounds,
  PolygonOptions,
  PolylineOptions,
  TileOverlayOptions
} from '@ionic-native/google-maps';
import { APP_KEY } from '../../app-key';
declare var google: any;
var mDirectionsService = new google.maps.DirectionsService;
export class GoogleMapController {
  mMap: GoogleMap;
  mMarkers: Array<Marker> = [];
  constructor() {
  }
  public loadMap(mapElement?: ElementRef): Observable<ResponseLoadMap> {
    return Observable.create((observer: Observer<ResponseLoadMap>) => {
      let map: GoogleMap;
      // let location = new LatLng(20.9909253, 105.7947234);

      map = GoogleMaps.create(mapElement.nativeElement, AppConfig.GoogleMapOptions);
      map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        map.getMyLocation({ enableHighAccuracy: true }).then((myLocation: MyLocation) => {
          let cameraPosition: CameraPosition<ILatLng> = {
            target: myLocation.latLng,
            duration: 2000,
            zoom: 18,
            padding: 50
          }
          map.animateCamera(cameraPosition).then(() => {
            let responseLoadMap: ResponseLoadMap = {
              map: map,
              location: myLocation.latLng
            };
            observer.next(responseLoadMap);
            observer.complete();
          });
        })
      });
    })
  }
  // get mylocation
  getMylocation() {
    return LocationService.getMyLocation();
  }
  // move to my location
  moveMyLocation(map: GoogleMap) {
    map.getMyLocation().then((myLocation: MyLocation) => {
      map.animateCamera({
        target: myLocation.latLng,
        duration: 1000
      })
    })
  }
  //  geocode
  geocode(position: LatLng): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      Geocoder.geocode({
        position: position
      }).then((res: GeocoderResult[]) => {
        if (res.length == 0) {
          observer.next('');
          observer.complete();
        }
        else {
          let address: any = [
            res[0].subThoroughfare == null ? "" : res[0].subThoroughfare,
            res[0].thoroughfare == null ? '' : res[0].thoroughfare,
            res[0].locality == null ? '' : res[0].locality,
            res[0].adminArea == null ? "" : res[0].adminArea,
            // res[0].postalCode==null?'':res[0].postalCode,
            res[0].country == null ? '' : res[0].country].join(" ");
          observer.next(address);
          observer.complete();
        }
      })
    })
  }
  // add marker
  addMarker(map: GoogleMap, markerOption: Array<MarkerOptions>) {
    markerOption.forEach((item) => {
      map.addMarker(item).then((marker) => {
        this.mMarkers.push(marker);
      });
    })
  }
  // move camera with marker
  moveCamera(map: GoogleMap, markers: Array<MarkerOptions>) {
    let latLngs: ILatLng[] = [];
    map.clear();
    markers.forEach((markerOption) => {
      latLngs.push(markerOption.position);
      map.addMarker(markerOption).then((marker) => {
        this.mMarkers.push(marker);
      })
    });
    let bounds = new LatLngBounds(latLngs);
    let cameraPosition: CameraPosition<any> = {
      target: bounds,
    }
    return map.moveCamera(cameraPosition);
  }
  // reset markers
  private resetMarkers() {
    this.mMarkers.forEach((marker) => {
      if (marker) {
        marker.remove();
      }
    });
    this.mMarkers = [];
  }
  // Directions
  directionsRoute(locations: Array<Locations>): Observable<Array<Route>> {
    let originLatlng = locations[0].latlng;
    let destinationLatlng = locations[1].latlng;
    let fake = {
      start: {
        lat: 20.9909443,
        lng: 105.7946596
      },
      end: {
        lat: 20.955835,
        lng: 105.75636580000003
      }
    }
    let directionRequests = {
      origin: fake.start,
      destination: fake.end,
      travelMode: 'TRANSIT',
      provideRouteAlternatives: true,
      transitOptions: {
        modes: ['BUS']
      }
    }
    return Observable.create((observer: Observer<Array<Route>>) => {
      mDirectionsService.route(directionRequests, (response, status) => {
        if (status == 'OK') {
          let resRoutes: Array<Route> = [];
          response['routes'].forEach((item) => {
            let route: Route = new Route(item);
            route = this.processRoute(route);
            resRoutes.push(route);
          });
          observer.next(resRoutes);
          observer.complete();
          console.log(response);
        }
        else {
          console.log(response);
        }
      })
    })
  }
  // add polyline
  addPolyline(map: GoogleMap, overviewPath: Array<any>) {
    let points: ILatLng[] = [];
    overviewPath.forEach((item) => {
      let lat = item.Lat || item.lat();
      let lng = item.Lng || item.lng();
      points.push(new LatLng(lat, lng));
    })
    let polylineOptions: PolylineOptions = {
      points: points,
      color: '#AA00FF',
      width: 3,
      geodesic: true,
      clickable: true
    }
    return map.addPolyline(polylineOptions);
  }
  // process route
  private processRoute(route: Route): Route {
    let steps: Array<any> = route.legs[0]['steps'];
    let legs = route.legs[0];
    let total_busstop: number = 0;
    route.distance = legs.distance;
    route.duration = legs.duration;
    steps.forEach((item) => {
      if (item['travel_mode'] == APP_KEY.TRAVEL_MODE_TRANSIT) {
        total_busstop = total_busstop + 1;
        item['name_busstop'] = this.insertNameBus(item);
      }
    });
    route.total_busstop = total_busstop;
    return route;
  }
  // animate camera
  animateCamera(map: GoogleMap, position: LatLng) {
    let cameraPosition: CameraPosition<any> = {
      target: position,
      duration: 15,
      zoom: 20
    }
    return map.animateCamera(cameraPosition);
  }

  // insert name of bus for route
  insertNameBus(step): string {
    let name: string = step['transit']['line']['name'].trim();
    let endIndex: number = name.indexOf('-');
    name = name.slice(5, endIndex).trim();
    return name;
  }
  // sort route
  sortRoute(routes: Array<Route>, key: string): Array<Route> {
    return routes.sort((a, b) => {
      return (a[key]['value'] - b[key]['value']);
    })
  }
  // set div to map
  public setDivToMap(mapElement: ElementRef) {
    this.mMap.setDiv(mapElement.nativeElement);
  }
  // get map
  public getMap() {
    return this.mMap;
  }
}