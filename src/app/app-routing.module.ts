import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
// import { BuscadorComponent } from './components/buscador/buscador.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FotosHeroesComponent } from './components/fotos-heroes/fotos-heroes.component';
import { FotosHeroeComponent } from './components/fotos-heroe/fotos-heroe.component';
import { ListaHeroesComponent } from './components/lista-heroes/lista-heroes.component';
import { EditarHeroeComponent } from './components/editar-heroe/editar-heroe.component';
import { ListaMultimediaComponent } from './lista-multimedia/lista-multimedia.component';
import { EditarMultimediaComponent } from './editar-multimedia/editar-multimedia.component';

const routes: Routes = [
  { path: 'hogar', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'galeria', component: FotosHeroesComponent },
  { path: 'fotos/:id', component: FotosHeroeComponent },
  { path: 'lista-heroes', component: ListaHeroesComponent },
  { path: 'editar-heroe/:idheroe', component: EditarHeroeComponent },
  { path: 'lista-multimedia', component: ListaMultimediaComponent },
  { path: 'editar-multimedia/:idheroe', component: EditarMultimediaComponent },
  // { path: 'buscar/:termino', component: BuscadorComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
