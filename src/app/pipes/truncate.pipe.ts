import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, width: number): string {
    let limit = Math.floor(width/10);
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
