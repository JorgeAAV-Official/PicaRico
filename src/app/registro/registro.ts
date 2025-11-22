import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ProfileIconComponent],
  templateUrl: './registro.html'
})
export class Registro {

  username = '';
  email = '';
  password = '';
  autorizacion = false;
  errorMessage = '';

  showSuccessModal = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  async onSubmit() {
    this.errorMessage = '';

    if (!this.autorizacion) {
      this.errorMessage = 'Debes aceptar el tratamiento de datos.';
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      await updateProfile(cred.user, { displayName: this.username });

      await setDoc(doc(this.firestore, 'usuarios', cred.user.uid), {
        username: this.username,
        email: this.email,
        autorizacion: this.autorizacion,
        creado: new Date()
      });

      // 🟢 Mostrar modal de éxito
      this.showSuccessModal = true;

      // 🧹 Reset visual del formulario
      this.username = '';
      this.email = '';
      this.password = '';
      this.autorizacion = false;

    } catch (err: any) {
      console.error(err);

      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = 'El correo ya está registrado.';
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage = 'La contraseña es demasiado débil.';
      } else {
        this.errorMessage = 'Error al registrar el usuario.';
      }
    }
  }

  // Cerrar modal
  closeSuccessModal() {
    this.showSuccessModal = false;
  }
}
