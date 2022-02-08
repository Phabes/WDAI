import { Component } from '@angular/core';

interface Brand {
  name: string;
  models: {
    name: string;
    colors: string[];
  }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'LABS';
  cars: Brand[] = [
    {
      name: 'Audi',
      models: [
        {
          name: 'A1',
          colors: ['black', 'blue', 'purple'],
        },
        {
          name: 'A3',
          colors: ['red', 'yellow', 'black'],
        },
        {
          name: 'A8',
          colors: ['grey', 'black'],
        },
      ],
    },
    {
      name: 'Volkswagen',
      models: [
        {
          name: 'Passat (B8)',
          colors: ['black', 'grey'],
        },
        {
          name: 'Taos',
          colors: ['blue', 'orange', 'grey'],
        },
        {
          name: 'Tiguan X',
          colors: ['red', 'black'],
        },
      ],
    },
  ];
  brands: string[];
  models: string[];
  colors: string[];
  currBrand: number;
  currModel: number;
  currColor: number;
  allDataReceived: boolean;

  constructor() {
    this.brands = this.cars.map((brand) => brand.name);
    this.models = [];
    this.colors = [];
    this.currBrand = 0;
    this.currModel = 0;
    this.currColor = 0;
    this.allDataReceived = false;
  }

  changeBrand(name: string) {
    let index = this.brands.indexOf(name);
    this.currBrand = index;
    this.models = this.cars[index].models.map((model) => model.name);
    this.currModel = 0;
    this.colors = [];
    this.currColor = 0;
    this.allDataReceived = false;
  }

  changeModel(name: string) {
    if (this.currBrand != null) {
      let index = this.models.indexOf(name);
      this.currModel = index;
      this.colors = this.cars[this.currBrand].models[index].colors;
      this.currColor = 0;
      this.allDataReceived = false;
    }
  }

  changeColor(name: string) {
    if (this.currBrand != null && this.currModel != null) {
      let index = this.colors.indexOf(name);
      this.currColor = index;
      this.allDataReceived = true;
    }
  }

  getColor() {
    let color = this.colors[this.currColor];
    return color.charAt(0).toUpperCase() + color.slice(1);
  }
}
