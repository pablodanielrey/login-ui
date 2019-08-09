import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalizeComponent } from './finalize/finalize.component';
import { InputUsernameComponent } from './input-username/input-username.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { InputCredentialsComponent } from './input-credentials/input-credentials.component';
import { ErrorComponent } from './error/error.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';

const routes: Routes = [
    {
        path: 'recover',
        children: [
            { path:'register', component: RegisterDeviceComponent },
            { path:'username', component: InputUsernameComponent },
            { path:'email', component: VerifyEmailComponent },
            { path:'code', component: VerifyCodeComponent },
            { path:'credentials', component: InputCredentialsComponent },
            { path:'finalize', component: FinalizeComponent },
            { path:'error', component: ErrorComponent}
        ]
      }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverPasswordRoutingModule { }
