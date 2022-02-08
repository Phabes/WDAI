import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/dishes.service';

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.css'],
})
export class SingleDishComponent implements OnInit {
  @Input() dish: DishesService = new DishesService();
  @Input() rate: number = 1;
  @Output() addDishClick = new EventEmitter();
  @Output() removeDishClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addButtonClick(): void {
    this.addDishClick.emit();
  }

  removeButtonClick(): void {
    this.removeDishClick.emit();
  }
}
