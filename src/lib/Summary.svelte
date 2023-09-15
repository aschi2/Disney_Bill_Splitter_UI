<script lang="ts">
import { Subtotal, Tax, Tip, Subtotal_Full, Discount_Full } from "../stores/stores"
$: total = Number($Tax) + Number($Tip) + Number($Subtotal);
function forceTwoDecimalsTax() {
	$Tax  = parseFloat($Tax.toFixed(2));
}
function forceTwoDecimalsTip() {
	$Tip = parseFloat($Tip.toFixed(2));
}
function tipPercent(percent: number) {
	$Tip = parseFloat(($Subtotal_Full * (percent / 100)).toFixed(2));

}

</script>

<div class="grid grid-cols-1 place-items-center gap-4">
  <div class="grid grid-cols-1 items-center gap-x-4 text-center">
    <div class="grid grid-cols-1 text-center gap-3">
    <div class="grid grid-cols-1 text-center gap-1">
    {#if $Discount_Full}
    <div class="text-success-400" >
    <div class="font-bold">
    Discount
    </div>
    <div>
      ${$Discount_Full.toFixed(2)}
    </div>
    </div>
    {/if}
    <div>
      <div class="font-bold">Subtotal</div>
      <div>
        ${Number($Subtotal).toFixed(2)}
      </div>
      </div>
    </div>
    <div class="grid grid-cols-1 items-center gap-x-4 gap-y-1 text-center">
      <div class="font-bold">Tax</div>
      <input
        class="input variant-form-material"
        type="number"
	step=".01"
        inputmode="decimal"
	on:change={forceTwoDecimalsTax}
        bind:value={$Tax}
        placeholder="Item Price"
      />
      {$Subtotal > 0 ? (($Tax / $Subtotal) * 100).toFixed(2) : "0.00"}%
    </div>
    <div class="grid grid-cols-1 items-center gap-x-4 gap-y-1 text-center">
      <div class="font-bold">Tip</div>

      <input
        class="input variant-form-material"
        type="number"
	step=".01"
        inputmode="decimal"
	on:change={forceTwoDecimalsTip}
        bind:value={$Tip}
        placeholder="Tip"
      />
      
<div class="btn-group variant-filled rounded">
	<button on:click={() => tipPercent(15)}>15%</button>
	<button on:click={() => tipPercent(18)}>18%</button>
	<button on:click={() => tipPercent(20)}>20%</button>
</div>

      {$Subtotal > 0 ? (($Tip / $Subtotal_Full) * 100).toFixed(2) : "0.00"}%
    </div>
    <div>
    <div class="font-bold">
    Total
    </div>
    <div>
      ${total.toFixed(2)}
    </div>
    </div>
  </div>
</div>
</div>
