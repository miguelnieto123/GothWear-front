import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../models/cart-order.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() onRemove = new EventEmitter<number>();

  remove(): void {
    this.onRemove.emit(this.item.id_product);
  }
}
