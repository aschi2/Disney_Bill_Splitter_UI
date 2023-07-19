<script>
import { Subtotal, Tax, Tip, Subtotal_Full } from "../stores/stores"
$: total = Number($Tax) + Number($Tip) + Number($Subtotal);

</script>

<div class="grid grid-cols-1 place-items-center gap-4">
  <div class="grid grid-cols-1 items-center gap-x-4 text-center">
    <div class="grid grid-cols-1 text-center">
      <div>Subtotal</div>
      <div>
        ${Number($Subtotal).toFixed(2)}
      </div>
    </div>
    <div class="grid grid-cols-1 items-center gap-x-4 text-center">
      <div>Tax</div>
      <input
        class="input variant-form-material"
        type="text"
        inputmode="decimal"
        bind:value={$Tax}
        placeholder="Item Price"
      />
    </div>
    <div class="grid grid-cols-1 items-center gap-x-4 text-center">
      <div>Tip</div>

      <input
        class="input variant-form-material"
        type="text"
        inputmode="decimal"
        bind:value={$Tip}
        placeholder="Tip"
      />
      {$Subtotal > 0 ? (($Tip / $Subtotal_Full) * 100).toFixed(2) : "0.00"}%
    </div>
    <div>
      Total: ${total.toFixed(2)}
    </div>
  </div>
</div>
