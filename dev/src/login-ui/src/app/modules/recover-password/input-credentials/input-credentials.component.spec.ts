import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCredentialsComponent } from './input-credentials.component';

describe('InputCredentialsComponent', () => {
  let component: InputCredentialsComponent;
  let fixture: ComponentFixture<InputCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
