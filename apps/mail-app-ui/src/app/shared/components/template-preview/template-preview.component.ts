import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'mail-app-ui-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss'],
})
export class TemplatePreviewComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TemplatePreviewDialogData,
  ) {
  }
}

export interface TemplatePreviewDialogData {
  html: string;
}
