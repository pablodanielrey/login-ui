import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProxyComponent } from './login-proxy.component';

describe('LoginProxyComponent', () => {
  let component: LoginProxyComponent;
  let fixture: ComponentFixture<LoginProxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginProxyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
