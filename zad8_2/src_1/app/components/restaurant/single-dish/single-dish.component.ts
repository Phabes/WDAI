import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.css'],
})
export class SingleDishComponent implements OnInit {
  @Input() dish: any = {};
  @Input() rate: number = 1;
  @Output() addDishClick = new EventEmitter();
  @Output() removeDishClick = new EventEmitter();

  constructor() {
    this.dish.priceUSD *= this.rate;
  }

  ngOnInit(): void {}

  addButtonClick(): void {
    this.addDishClick.emit();
  }

  removeButtonClick(): void {
    this.removeDishClick.emit();
  }
}
