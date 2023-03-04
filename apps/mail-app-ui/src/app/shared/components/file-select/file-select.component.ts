import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Subject} from "rxjs";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {takeUntil} from "rxjs/operators";

export enum FileSelectReturnType {
  CONTENT,
  CONTENT_AND_NAME,
  RAW
}

export interface FileData {
  name: string;
  content: string;
}

export type FileSelectResult = string | FileData | File;

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileSelectComponent),
      multi: true,
    },
  ],
})
export class FileSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @ViewChild('file') fileInput!: ElementRef;
  @Input() returnType: FileSelectReturnType = FileSelectReturnType.CONTENT;
  @Output() fileSelected: EventEmitter<FileSelectResult> = new EventEmitter<FileSelectResult>();
  fileContent$: Subject<FileSelectResult> = new Subject();
  selectedFileName = '';
  inputId = `file_${Date.now()}`;
  private _destroy$ = new Subject();
  private onChange!: (value?: unknown) => void;

  ngOnInit(): void {
    this.setupObservables();
  }

  ngOnDestroy() {
    this._destroy$.complete();
  }

  onFileSelect(event: Event) {
    this.selectedFileName = (event as any).target?.value.replace('C:\\fakepath\\', '');
    const fileInput = this.fileInput.nativeElement;
    const file = (fileInput.files as FileList).item(0) as File;

    if (this.returnType === FileSelectReturnType.RAW) {
      this.fileSelected.emit(file);
      return;
    }

    this.readFile(file);

    this.fileContent$.pipe(takeUntil(this._destroy$)).subscribe(it => {
      this.fileSelected.emit(it);
    });
  }

  private readFile(file: File) {
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = it => {
      const content: string = it.target?.result as string;

      if (this.returnType === FileSelectReturnType.CONTENT)
        return this.fileContent$.next(content);

      this.fileContent$.next({name: file.name, content: content});
    };
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {
    // This is intentional empty method
  }

  writeValue(): void {
    // This is intentional empty method
  }

  private setupObservables() {
    this.fileContent$.pipe(takeUntil(this._destroy$)).subscribe((it) => {
      this.onChange && this.onChange(it);
    });
  }
}
