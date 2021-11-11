import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytesTo'
})
export class BytesToPipe implements PipeTransform {

  transform(bytes: number): string {
    let medidas = ['B', 'KB', 'MB'];
    let fraccion = bytes;
    for (let index in medidas) {
      if ((fraccion / 1024) < 1) {
        return fraccion?.toFixed(1).toString() + ' ' + medidas[index];
      } else {
        fraccion /= 1024;
      }

    }
    return '';
  }

}
