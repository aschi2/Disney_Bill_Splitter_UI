<script lang="ts">
  import { Cart, Payers, Tax, Tip, Subtotal } from "../stores/stores";
  function payerBill(payer,cart,tip,tax) {
	console.log("payerBill executed")
    let share = 0.0;
    for (let i = 0; i < $Cart.length; i++) {
      let item = cart[i];
      console.log(payer)
      console.log(item.assigned_to)
      if (item.assigned_to.includes(payer)) {
        console.log("added to payer");
        console.log(item.discounted_price / item.assigned_to.length);
        share += item.discounted_price / item.assigned_to.length;
      }
    }
    let share_ratio = Number($Subtotal) > 0 ? share / Number($Subtotal) : 0;
    console.log(share_ratio)
    share = share + (share_ratio * (Number(tax) + Number(tip)));
    return share;
  }
</script>

<div class="grid grid-cols-1 gap-4 text-center">
  {#each $Payers as payer}
    <div class="grid grid-cols-1 p-2">
      <span class="text-sm">{payer}</span>
      <div>${payerBill(payer,$Cart,$Tip,$Tax).toFixed(2)}</div>
    </div>
  {/each}
</div>
