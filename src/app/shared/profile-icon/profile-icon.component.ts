import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from '@angular/fire/auth';

@Component({
    selector: 'app-profile-icon',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './profile-icon.component.html',
    styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent {

    // Estado UI
    showLoginModal = false;

    // Credenciales para login
    email = '';
    password = '';
    errorMessage = '';

    // Usuario actual
    user: User | null = null;

    constructor(private auth: Auth) {
        // Escucha cambios de login en tiempo real
        onAuthStateChanged(this.auth, (currentUser) => {
            this.user = currentUser;
        });
    }

    toggleLoginModal() {
        this.showLoginModal = !this.showLoginModal;

        // Reset UI
        this.errorMessage = '';
        this.email = '';
        this.password = '';
    }

    async login() {
        this.errorMessage = '';

        try {
            await signInWithEmailAndPassword(this.auth, this.email, this.password);

            this.toggleLoginModal();   // Cierra modal al loguear
        }
        catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                this.errorMessage = 'Correo o contraseña inválidos.';
            } else {
                this.errorMessage = 'Error al iniciar sesión.';
            }
        }
    }

    async logout() {
        await signOut(this.auth);

        this.toggleLoginModal(); // Cierra modal de perfil
    }
}
