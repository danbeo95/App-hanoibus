import { MarkerOptions } from '@ionic-native/google-maps';
export class AppConfig{
    public static GoogleMapOptions = {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': false,
          'indoorPicker': true,
          'myLocation':true,
          'zoom': false
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'tilt': 30,
          'zoom': 15,
          'bearing': 50,
        },
    }
    public static fakePosition = {
      start:{
        lat:35.747,
        lng:105.85214840000003
      },
      end:{
        lat:21.0286669,
        lng:7.734
      }
    }
    public static urlIconStart:string = 'assets/imgs/icon_departure.png';
    public static urlIconEnd:string = 'assets/imgs/icon_arrival.png';
}