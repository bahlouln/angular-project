import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir effectuer cette action ?',
        confirmText: 'Confirmer',
        cancelText: 'Annuler'
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
