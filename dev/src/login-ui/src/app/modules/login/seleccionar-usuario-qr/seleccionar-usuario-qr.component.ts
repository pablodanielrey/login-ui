import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  hashes$ : Observable<hash[]>;

  constructor(private service:LoginService) { 
    this.hashes$ = service._get_users_hashes().pipe(
      map(hs => {
        let hss = [];
        Object.keys(hs).forEach(k => {
          hss.push({user:k, hash:hs[k]});
        });
        return hss;
      })
    );
  }

  ngOnInit() {

  }

}
