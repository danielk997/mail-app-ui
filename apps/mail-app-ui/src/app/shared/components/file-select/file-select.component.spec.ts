import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectComponent } from './file-select.component';
import { Store, StoreModule } from '@ngrx/store';

describe('FileSelectComponent', () => {
  let component: FileSelectComponent;
  let fixture: ComponentFixture<FileSelectComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ FileSelectComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSelectComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
