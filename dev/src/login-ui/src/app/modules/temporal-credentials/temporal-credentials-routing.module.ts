import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCredentialsComponent } from './component/new-credentials/new-credentials.component';
import { ErrorComponent } from './component/error/error.component';
import { FinalizeComponent } from './component/finalize/finalize.component';

const routes: Routes = [
    {
        path: 'credentials',
        children: [
            { path: 'start', redirectTo: 'new' },
            { path:'new', component: NewCredentialsComponent },
            { path:'finalize', component: FinalizeComponent},
            { path:'error', component: ErrorComponent}
        ]
    }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemporalCredentialsRoutingModule { 
    
}

