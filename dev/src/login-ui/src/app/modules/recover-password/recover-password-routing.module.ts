import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalizeComponent } from './components/finalize/finalize.component';
import { InputUsernameComponent } from './components/input-username/input-username.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { InputCredentialsComponent } from './components/input-credentials/input-credentials.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterDeviceComponent } from './components/register-device/register-device.component';

const routes: Routes = [
    {
        path: 'recover',
        children: [
            { path: 'start', redirectTo: 'register' },
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
export class RecoverPasswordRoutingModule { 
    
}

