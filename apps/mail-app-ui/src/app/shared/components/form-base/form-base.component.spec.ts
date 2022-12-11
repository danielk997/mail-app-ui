import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormBaseComponent, FormBaseType} from './form-base.component';
import {FormBuilder} from "@angular/forms";

describe('FormBaseComponent', () => {
  let component: FormBaseComponent;
  let fixture: ComponentFixture<FormBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBaseComponent ],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBaseComponent);
    component = fixture.componentInstance;
    component.options = {
      type: FormBaseType.CREATE,
      name: '',
      formFields: [],
      onSubmit: () => {},
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
