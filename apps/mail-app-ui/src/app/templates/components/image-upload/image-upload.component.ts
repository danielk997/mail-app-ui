import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {FileSelectResult, FileSelectReturnType} from '../../../shared/components/file-select/file-select.component';

@Component({
  selector: 'mail-app-ui-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {

  file?: File;
  FileSelectReturnType = FileSelectReturnType;
  keepExisting = true;

  constructor(
    private _store: Store,
    private _matDialog: MatDialog
  ) {
  }

  onFileSelected(fileContent: FileSelectResult) {
    this.file = fileContent as File;
  }

  onClose() {
    if (this.file) {
      this._matDialog.getDialogById('image')?.close();
    }
  }
}


export interface FileImportDialogResult {
  file: File;
}
