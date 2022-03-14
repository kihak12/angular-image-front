import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ImagesListeComponent } from './components/images-liste/images-liste.component';
import { ImageInfoComponent } from './components/image-info/image-info.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImagesListeComponent,
    ImageInfoComponent,
    ImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class ImageModule { }
