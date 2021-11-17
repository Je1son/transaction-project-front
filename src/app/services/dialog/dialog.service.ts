import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/dialogs/confirm/confirm.component';
import { confirmDialogData } from 'src/app/model/confirm-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: confirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmComponent, {
      data,
      width: '400px',
      disableClose: true
    }).afterClosed();
  }
}
