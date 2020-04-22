import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDrawerComponent } from './filter-drawer.component';

describe('FilterDrawerComponent', () => {
  let component: FilterDrawerComponent;
  let fixture: ComponentFixture<FilterDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
