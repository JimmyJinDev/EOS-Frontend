import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormHeaderComponent } from './form-header.component';
import { AdvertiserFormComponent } from '../entity/advertiser/advertiser-form.component';
import { OfferFormComponent } from '../entity/offer/offer-form.component';
import { CommentFormComponent } from '../entity/comment/comment-form.component';
import { AppData } from '../appData.type';
import { AppService } from '../service/app.service';
import { AdvertiserService } from '../entity/advertiser/advertiser.service';
import { OfferService } from '../entity/offer/offer.service';
import { CommentService } from '../entity/comment/comment.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DynamicFormComponent,
    FormHeaderComponent,
    AdvertiserFormComponent,
    OfferFormComponent,
    CommentFormComponent,
  ],
  exports: [AppFormsModule],
  providers: [
    // ** Global Services - Entity
    AdvertiserService,
    OfferService,
    CommentService,
  ]
})
export class AppFormsModule {

}
