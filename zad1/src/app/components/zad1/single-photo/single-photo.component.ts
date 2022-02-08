import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';
import { Photo } from 'src/models/photo';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css'],
})
export class SinglePhotoComponent implements OnInit {
  photo: Photo | null = null;

  constructor(
    private jsonPlaceholderService: JsonPlaceholderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.jsonPlaceholderService.getPhoto(id).subscribe((data) => {
      this.photo = data;
    });
  }
}
