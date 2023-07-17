import { writable, derived } from "svelte/store";

export const Payers = writable([]);
export const Cart = writable([]);

// export const Cart = writable([
//   {
//     name: "al pastor porkchop",
//     can_discount: false,
//     price: 3.0,
//     assigned_to: ["austin", "jeremy"],
//   },
//   {
//     name: "lobster nachos",
//     can_discount: true,
//     price: 23.0,
//     assigned_to: ["austin", "jeremy"],
//   },
// ]);

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
export const Discount = writable(15);
export const Tax = writable(0.0);
export const Tip = writable(0.0);
