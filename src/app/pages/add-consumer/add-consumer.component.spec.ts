import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsumerComponent } from './add-consumer.component';

describe('AddConsumerComponent', () => {
  let component: AddConsumerComponent;
  let fixture: ComponentFixture<AddConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConsumerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
