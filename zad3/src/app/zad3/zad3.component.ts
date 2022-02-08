import {Component,Input,OnInit} from '@angular/core';

@Component({
  selector: 'app-zad3',
  templateUrl: './zad3.component.html',
  styleUrls: ['./zad3.component.css']
})
export class Zad3Component implements OnInit {

  constructor() { }

  @Input() actorName: string = "";
  @Input() actorSurname: string = "";
  @Input() title: string = "";
  @Input() a: number = 0;
  @Input() window: string = "";

  ngOnInit(): void {
  }

}
