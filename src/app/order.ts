import {Recipient} from "./recipient";
import {OrderItem} from "./order.item";

export interface Order {
  recipient: Recipient,
  items: OrderItem[]
}
