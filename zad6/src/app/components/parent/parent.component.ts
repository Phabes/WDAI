import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  numberOfClicks: number = 0;
  clickWorks: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  add(): void {
    this.numberOfClicks++;
    if (this.numberOfClicks == 10) this.clickWorks = false;
  }

  reset(): void {
    this.numberOfClicks = 0;
    this.clickWorks = true;
  }
}
