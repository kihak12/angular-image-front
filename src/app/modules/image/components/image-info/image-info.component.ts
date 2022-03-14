import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../service/image.service';
import { Image } from '../../interface/image.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.css']
})
export class ImageInfoComponent implements OnInit {
  image: Image | undefined;
  ratioImg = 1;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  imageForm = this.formBuilder.group({
    titre: "",
    height: "",
    width: "",
    ratio: false,
  });

  ngOnInit(): void {
    this.getImage();
  }



  sendForm(imageId: string) {
    console.log(this.imageForm.value);
    Swal.fire({
      title: "Creation en cours...",
      allowOutsideClick: false,
      showConfirmButton: true,/////Set False
    })
    Swal.showLoading()
    this.imageService.resizeImage(imageId, this.imageForm.value)
      .subscribe(
        response =>
          Swal.fire(
            'Created!',
            'Your image has been resized.',
            'success',
          ).finally(() =>
            this.router.navigate([`image/${response.id}`]).then(() => {
              window.location.reload();
            })),
        error => {
          Swal.fire(
            'Failed!',
            'An error has occurred.',
            'error',
          )
        });

  }

  getImage(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.imageService.getImage(id)
      .subscribe(image => {
        this.image = image,
          this.imageForm.patchValue({
            titre: image.titre,
            height: image.height,
            width: image.width,
          });
        this.ratioImg = image.width / image.height;
      })
  }

  adaptRatio(type: string) {
    if (this.imageForm.value.ratio == true) {
      if (type == "height") {
        this.imageForm.patchValue({
          width: Math.round(this.imageForm.value.height * this.ratioImg),
        });
      } else {
        this.imageForm.patchValue({
          height: Math.round(this.imageForm.value.width / this.ratioImg),
        });
      }
    }
  }

  deleteImage(imageId: string) {
    Swal.fire({
      title: "Suppression en cours...",
      allowOutsideClick: false,
      showConfirmButton: false,
    })
    Swal.showLoading()
    this.imageService.deleteImage(imageId).subscribe(_ =>
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      ).finally(() =>
        this.router.navigate(['/images'])));
  }

  confirmDelete(imageId: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteImage(imageId);
      }
    })
  }

}
