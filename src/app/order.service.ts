import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "./order";
import {CartItem} from "./CartItem";
import {Recipient} from "./recipient";
import {OrderItem} from "./order.item";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public submitOrder(recipient: Recipient, cartItems: CartItem[]): Observable<any> {
    const orderItems: OrderItem[] = cartItems.map(item => {
      return {bookId: item.book.id, quantity: item.quantity} as OrderItem;
    });
    const order: Order = {
      recipient: recipient,
      items: orderItems
    } as Order
    return this.http.post(`${this.apiServerUrl}/orders`, order);
  }

}
