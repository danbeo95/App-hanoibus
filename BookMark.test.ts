import Bookmark from '../src/Bookmark';
describe('bookmark', function() {
  it('checkbookmark', function() {
    let a:Array<LatLng> = [{lat:1,lng:2},{lat:3,lng:4}];
    let b:Array<LatLng> = [{lat:1,lng:2},{lat:3,lng:4}];
    let result = Bookmark.bookmark(a,b);
    expect(result).toBe(true);   
  });
  it('checkbookmark', function() {
    let a:Array<LatLng> = [{lat:1,lng:2},{lat:1,lng:4}];
    let b:Array<LatLng> = [{lat:1,lng:2},{lat:3,lng:4}];
    let result = Bookmark.bookmark(a,b);
    expect(result).toBe(true);   
  });
});
export interface LatLng {
    lat: number;
    lng: number;
}