<script lang="ts">
  import { Cart, Payers, Tax, Tip, Subtotal } from "../stores/stores";
  function payerBill(payer, cart, tip, tax) {
    let payer_cart = { name: payer, items: <any[]>[],share:  0.0, tax: 0.0, tip: 0.0 };
    let share = 0.0;
    for (let i = 0; i < $Cart.length; i++) {
      let item = cart[i];
      if (item.assigned_to.includes(payer)) {
        share += item.discounted_price / item.assigned_to.length;
        payer_cart.items.push({
          name: item.name,
          share_price: item.discounted_price / item.assigned_to.length,
          share_payers: item.assigned_to.length,
        });
      }
    }
    let share_ratio = Number($Subtotal) > 0 ? share / Number($Subtotal) : 0;
    let share_tip = share_ratio * Number(tip);
    let share_tax = share_ratio * Number(tax);
    share = share + share_tip + share_tax;
    payer_cart.share = share;
    payer_cart.tax = share_tax;
    payer_cart.tip = share_tip;
    return payer_cart;
  }
  $: payer_carts = Object.fromEntries(
    $Payers.map((payer) => [payer, payerBill(payer, $Cart, $Tip, $Tax)])
  );
</script>

<div class="grid grid-cols-1 gap-4 text-center">
  {#each $Payers as payer}
    <div class="grid grid-cols-1 p-2 card">
      <span class="text-sm">{payer}</span>
      {#each payer_carts[payer].items as item}
          <div class="text-xs text-slate-400">1/{item.share_payers} {item.name} ${(item.share_price.toFixed(3).charAt(item.share_price.toFixed(2).length) != '0') ? item.share_price.toFixed(3) : item.share_price.toFixed(2)} </div>
          <!-- <div class="text-xs text-slate-400">1/{item.share_payers} {item.name} ${item.share_price.toFixed(2)} </div> -->
      {/each}
          <div class="text-xs text-slate-400">Tip Share: ${payer_carts[payer].tip}  </div>
          <div class="text-xs text-slate-400">Tax Share: ${payer_carts[payer].tax}  </div>
      <div>
        Total: ${payer_carts[payer].share.toFixed(2)}
      </div>
    </div>
  {/each}
</div>
