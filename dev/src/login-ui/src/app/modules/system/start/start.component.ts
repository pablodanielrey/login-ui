import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private auth:AuthService) {
  }

  ngOnInit() {
    /*
      TODO: ACA WALTER BLANCO TENES QUE METER LA PANTALLA DE LAS APLICACIONES
    */
    //window.location.href = "https://www.au24.econo.unlp.edu.ar";
  }

  salir() {
    console.log('saliendo');
    this.auth.logout();
  }

}
