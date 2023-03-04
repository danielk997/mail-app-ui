import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversFormComponent } from './receivers-form.component';

describe('ReceiversFormComponent', () => {
  let component: ReceiversFormComponent;
  let fixture: ComponentFixture<ReceiversFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiversFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiversFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
