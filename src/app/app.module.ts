import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeTarjetaComponent } from './components/heroe-tarjeta/heroe-tarjeta.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { FotosTarjetaComponent } from './components/fotos-tarjeta/fotos-tarjeta.component';
import { FotosHeroesComponent } from './components/fotos-heroes/fotos-heroes.component';
import { FotosHeroeComponent } from './components/fotos-heroe/fotos-heroe.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaHeroesComponent } from './components/lista-heroes/lista-heroes.component';
import { EditarHeroeComponent } from './components/editar-heroe/editar-heroe.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    HeroesComponent,
    HeroeTarjetaComponent,
    HeroeComponent,
    FotosTarjetaComponent,
    FotosHeroesComponent,
    FotosHeroeComponent,
    ListaHeroesComponent,
    EditarHeroeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
