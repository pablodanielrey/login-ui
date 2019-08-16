import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { 
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  


} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule
  ]
})
export class LoginMaterialModule { }
