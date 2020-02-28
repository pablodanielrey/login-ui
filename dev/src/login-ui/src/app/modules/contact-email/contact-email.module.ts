import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './component/email/email.component';
import { CheckCodeComponent } from './component/check-code/check-code.component';
import { FinalizeComponent } from './component/finalize/finalize.component';
import { ErrorComponent } from './component/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactEmailMaterialModule } from './contact-email-material.module';
import { ContactEmailRoutingModule } from './contact-email-routing.module';
import { AnalizeComponent } from './component/analize/analize.component';


@NgModule({
  declarations: [
    EmailComponent, 
    CheckCodeComponent, 
    FinalizeComponent, 
    ErrorComponent, AnalizeComponent
  ],
  imports: [
    CommonModule,
    ContactEmailMaterialModule,
    ContactEmailRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ContactEmailRoutingModule
  ]
})
export class ContactEmailModule { 

  constructor(@Optional() @SkipSelf() module: ContactEmailModule) {
    if (module) {
      throw new Error('Solo debe importarse dentro de AppModule');
    }
  }

  static forRoot(): ModuleWithProviders  {
    return {
      ngModule: ContactEmailModule,
      providers: [ 
        //RecoverPasswordService
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: ContactEmailModule
    }
  }  

}
