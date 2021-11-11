import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {

  transform(value: string | null | undefined): string  {
    if (value == null) {
      return '';
    } else if (value.toUpperCase() == 'SOLES') {
      return 'S/';
    } else if (value.toUpperCase() == 'DOLARES') {
      return '$';
    } else {
      return value;
    }
  }

}
