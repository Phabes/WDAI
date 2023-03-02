import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input() starImage: string = 'emptyImage.png';
  @Output() setDishStars = new EventEmitter();
  srcImage = '';

  constructor() {}

  ngOnInit(): void {
    this.srcImage = 'assets/' + this.starImage;
  }

  starClick(): void {
    this.setDishStars.emit();
  }
}
