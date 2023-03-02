import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from 'src/models/dish';

@Component({
  selector: 'app-edit-dish-form',
  templateUrl: './edit-dish-form.component.html',
  styleUrls: ['./edit-dish-form.component.css'],
})
export class EditDishFormComponent implements OnChanges {
  @Input() dish!: Dish;
  modelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dishesService: DishesService
  ) {
    this.modelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(16)]],
      kitchenType: ['', Validators.required],
      category: ['', Validators.required],
      products: ['', Validators.required],
      available: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      priceUSD: [0, Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let urls = this.dish.url.join(',');
    this.modelForm = this.formBuilder.group({
      name: [this.dish.name, [Validators.required, Validators.maxLength(16)]],
      kitchenType: [this.dish.kitchenType, Validators.required],
      category: [this.dish.category, Validators.required],
      products: [this.dish.products, Validators.required],
      available: [
        this.dish.available,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      priceUSD: [this.dish.priceUSD, Validators.required],
      description: [this.dish.description, Validators.required],
      url: [urls, Validators.required],
    });
  }

  editDishFormClick(): void {
    this.dishesService
      .editDish(this.dish._id, this.modelForm.value)
      .then((data: any) => {
        this.clearForm();
      });
  }

  clearForm(): void {
    this.modelForm.reset();
  }
}
