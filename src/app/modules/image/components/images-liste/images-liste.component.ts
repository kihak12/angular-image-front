import { Component, OnInit } from '@angular/core';
import { Image } from '../../interface/image.interface';
import { ImageService } from '../../service/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images-liste',
  templateUrl: './images-liste.component.html',
  styleUrls: ['./images-liste.component.css']
})
export class ImagesListeComponent implements OnInit {

  images: Image[] = [];

  constructor(
    private imageService: ImageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => {
        this.images = images;
      });
  }

  onSelect(imageId: string){
    this.router.navigate(['/image', imageId]);
  }

}
