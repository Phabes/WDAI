import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  expression: string = '';
  // availableNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  availableNumbers: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];
  availableOperators: string[] = ['C', '+', '-', '*', '/', '='];
  reset: boolean = true;
  lastOperator: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  addNumber(number: string): void {
    if (this.reset) {
      this.expression = number;
      this.reset = false;
    } else {
      this.expression += number;
    }
    this.lastOperator = false;
  }

  addOperator(operator: string): void {
    if (this.expression != '') {
      if (operator == 'C') {
        this.expression = '';
        this.reset = true;
        this.lastOperator = false;
      } else if (operator != '=') {
        if (this.lastOperator) this.expression = this.expression.slice(0, -1);
        this.expression += operator;
        this.reset = false;
        this.lastOperator = true;
      } else {
        if (!this.lastOperator) {
          const result = eval(this.expression);
          if ((result != Infinity && result) != -Infinity) {
            this.expression = eval(this.expression);
            this.reset = true;
          }
        }
      }
    }
  }
}
