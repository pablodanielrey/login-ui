import { Component, OnInit, OnDestroy } from '@angular/core';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { Observable } from 'rxjs';

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

  constructor(private hardware: HardwareService) { }

  ngOnInit() {
    this.device_hash$ = this.hardware.get_device_id();
  }

}
