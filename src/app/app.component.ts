import {Component, OnInit} from '@angular/core';
import {CatalogService} from "./catalog.service";
import {Book} from "./book";
import {CartItem} from "./CartItem";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontebookstore';
  public catalog: Book[] | undefined;
  public cartItems: CartItem[] = [];


  constructor(private catalogService: CatalogService) {
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
    // @ts-ignore
    const current: CartItem = this.cartItems.find(x => x.bookId == book.id);
    if (current) {
      current.quantity += 1;
    } else {
      this.cartItems.push({bookId: book.id, quantity: 1} as CartItem)
    }
    console.log('Cart is: ' + JSON.stringify(this.cartItems));
  }
}
