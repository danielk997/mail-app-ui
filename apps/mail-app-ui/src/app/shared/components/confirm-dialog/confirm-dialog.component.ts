import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'mail-app-ui-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  ConfirmDialogType = ConfirmDialogType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
  }

  onClick() {
    this.data.onClick();
  }

  get buttonClassName(): string {
    switch (this.data.type) {
      case ConfirmDialogType.DELETE:
        return 'delete';
      case ConfirmDialogType.INFO:
        return 'info';
    }
  }

  get buttonText(): string {
    switch (this.data.type) {
      case ConfirmDialogType.DELETE:
        return 'Delete';
      case ConfirmDialogType.INFO:
        return 'Confirm';
    }
  }
}

export interface ConfirmDialogData {
  onClick(): void;

  type: ConfirmDialogType;
  message?: string;
}

export enum ConfirmDialogType {
  DELETE,
  INFO
}




