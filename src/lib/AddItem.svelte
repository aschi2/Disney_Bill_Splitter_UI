<script lang="ts">
  import { Cart, Payers, Discount } from "../stores/stores";
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

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  function floorDecimals(value, decimals) {
    return Number(Math.floor(value + "e" + decimals) + "e-" + decimals);
  }

  function addItem() {
    if (isInt(price)) {
      price = price + ".00";
    }
    if (!isValidNumber(price)) {
      toastStore.trigger(priceError);
      return;
    }
    if (assigned_to.length == 0) {
      toastStore.trigger(assigned_toError);
      return;
    }
    let num_price = parseFloat(price);
    let discounted_price = num_price;
    let id = uuidv4();
    if (can_discount) {
      discounted_price = num_price - num_price * ($Discount / 100);
      discounted_price = floorDecimals(discounted_price, 2)
    }
    $Cart.push({
      name: name,
      price: num_price,
      can_discount: can_discount,
      assigned_to: assigned_to,
      id: id,
      discounted_price: discounted_price,
      discount: $Discount,
    });
    $Cart = $Cart;
    name = "";
    price = "";
  }
</script>

<div class="grid grid-cols-1 items-center gap-4">
  <div class="grid grid-cols-2 items-center gap-x-2 text-center">
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
    <div class="flex flex-row items-center">
      <input
        class="input variant-form-material text-right"
        type="number"
        bind:value={$Discount}
      /> %
    </div>

    <div>
      <SlideToggle
        name="slider-label"
        size="sm"
        active="bg-success-500"
        bind:checked={can_discount}>Discountable</SlideToggle
      >
    </div>
  </div>
  <div>
    <label>Select Payers</label>
    <select class="select" name="payers" multiple bind:value={assigned_to}>
      {#each $Payers as payer}
        <option value={payer}>{payer}</option>
      {/each}
    </select>
  </div>
  <div class="text-center">
    <button
      type="button"
      class="btn btn-sm variant-filled rounded"
      on:click={addItem}
    >
      Add Item
    </button>
  </div>
</div>
