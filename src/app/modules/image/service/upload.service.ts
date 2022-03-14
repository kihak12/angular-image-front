import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Image } from '../interface/image.interface';


@Injectable({
    providedIn: 'root',
})
export class UploadService {

    constructor(private http: HttpClient) { }

    testFile(fileEvent: any): Boolean {
        const file = fileEvent.target.files[0];
        if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") {
            return true;
        } else {
            return false;
        }
    }

    uploadFile(file: Image): Observable<any> {
        var request = {
            titre: file.titre,
            url: file.url,
            width: file.width,
            height: file.height,
        }
        return this.http.post('http://localhost:51044/api/images/upload', request)
            .pipe(
                catchError((error: HttpErrorResponse): Observable<any> => {
                    return throwError(error);
                }
                )
            );
    }

    isValidHttpUrl(string: string) {
        let url;
        let allowed = ['png', 'jpg', 'jpeg'];
        let ext = string.split(".");
        if (allowed.includes(ext[ext.length - 1])) {
          try {
            url = new URL(string);
          }
          catch (_) {
            return false;
          }
        }
        else {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
      }
}