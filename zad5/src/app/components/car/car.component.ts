import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  constructor() {}

  @Input() brands: string[] = [];
  @Input() models: string[] = [];
  @Input() colors: string[] = [];

  @Output() brandChanged = new EventEmitter<string>();
  @Output() modelChanged = new EventEmitter<string>();
  @Output() colorChanged = new EventEmitter<string>();

  onChangeBrand(e: any): void {
    this.brandChanged.emit(e.target.value);
    let dv: any = document.getElementsByName('model');
    dv[0].value = 'none';
  }

  onChangeModel(e: any): void {
    this.modelChanged.emit(e.target.value);
  }

  onChangeColor(color: string): void {
    this.colorChanged.emit(color);
  }

  ngOnInit(): void {}
}
