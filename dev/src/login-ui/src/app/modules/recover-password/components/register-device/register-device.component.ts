import { Component, OnInit, OnDestroy } from '@angular/core';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { Observable, timer } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.scss']
})
export class RegisterDeviceComponent implements OnInit, OnDestroy {
  
  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  device_hash$: Observable<string>;

  constructor(private hardware: HardwareService, private router:Router) { }

  ngOnInit() {
    this.device_hash$ = this.hardware.get_device_id();
    this.subs.push(timer(2000).pipe(map(l => this.device_hash$)).subscribe(did => { 
      console.log(did);
      this.router.navigate(['/recover/username']);
    }));
  }

}
