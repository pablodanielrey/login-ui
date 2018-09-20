import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmarcodigo',
  templateUrl: './confirmarcodigo.component.html',
  styleUrls: ['./confirmarcodigo.component.css']
})
export class ConfirmarcodigoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  confirmar() {
    this.router.navigate(['/recuperar_clave/finalizar']);
  }

}
