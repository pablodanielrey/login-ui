import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresardni',
  templateUrl: './ingresardni.component.html',
  styleUrls: ['./ingresardni.component.css']
})
export class IngresardniComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  chequear_dni() {
    this.router.navigate(['/recuperar_clave/confirmar_codigo']);
  }

}
