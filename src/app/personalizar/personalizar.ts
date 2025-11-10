import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-personalizar',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './personalizar.html',
  styleUrls: ['./personalizar.css']
})
export class Personalizar {
  productos = [
    { nombre: 'Gomitas', descripcion: 'Suaves y dulces', imagen: 'assets/img/gomitas.jpg', cantidad: 0 },
    { nombre: 'Chamoy', descripcion: 'Toque ácido y picante', imagen: 'assets/img/chamoy.jpg', cantidad: 0 },
    { nombre: 'Tajín', descripcion: 'Sabor clásico enchilado', imagen: 'assets/img/tajin.jpg', cantidad: 0 },
  ];

  agregarProducto(producto: any) {
    producto.cantidad++;
  }
}
