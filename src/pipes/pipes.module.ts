import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { TimePipe } from './time/time';
@NgModule({
	declarations: [SearchPipe,
    TimePipe],
	imports: [],
	exports: [SearchPipe,
    TimePipe]
})
export class PipesModule {}
