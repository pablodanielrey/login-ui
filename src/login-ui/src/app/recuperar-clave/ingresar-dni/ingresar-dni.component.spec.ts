import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarDniComponent } from './ingresar-dni.component';

describe('IngresarDniComponent', () => {
  let component: IngresarDniComponent;
  let fixture: ComponentFixture<IngresarDniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarDniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
