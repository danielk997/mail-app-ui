import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSentComponent } from './campaigns-sent.component';

describe('CampaignsSentComponent', () => {
  let component: CampaignsSentComponent;
  let fixture: ComponentFixture<CampaignsSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignsSentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
