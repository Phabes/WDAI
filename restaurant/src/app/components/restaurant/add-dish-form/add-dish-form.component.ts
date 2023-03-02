import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css'],
})
export class AddDishFormComponent implements OnInit {
  modelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dishesService: DishesService
  ) {
    this.modelForm = this.formBuilder.group({
      name: ['Spaghetti', [Validators.required, Validators.maxLength(16)]],
      kitchenType: ['Włoska', Validators.required],
      category: ['Danie Główne', Validators.required],
      products: [
        '120g makaronu, krojone pomidory, 1/2 łyżki chilli, pietruszka',
        Validators.required,
      ],
      available: [5, [Validators.required, Validators.pattern('^[0-9]*$')]],
      priceUSD: [3.19, Validators.required],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
        Validators.required,
      ],
      url: [
        'https://na-talerzu.pl/wp-content/uploads/2020/08/IMG_9099-scaled.jpg,https://cdn.galleries.smcloud.net/t/photos/gf-n4vp-XMnG-9Bbs_spaghetti-w-pomidorowym-sosie-w-5-minut-z-piekarnika-bez-gotowania-makaronu.jpg',
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {}

  addDishFormClick(): void {
    this.dishesService.addDish(this.modelForm.value);
    this.clearForm();
  }

  clearForm(): void {
    this.modelForm.reset();
  }
}
