import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresardniComponent } from './ingresardni.component';

describe('IngresardniComponent', () => {
  let component: IngresardniComponent;
  let fixture: ComponentFixture<IngresardniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresardniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresardniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
