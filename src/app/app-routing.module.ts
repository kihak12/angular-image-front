import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageInfoComponent } from './modules/image/components/image-info/image-info.component';
import { ImageUploadComponent } from './modules/image/components/image-upload/image-upload.component';
import { ImagesListeComponent } from './modules/image/components/images-liste/images-liste.component';

const routes: Routes = [
  { path: 'images', component: ImagesListeComponent },
  { path: 'upload', component: ImageUploadComponent },
  { path: 'image/:id', component: ImageInfoComponent },
  { path: '', redirectTo: '/images', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
