import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDniComponent } from './error-dni.component';

describe('ErrorDniComponent', () => {
  let component: ErrorDniComponent;
  let fixture: ComponentFixture<ErrorDniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
