import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codUsuario'
})
export class CodUsuarioPipe implements PipeTransform {

  // JCABELLO o jcabello => JCabello
  transform(value: string): string {
    if (value && value.length > 2) {
      return value.substr(0, 2).toUpperCase() + value.substr(2).toLowerCase();
    }
    return value;
  }

}
