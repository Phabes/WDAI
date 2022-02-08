import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input() clickWorks: boolean = true;
  @Output() addNumber = new EventEmitter();
  @Output() resetAdd = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addButtonClick(): void {
    this.addNumber.emit();
  }
  resetButtonClick(): void {
    this.resetAdd.emit();
  }
}
