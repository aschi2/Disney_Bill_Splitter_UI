<script lang="ts">
  import { Cart, Payers } from "../stores/stores";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";

  let name = "";
  let price = "";
  let can_discount = true;
  let assigned_to = [];
  const priceError: ToastSettings = {
    message: "Invalid Price!",
    background: "variant-filled-error",
  };
  const assigned_toError: ToastSettings = {
    message: "No One Assigned!",
    background: "variant-filled-error",
  };
  function isValidNumber(num) {
    return /\d+\.\d{2}/gm.test(String(num));
  }
  function isInt(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
  }

  function addItem() {
    if (isInt(price)) {
      price = price + ".00";
    }
    if (!isValidNumber(price)) {
      toastStore.trigger(priceError);
      return
    }
    if (assigned_to.length == 0){
	toastStore.trigger(assigned_toError)
	return
	}
    let num_price = parseFloat(price);
    $Cart.push({
      name: name,
      price: num_price,
      can_discount: can_discount,
      assigned_to: assigned_to,
    });
    $Cart = $Cart;
    name = "";
    price = "";
    can_discount = true;
  }
</script>

<div class="grid grid-cols-1 items-center gap-4">
  <div class="grid grid-cols-3 items-center text-center divide-x">
    <div>
      <input
        class="input variant-form-material"
        type="text"
        bind:value={name}
        placeholder="Item Name"
      />
    </div>
    <div>
      <input
        class="input variant-form-material"
        type="text"
        inputmode="decimal"
        bind:value={price}
        placeholder="Item Price"
      />
    </div>
    <div>
      <SlideToggle
        name="slider-label"
        size="sm"
        active="bg-success-500"
        bind:checked={can_discount}>Discount</SlideToggle
      >
    </div>
  </div>
  <div>
    <select class="select" multiple bind:value={assigned_to}>
      {#each $Payers as payer}
        <option value={payer}>{payer}</option>
      {/each}
    </select>
  </div>
  <div class="text-center">
    <button type="button" class="btn btn-sm variant-filled" on:click={addItem}>
      Add Item
    </button>
  </div>
</div>
