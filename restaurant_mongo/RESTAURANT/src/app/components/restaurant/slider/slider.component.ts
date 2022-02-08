import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  @Input() urls: string[] = [];
  slideIndex: number = 1;
  slides: boolean[] = [];
  dots: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    for (const url of this.urls) {
      this.slides.push(false);
      this.dots.push(false);
    }
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.slideIndex += n;
    this.showSlides(this.slideIndex);
  }

  currentSlide(n: number) {
    this.slideIndex = n;
    this.showSlides(this.slideIndex);
  }

  showSlides(n: number) {
    var i;
    // var slides = document.getElementsByClassName('mySlides');
    // var dots = document.getElementsByClassName('dot');
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    for (i = 0; i < this.slides.length; i++) {
      // slides[i].style.display = 'none';
      this.slides[i] = false;
    }
    for (i = 0; i < this.dots.length; i++) {
      // dots[i].className = dots[i].className.replace(' active', '');
      this.dots[i] = false;
    }
    // slides[this.slideIndex - 1].style.display = 'block';
    // dots[this.slideIndex - 1].className += ' active';
    this.slides[this.slideIndex - 1] = true;
    this.dots[this.slideIndex - 1] = true;
  }

  getClass(index: number): string {
    return this.dots[index] ? 'dot active' : 'dot';
  }
}
