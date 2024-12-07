import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComplaintHistoryComponent } from './view-complaint-history.component';

describe('ViewComplaintHistoryComponent', () => {
  let component: ViewComplaintHistoryComponent;
  let fixture: ComponentFixture<ViewComplaintHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewComplaintHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewComplaintHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
