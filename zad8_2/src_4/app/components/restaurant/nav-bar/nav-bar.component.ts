import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() basket: any = [];
  @Input() total: number = 0;
  @Input() rate: number = 1;
  @Input() currency: string = '$';

  constructor() {}

  ngOnInit(): void {}
}
