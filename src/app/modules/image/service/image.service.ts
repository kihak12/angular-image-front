import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Image} from '../interface/image.interface';


@Injectable({
    providedIn: 'root',
})
export class ImageService {

    private apiUrl = 'http://localhost:51044/api/images';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getImages(): Observable<Image[]> {
        return this.http.get<Image[]>(this.apiUrl);
    }

    getImage(id: string): Observable<Image> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Image>(url)
    }

    deleteImage(id: string): Observable<any>{
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }

    resizeImage(imageId: string, image: any): Observable<any>{
        const url = `${this.apiUrl}/${imageId}/resize`;
        var request = {
            titre: image.titre,
            width: image.width,
            height: image.height,
        }
        return this.http.post(url, request);
    }

}