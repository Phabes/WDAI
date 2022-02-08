import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/models/post';
import { Photo } from 'src/models/photo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderService {
  url: string = 'https://jsonplaceholder.typicode.com/';
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.url}posts`);
  }

  addPost(newPost: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.url}posts`, newPost, httpOptions);
  }

  getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(`${this.url}photos`);
  }

  getPhoto(photoID: string | null): Observable<Photo> {
    return this.httpClient.get<Photo>(`${this.url}photos/${photoID}`);
  }
}
