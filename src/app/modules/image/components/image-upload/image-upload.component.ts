import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Image } from '../../interface/image.interface';
import { UploadService } from '../../service/upload.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router,
  ) { }

  url: string | undefined;
  image: File | undefined;
  WH: any;
  imgFile: string = "";
  FileImage: Image = { id: "0", titre: "", url: "", creationDate: "0", size: 0, height: 0, width: 0, format: "" };


  imageFormFile = this.formBuilder.group({
    titre: new FormControl(null, Validators.required),
    image: new FormControl(null, [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  getImageDimensions(file: any) {
    return new Promise(function (resolved, rejected) {
      var i = new Image()
      i.onload = function () {
        resolved({ w: i.width, h: i.height })
      };
      i.src = file
    })
  }

  testFile($event: any) {
    const reader = new FileReader();
    const e = $event.target.files[0];
    if (e != null) {
      if (this.uploadService.testFile($event)) {
        if ($event.target.files && $event.target.files.length) {
          const [file] = $event.target.files;

          console.log(file);

          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageFormFile.patchValue({
              imgSrc: reader.result
            });

            var dimensions = this.getImageDimensions(reader.result)
            dimensions.then(f => this.WH = f).finally(() => {
              this.FileImage.height = this.WH.h;
              this.FileImage.width = this.WH.w;
            });

            this.imgFile = reader.result as string;

            this.FileImage.url = (reader.result as string).split(',')[1];
            this.FileImage.size = e.size;
            this.FileImage.format = e.type.split('/')[1];
          };


        }
      } else {
        this.imageFormFile.patchValue({
          image: '',
        });
        Swal.fire(
          'Format non accepté',
          'Format prit en charge:<br> .png .jpg .jpeg',
          'error'
        );
        this.image = undefined;
      }
    } else {
      this.image = undefined;
    }
  }

  submitData() {
    console.log(this.FileImage)
    console.log(this.imageFormFile.value.titre)
    if (this.FileImage.size != 0 && this.imageFormFile.value.titre != null) {
      this.FileImage.titre = this.imageFormFile.value.titre;
      Swal.fire({
        title: "Upload en cours...",
        allowOutsideClick: false,
        showConfirmButton: false
      })
      Swal.showLoading()
      this.uploadService.uploadFile(this.FileImage).subscribe(
        response =>
          Swal.fire(
            'Created!',
            'Your image has been uploaded.',
            'success',
          ).finally(() =>
            this.router.navigate([`image/${response.id}`])),
        error => {
          Swal.fire(
            'Failed!',
            'An error has occurred.',
            'error',
          )
        });

    }
  }
}
