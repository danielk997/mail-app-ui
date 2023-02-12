import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ConfirmDialogComponent, ConfirmDialogType} from './confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ConfirmDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.data.type = ConfirmDialogType.INFO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture.nativeElement.innerHTML).toMatchSnapshot();
  });

  it('should display correct delete dialog', () => {
    const item = 'Item'
    component.data.type = ConfirmDialogType.DELETE;
    component.data.message = item;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('p')?.innerHTML).toMatch(`Are you sure you want to delete this ${item}?`);
    expect(element.querySelector('button')?.innerHTML).toMatch(`Delete`);
  });

  it('should display correct info dialog', () => {
    const item = 'Item'
    component.data.type = ConfirmDialogType.INFO;
    component.data.message = item;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('p')?.innerHTML).toMatch(`${item}`);
    expect(element.querySelector('button')?.innerHTML).toMatch(`Confirm`);
  });
});
