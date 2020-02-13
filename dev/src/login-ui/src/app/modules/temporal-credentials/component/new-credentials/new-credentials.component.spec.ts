import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCredentialsComponent } from './new-credentials.component';

describe('NewCredentialsComponent', () => {
  let component: NewCredentialsComponent;
  let fixture: ComponentFixture<NewCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
