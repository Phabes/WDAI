import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css'],
})
export class AddDishFormComponent implements OnInit {
  modelForm: FormGroup;
  showAddDishForm: boolean = false;
  // @Output() addNewDish = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dishesService: DishesService
  ) {
    this.modelForm = this.formBuilder.group({
      name: ['ascs', Validators.required],
      kitchenType: ['JAKAŚ'],
      category: ['elo'],
      products: ['nic ex'],
      available: [3],
      priceUSD: [3.19],
      description: ['coś fajnego'],
      url: [
        'https://gastrowiedza.pl/sites/default/files/styles/big/public/2020-03/Jedzenie%20z%20dostaw%C4%85%20do%20domu.jpg?itok=D6Q1BgPr',
      ],
    });
  }

  ngOnInit(): void {}

  addDishFormClick(): void {
    console.log('WALIDACJE SPRAWDZIĆ');
    this.dishesService.addDish(this.modelForm.value);
    // this.addNewDish.emit(this.modelForm.value);
    this.clearForm();
  }

  clearForm(): void {
    this.modelForm.reset();
  }

  changeFormStatus(): void {
    this.showAddDishForm = !this.showAddDishForm;
  }
}
