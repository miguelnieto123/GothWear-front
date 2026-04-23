import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  error = '';
  success = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // ✅ Crear formulario reactivo
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      userpassword: ['', [Validators.required, Validators.minLength(6)]],
      id_rol: [2] // valor fijo
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const formValue = this.form.value;

    this.authService.register(formValue).subscribe({
      next: (res: { message: string }) => {
        this.loading = false;
        this.success = res.message;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al registrarse. Intenta de nuevo.';
      }
    });
  }
}
