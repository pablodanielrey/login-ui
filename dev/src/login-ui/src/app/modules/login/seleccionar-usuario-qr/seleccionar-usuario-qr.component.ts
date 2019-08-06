import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

interface hash {
  user: string,
  hash: string
}

@Component({
  selector: 'app-seleccionar-usuario-qr',
  templateUrl: './seleccionar-usuario-qr.component.html',
  styleUrls: ['./seleccionar-usuario-qr.component.scss']
})
export class SeleccionarUsuarioQrComponent implements OnInit {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }


  hashes$ : Observable<hash[]>;
  code$: Observable<string>;

  constructor(private service:LoginService, 
              private router: Router, 
              private route: ActivatedRoute) { 

  
    this.hashes$ = of(service._get_users_hashes());
    this.code$ = this.route.paramMap.pipe(map(params => params.get('code')));
  }

  seleccionar(e) {
    this.subs.push(
      this.code$.subscribe(code => {
        this.router.navigate([`/login/qrcode/activar/${e.user}/${code}`]);
      })
    );
    
  }

  ngOnInit() {

  }

}
