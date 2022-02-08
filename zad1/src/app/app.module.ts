import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'Posty', component: PostyPageComponent },
  { path: 'Zdjecia', component: ZdjeciaPageComponent },
  { path: 'Zdjecie/:id', component: SinglePhotoComponent },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' },
];

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/zad1/page-not-found/page-not-found.component';
import { NavBarComponent } from './components/zad1/nav-bar/nav-bar.component';
import { HomePageComponent } from './components/zad1/home-page/home-page.component';
import { PostyPageComponent } from './components/zad1/posty-page/posty-page.component';
import { ZdjeciaPageComponent } from './components/zad1/zdjecia-page/zdjecia-page.component';
import { NewPostFormComponent } from './components/zad1/new-post-form/new-post-form.component';
import { SinglePhotoComponent } from './components/zad1/single-photo/single-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavBarComponent,
    HomePageComponent,
    PostyPageComponent,
    ZdjeciaPageComponent,
    NewPostFormComponent,
    SinglePhotoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
