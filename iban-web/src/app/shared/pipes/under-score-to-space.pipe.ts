import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underScoreToSpace'
})
export class UnderScoreToSpacePipe implements PipeTransform {

  // reemplaza los caracteres '_' por espacio ' '
  transform(value: string): string {
    return value ? value.replace(/_/g, ' ') : value;
  }

}
