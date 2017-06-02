import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSidebarComponent } from './app-sidebar.component';

import { AppSidebarFormService } from './app-sidebar-form.service';
import { AppFormsModule } from '../../form/app-forms.module';

@NgModule({
  imports: [
    CommonModule,
    AppFormsModule,
  ],
  declarations: [AppSidebarComponent],
  exports: [AppSidebarComponent],
  providers: [AppSidebarFormService]
})
export class AppSidebarModule {

}
