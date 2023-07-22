<script lang="ts">
  import {
    Cart,
    Payers,
    Discount,
    Add_Name,
    Add_Price,
    Add_Assigned_To,
    Add_Can_Discount,
  } from "../stores/stores";
  import { toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";

  const priceError: ToastSettings = {
    message: "Invalid Price!",
    background: "variant-filled-error",
  };
  const assigned_toError: ToastSettings = {
    message: "No One Assigned!",
    background: "variant-filled-error",
  };
  const nameError: ToastSettings = {
    message: "Item Name Can't Be Empty!",
    background: "variant-filled-error",
  };
  function isValidNumber(num: string) {
    return /\d+\.\d{2}/gm.test(num);
  }
  // function isInt(str) {
  //   return /^\+?(0|[1-9]\d*)$/.test(str);
  // }

  // not my code so typing is ignored
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
  //

  function addZeroes(num: string) {
    const dec = String(num).split(".")[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return Number(num).toFixed(len);
  }

  function addItem() {
    // if (isInt($Add_Price)) {
    //   $Add_Price = $Add_Price + ".00";
    // }
    $Add_Price = addZeroes($Add_Price);
    if (
      !isValidNumber($Add_Price) ||
      $Add_Price.length == 0 ||
      $Add_Price == "0.00"
    ) {
      toastStore.trigger(priceError);
      return;
    }
    $Add_Price = parseFloat($Add_Price).toFixed(2);
    if ($Add_Assigned_To.length == 0) {
      toastStore.trigger(assigned_toError);
      return;
    }
    if ($Add_Name.length == 0) {
      toastStore.trigger(nameError);
      return;
    }
    let num_price = parseFloat($Add_Price);
    let discounted_price = num_price;
    let id = uuidv4();
    if ($Add_Can_Discount) {
      discounted_price = num_price - num_price * ($Discount / 100);
      discounted_price = floorDecimals(discounted_price, 2);
    }
    $Cart.push({
      name: $Add_Name,
      price: num_price,
      can_discount: $Add_Can_Discount,
      assigned_to: $Add_Assigned_To,
      id: id,
      discounted_price: discounted_price,
      discount: $Discount,
    });
    $Cart = $Cart;
    $Add_Name = "";
    $Add_Price = "";
  }
  function togglePayer(payer: string) {
    console.log("toggling");
    console.log(payer);
    console.log($Add_Assigned_To);
    if ($Add_Assigned_To.includes(payer)) {
      $Add_Assigned_To = $Add_Assigned_To.filter((item) => item !== payer);
    } else {
      $Add_Assigned_To.push(payer);
    }
    $Add_Assigned_To = $Add_Assigned_To;
  }
  function toggleDiscount() {
    if ($Add_Can_Discount) {
      $Add_Can_Discount = false;
    } else {
      $Add_Can_Discount = true;
    }
    $Add_Can_Discount = $Add_Can_Discount;
  }
</script>

<div class="grid grid-cols-1 items-center gap-4">
  <div class="grid grid-cols-2 items-center gap-2 text-center">
    <div>
      <input
        class="input variant-form-material"
        type="text"
        bind:value={$Add_Name}
        placeholder="Item Name"
      />
    </div>
    <div>
      <input
        class="input variant-form-material"
        type="text"
        inputmode="decimal"
        bind:value={$Add_Price}
        placeholder="Item Price"
      />
    </div>
    <div class="flex flex-row">
      <span
        class="input variant-form-material flex w-full flex-row items-center"
      >
        {#if $Add_Can_Discount}
          <input
            class="w-full border-none bg-transparent text-right"
            type="number"
            bind:value={$Discount}
          /> %
        {:else}
          <input
            class="w-full border-none bg-transparent text-right text-opacity-50 disabled:text-slate-400"
            type="number"
            disabled
            bind:value={$Discount}
          />
          <div class="text-slate-400">%</div>
        {/if}
        <span /></span
      >
    </div>

    <div
      class="card flex h-full flex-row items-center {$Add_Can_Discount
        ? 'variant-ghost-success shadow-inner'
        : 'variant-ghost-error shadow-xl'}"
      on:click={() => toggleDiscount()}
    >
      <!-- <SlideToggle -->
      <!--   name="slider-label" -->
      <!--   size="sm" -->
      <!--   active="bg-success-500" -->
      <!--   bind:checked={$Add_Can_Discount}>Discountable</SlideToggle -->
      <!-- > -->
      <div class="w-full text-center">
        {#if $Add_Can_Discount}
          Discount
        {:else}
          No Discount
        {/if}
      </div>
    </div>
  </div>
  <div>
    <label class="pb-4">Select Payers</label>
    <!-- <select class="select" name="payers" multiple bind:value={$Add_Assigned_To}> -->
    <!--   {#each $Payers as payer} -->
    <!--     <option value={payer}>{payer}</option> -->
    <!--   {/each} -->
    <!-- </select> -->
    <div class="grid-flow grid w-full grid-cols-3 gap-4 text-center">
      {#each $Payers as payer}
        <div
          class="card truncate p-2 {$Add_Assigned_To.includes(payer)
            ? 'variant-ghost-success shadow-inner'
            : 'variant-ghost-error shadow-xl'}"
          on:click={() => togglePayer(payer)}
        >
          <span class="text-sm">{payer}</span>
        </div>
      {/each}
    </div>
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
