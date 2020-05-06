import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgoiSubscribeComponent } from './egoi-subscribe.component';

describe('EgoiSubscribeComponent', () => {
  let component: EgoiSubscribeComponent;
  let fixture: ComponentFixture<EgoiSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgoiSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgoiSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
