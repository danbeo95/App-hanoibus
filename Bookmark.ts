export default class Bookmark {
    static bookmark(a: Array<{ lat: number, lng: number }>, b: Array<{ lat: number, lng: number }>): boolean {
        let check = false;
        if (this.compareLoacation(a[0], b[0]) && this.compareLoacation(a[1], b[1])) {
            check = true;
        }
        return check;
    };
    static compareLoacation(a: LatLng, b: LatLng) {
        return ((a.lat == b.lat) && (a.lng == b.lng))
    }
}
export interface LatLng {
    lat: number;
    lng: number;
}
