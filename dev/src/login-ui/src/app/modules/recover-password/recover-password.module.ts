import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RecoverPasswordMaterialModule } from './recover-password-material-module';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';

import { RegisterDeviceComponent } from './components/register-device/register-device.component';
import { InputUsernameComponent } from './components/input-username/input-username.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { InputCredentialsComponent } from './components/input-credentials/input-credentials.component';
import { ErrorComponent } from './components/error/error.component';
import { FinalizeComponent } from './components/finalize/finalize.component';
import { RecoverPasswordService } from './services/recover-password.service';


@NgModule({
  declarations: [
    RegisterDeviceComponent, 
    InputUsernameComponent, 
    VerifyCodeComponent, 
    InputCredentialsComponent, 
    ErrorComponent, 
    FinalizeComponent
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule,
    RecoverPasswordMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    RecoverPasswordRoutingModule
  ]
})
export class RecoverPasswordModule { 

  constructor(@Optional() @SkipSelf() module: RecoverPasswordModule) {
    if (module) {
      throw new Error('Solo debe importarse dentro de AppModule');
    }
  }

  static forRoot(): ModuleWithProviders  {
    return {
      ngModule: RecoverPasswordModule,
      providers: [ 
        RecoverPasswordService
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: RecoverPasswordModule
    }
  }  

}
