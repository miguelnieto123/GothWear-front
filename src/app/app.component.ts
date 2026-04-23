import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class TuComponente {

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}