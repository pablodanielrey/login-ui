import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './component/error/error.component';
import { EmailComponent } from './component/email/email.component';
import { CheckCodeComponent } from './component/check-code/check-code.component';
import { FinalizeComponent } from './component/finalize/finalize.component';


const routes: Routes = [
    {
        path: 'email',
        children: [
            { path: 'start', redirectTo: 'email' },
            { path: 'error', component: ErrorComponent },
            { path: 'email', component: EmailComponent },
            { path: 'verify_code/:hash', component: CheckCodeComponent },
            { path: 'finalize', component: FinalizeComponent }
        ]
    }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactEmailRoutingModule { 
    
}

