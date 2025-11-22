import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';

@Component({
  selector: 'app-contacto',
  imports: [RouterModule, ProfileIconComponent],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

}
