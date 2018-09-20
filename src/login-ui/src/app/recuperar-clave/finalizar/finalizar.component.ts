import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  finalizar() {
    this.router.navigate(['/']);
  }

}
