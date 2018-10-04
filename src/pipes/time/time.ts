import { Pipe, PipeTransform } from '@angular/core';
import { AppUltil } from '../../providers/app-ultil';
/**
 * Generated class for the TimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number) {
    return new AppUltil().customTime(value);
  }
}
