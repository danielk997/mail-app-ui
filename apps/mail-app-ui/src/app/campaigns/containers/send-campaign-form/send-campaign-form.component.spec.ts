import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCampaignFormComponent } from './send-campaign-form.component';

describe('SendCampaignFormComponent', () => {
  let component: SendCampaignFormComponent;
  let fixture: ComponentFixture<SendCampaignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendCampaignFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SendCampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
