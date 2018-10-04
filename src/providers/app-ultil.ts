import moment from 'moment';
export class AppUltil{

    secondsPerMin = 60;
    secondsPerHour = 60 *60 ;
    secondsPerDay = 24 * 60 *60;
    public  customTime(value:number){
        value = value - (10*this.secondsPerMin);
        let date = moment().startOf('day').seconds(value);
        let hours = date.hour() > 0 ? date.hour()+' Giờ':'';
        let mins = date.minute()>0?date.minute()+' Phút':'';
        return hours+mins;
    }
}