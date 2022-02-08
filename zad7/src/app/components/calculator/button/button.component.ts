import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() operator: string = '';
  @Output() btClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  buttonClicked(): void {
    this.btClick.emit();
  }
}
