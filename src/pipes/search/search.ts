import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(arrayInput:Array<any>,value:string) {
      let arrayOutput:Array<any>;
      if(value==='') return arrayInput;
      arrayOutput = arrayInput.filter((item)=>{
        return item['name'].indexOf(value)!==-1;
      });
      return arrayOutput;
  }
}
