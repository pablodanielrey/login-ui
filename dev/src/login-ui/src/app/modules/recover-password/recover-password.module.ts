import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RegisterDeviceComponent } from './register-device/register-device.component';
import { InputUsernameComponent } from './input-username/input-username.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { InputCredentialsComponent } from './input-credentials/input-credentials.component';
import { ErrorComponent } from './error/error.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FinalizeComponent } from './finalize/finalize.component';



@NgModule({
  declarations: [
    RegisterDeviceComponent, 
    InputUsernameComponent, 
    VerifyCodeComponent, 
    InputCredentialsComponent, 
    ErrorComponent, 
    VerifyEmailComponent, 
    FinalizeComponent
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule
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
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: RecoverPasswordModule
    }
  }  

}
