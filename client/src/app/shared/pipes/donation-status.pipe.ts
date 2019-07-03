import { Pipe, PipeTransform } from '@angular/core';

import { DonationStatus } from '@models/donation';

@Pipe({
  name: 'donationStatus'
})
export class DonationStatusPipe implements PipeTransform {

  transform(value: DonationStatus, isAction?: boolean): any {
    switch (value) {
      case DonationStatus.CANCELED:
        return isAction ? 'Cancelar' : 'Cancelada';
      case DonationStatus.EXPIRED:
        return isAction ? 'Invalidar' : 'Expirada';
      case DonationStatus.PENDING:
        return isAction ? 'Tornar pendente' : 'Pendente';
      case DonationStatus.DONATED:
        return isAction ? 'Confirmar' : 'Confirmada';
      case DonationStatus.SENT:
        return isAction ? 'Enviar' : 'Enviada';
      case DonationStatus.RECEIVED:
        return isAction ? 'Receber' : 'Recebida';
    }
  }

}
