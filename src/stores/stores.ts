import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";

export const Payers: Writable<string[]> = writable([]);
export const Cart: Writable<any[]> = writable([]);


export const Subtotal = derived(Cart, ($Cart) => {
  let subtotal = 0.0;
  $Cart.forEach((item) => {
    subtotal += item.discounted_price;
  });
  console.log(subtotal)
  return subtotal;
});
export const Subtotal_Full = derived(Cart, ($Cart) => {
  let subtotal = 0.0;
  $Cart.forEach((item) => {
    subtotal += item.price;
  });
  console.log(subtotal)
  return subtotal;
});
export const Discount_Full = derived(Cart, ($Cart) => {
  let discount = 0.0;
  $Cart.forEach((item) => {
    discount += item.discount_value;
  });
  console.log(discount)
  return discount;
});
export const Discount = writable(15);
export const Tax = writable(0.0);
export const Tip = writable(0.0);
export const Add_Name = writable("");
export const Add_Price = writable("");
export const Add_Assigned_To: Writable<string[]> = writable([]);
export const Add_Can_Discount = writable(false);
