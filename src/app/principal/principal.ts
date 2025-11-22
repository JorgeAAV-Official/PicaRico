import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartService } from '../services/cart.service';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ProfileIconComponent],
  templateUrl: './principal.html',
  styleUrls: ['./principal.css']
})
export class Principal {

  constructor(
    public cartService: CartService
  ) { }
}
