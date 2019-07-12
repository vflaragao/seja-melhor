import { Pipe, PipeTransform } from '@angular/core';

import { Role } from '@models/fields/collaborator';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: Role): any {
    switch (value) {
      case Role.MANAGER:
        return 'Administrador';
      case Role.SECRETARY:
        return 'Secretária(o)';
      default:
        return 'Não definido';
    }
  }
}
