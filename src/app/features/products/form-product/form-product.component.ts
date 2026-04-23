import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  productId: number | null = null;
  loading = false;
  error = '';
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    // ✅ Crear el formulario reactivo
    this.form = this.fb.group({
      productname: ['', Validators.required],
      productdescription: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    // ✅ Verificar si es edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productId = Number(id);

      this.productService.getProductById(this.productId).subscribe({
        next: (p: any) => {
          // ✅ Llenar el formulario
          this.form.patchValue({
            productname: p.productname,
            productdescription: p.productdescription,
            price: p.price
          });
        },
        error: () => { this.error = 'No se pudo cargar el producto'; }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const formValue = this.form.value;

    const request = this.isEdit
      ? this.productService.updateProduct(this.productId!, formValue)
      : this.productService.createProduct(formValue);

    request.subscribe({
      next: (res: { message: string }) => {
        this.loading = false;
        this.successMsg = res.message;
        setTimeout(() => this.router.navigate(['/products']), 1500);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error?.message || 'Error al guardar el producto';
      }
    });
  }
}
