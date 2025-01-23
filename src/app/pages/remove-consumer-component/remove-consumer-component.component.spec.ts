import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConsumerComponentComponent } from './remove-consumer-component.component';

describe('RemoveConsumerComponentComponent', () => {
  let component: RemoveConsumerComponentComponent;
  let fixture: ComponentFixture<RemoveConsumerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveConsumerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveConsumerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
