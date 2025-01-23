import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomersComplaintsAdminComponent } from './view-customers-complaints-admin.component';

describe('ViewCustomersComplaintsAdminComponent', () => {
  let component: ViewCustomersComplaintsAdminComponent;
  let fixture: ComponentFixture<ViewCustomersComplaintsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomersComplaintsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomersComplaintsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
