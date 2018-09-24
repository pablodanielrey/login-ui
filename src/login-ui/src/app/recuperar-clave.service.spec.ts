import { TestBed, inject } from '@angular/core/testing';

import { RecuperarClaveService } from './recuperar-clave.service';

describe('RecuperarClaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecuperarClaveService]
    });
  });

  it('should be created', inject([RecuperarClaveService], (service: RecuperarClaveService) => {
    expect(service).toBeTruthy();
  }));
});
