import { Component, OnInit } from '@angular/core';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';
import { Photo } from 'src/models/photo';

@Component({
  selector: 'app-zdjecia-page',
  templateUrl: './zdjecia-page.component.html',
  styleUrls: ['./zdjecia-page.component.css'],
})
export class ZdjeciaPageComponent implements OnInit {
  photos: Photo[] = [];
  currentPhoto: Photo | null = null;

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {}

  ngOnInit(): void {
    this.jsonPlaceholderService.getPhotos().subscribe((data) => {
      this.photos = data;
    });
  }

  // showPhoto(photo: Photo): void {
  //   let id = null;
  //   if (photo.id) id = photo.id.toString();
  //   this.jsonPlaceholderService.getPhoto(id).subscribe((data) => {
  //     this.currentPhoto = data;
  //   });
  // }

  // emptyPhotos(): number {
  //   return this.photos.length;
  // }
}
