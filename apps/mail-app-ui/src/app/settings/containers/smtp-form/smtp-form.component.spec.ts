import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpFormComponent } from './smtp-form.component';

describe('SmtpFormComponent', () => {
  let component: SmtpFormComponent;
  let fixture: ComponentFixture<SmtpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmtpFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmtpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
