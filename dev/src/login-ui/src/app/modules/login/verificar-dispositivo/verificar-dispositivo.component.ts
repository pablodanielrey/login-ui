import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-verificar-dispositivo',
  templateUrl: './verificar-dispositivo.component.html',
  styleUrls: ['./verificar-dispositivo.component.scss']
})
export class VerificarDispositivoComponent implements OnInit {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mensaje : string = '';

  constructor(private service:LoginService, 
              private router:Router, 
              private route:ActivatedRoute) { 
  }
  
  ngOnInit() {
    this.mensaje = 'verificando dispositivo';
    this.subs.push(
      this.service.get_login_challenge(this.route).subscribe(c => {
        if (c['skip']) {
          // se acepta implícitamente el challenge así que ya redirecciono
          this.router.navigate(['/login/bienvenido']);
        } else {
          let challenge = c['challenge'];
          this.router.navigate([`/login/login/${challenge}`]);
        }
      })
    )
  }

}
