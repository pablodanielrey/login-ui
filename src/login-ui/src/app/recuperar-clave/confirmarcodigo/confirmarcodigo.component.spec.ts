import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarcodigoComponent } from './confirmarcodigo.component';

describe('ConfirmarcodigoComponent', () => {
  let component: ConfirmarcodigoComponent;
  let fixture: ComponentFixture<ConfirmarcodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarcodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarcodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
