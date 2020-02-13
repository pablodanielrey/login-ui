import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCredentialsComponent } from './component/new-credentials/new-credentials.component';
import { FinalizeComponent } from './component/finalize/finalize.component';
import { ErrorComponent } from './component/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TemporalCredentialsMaterialModule } from './temporal-credentials-material.module';
import { TemporalCredentialsRoutingModule } from './temporal-credentials-routing.module';



@NgModule({
  declarations: [
    NewCredentialsComponent, 
    FinalizeComponent, 
    ErrorComponent],
  imports: [
    CommonModule,
    TemporalCredentialsMaterialModule,
    TemporalCredentialsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule    
  ],
  exports: [
    TemporalCredentialsRoutingModule
  ]
})
export class TemporalCredentialsModule { 

  constructor(@Optional() @SkipSelf() module: TemporalCredentialsModule) {
    if (module) {
      throw new Error('Solo debe importarse dentro de AppModule');
    }
  }

  static forRoot(): ModuleWithProviders  {
    return {
      ngModule: TemporalCredentialsModule,
      providers: [ 
        //RecoverPasswordService
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: TemporalCredentialsModule
    }
  }  

}
