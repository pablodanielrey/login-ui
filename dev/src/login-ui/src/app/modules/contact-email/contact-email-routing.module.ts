import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './component/error/error.component';
import { EmailComponent } from './component/email/email.component';
import { CheckCodeComponent } from './component/check-code/check-code.component';
import { FinalizeComponent } from './component/finalize/finalize.component';
import { AnalizeComponent } from './component/analize/analize.component';


const routes: Routes = [
    {
        path: 'email',
        children: [
            { path: 'start', redirectTo: 'analize' },
            { path: 'analize/:challenge', component: AnalizeComponent },
            { path: 'email/:challenge', component: EmailComponent },
            { path: 'verify_code/:hash', component: CheckCodeComponent },
            { path: 'error', component: ErrorComponent },
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

