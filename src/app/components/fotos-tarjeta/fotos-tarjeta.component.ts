import { Component, Input } from '@angular/core';
import { FotosHeroeInterface } from '../../interfaces/fotos-heroe.interface';


@Component({
  selector: 'app-fotos-tarjeta',
  templateUrl: './fotos-tarjeta.component.html',
  styleUrl: './fotos-tarjeta.component.css'
})
export class FotosTarjetaComponent {
  @Input() foto: FotosHeroeInterface = { id: 0, idHeroe: 0, nombreHeroe: '', url: '' };
}
