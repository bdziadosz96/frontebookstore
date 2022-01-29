import {Component, OnInit} from '@angular/core';
import {CatalogService} from "./catalog.service";
import {Book} from "./book";
import {CartItem} from "./CartItem";
import {NgForm} from "@angular/forms";
import {OrderService} from "./order.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontebookstore';
  public catalog: Book[] | undefined;
  public cartItems: CartItem[] = [];


  constructor(private catalogService: CatalogService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getCatalog();
  }

  public getCatalog(): void {
    this.catalogService.getCatalog().subscribe(
      (response: Book[]) => {
        console.log("Got book list:");
        console.log(response);
        this.catalog = response;
      });
  }

  public countCartItems(): number {
    return this.cartItems
      .reduce((sum, current) => sum + current.quantity, 0);
  }

  public addToCart(book: Book): void {
    const current: CartItem | undefined = this.cartItems.find(x => x.book.id === book.id);
    if (current) {
      current.quantity += 1;
    } else {
      this.cartItems.push({book: book, quantity: 1} as CartItem)
    }
    console.log('Cart is: ' + JSON.stringify(this.cartItems));
  }

  public totalCartAmount(): number {
    return this.cartItems
      .reduce((sum, current) => sum + current.book.price * current.quantity, 0);
  }

  public clearCart(): void {
    this.cartItems = [];
  }

  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'cart') {
      button.setAttribute('data-target', '#cartModal');
    }
    if (mode === 'order') {
      button.setAttribute('data-target', '#orderModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onOrderSubmit(orderForm: NgForm): void {
    // @ts-ignore
    document.getElementById(`cancel-order-button`).click();
    // @ts-ignore
    document.getElementById(`close-cart-button`).click();
    console.log("Received form: {}")
    this.orderService.submitOrder(orderForm.value, this.cartItems)
      .subscribe(
        (response: any) => {
          console.log("Order submited")
          this.cartItems = [];
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        });
  }
}
