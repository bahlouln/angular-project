import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      return;
    }

    const newClient = {
      username: this.username,
      password: this.password,
      role: 'client'
    };

    this.http.post(`${this.apiUrl}/users`, newClient).subscribe(
      response => {
        console.log('Client enregistré avec succès:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erreur lors de l\'enregistrement du client:', error);
        this.error = 'Erreur lors de l\'enregistrement. Veuillez réessayer.';
      }
    );
  }
}
