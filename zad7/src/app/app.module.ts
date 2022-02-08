import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ButtonComponent } from './components/calculator/button/button.component';
import { DisplayComponent } from './components/calculator/display/display.component';

@NgModule({
  declarations: [AppComponent, CalculatorComponent, ButtonComponent, DisplayComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
