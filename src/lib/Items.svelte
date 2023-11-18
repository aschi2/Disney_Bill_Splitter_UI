<script lang="ts">
  import {
    Cart,
    Add_Name,
    Add_Price,
    Add_Assigned_To,
    Add_Can_Discount,
  } from "../stores/stores";
  export let item: {
    name: string;
    price: string;
    discount: number;
    assigned_to: string[];
    can_discount: boolean;
    id: string;
  };
  function removeItem() {
    const index = $Cart.findIndex((i: any) => {
      return i.id === item.id;
    });
    $Cart.splice(index, 1);
    $Cart = $Cart;
  }
  function editItem() {
    $Add_Name = item.name;
    $Add_Price = item.price;
    $Add_Assigned_To = item.assigned_to;
    $Add_Can_Discount = item.can_discount;
    removeItem();
  }
  function copyItem() {
    $Add_Name = item.name;
    $Add_Price = item.price;
    $Add_Assigned_To = [];
    $Add_Can_Discount = item.can_discount;
  }
</script>

<div class="card grid grid-cols-1 divide-y bg-white/10 shadow-md">
  <div class="grid grid-cols-1">
    <div class="w-full truncate px-2 text-center">
      {item.name}
    </div>
  </div>
  <div class="grid grid-cols-2 divide-x">
    <div class="grid w-full grid-cols-1 text-center">
      <div
        class="w-full px-2 text-center {item.can_discount
          ? 'text-slate-400'
          : ''}"
      >
        ${Number(item.price).toFixed(2)}
      </div>
      {#if item.can_discount}
        <div class="w-full px-2 text-center">
          ${Number(item.discounted_price).toFixed(2)}
        </div>
      {/if}
    </div>
    <div class="grid w-full grid-cols-1 text-center">
      <div class="h-fit w-full px-2 text-center">
        {item.can_discount ? String(item.discount) + "% off" : "Not Discounted"}
      </div>
      {#if item.can_discount}
        <div class="h-fit w-full px-2 text-center text-success-400">
          ${item.discount_value.toFixed(2)}
        </div>
      {/if}
    </div>
  </div>

  <div class="text-center">
    {item.assigned_to}
  </div>
  <div class="grid h-full grid-cols-3 text-center">
    <button
      type="button"
      class="btn btn-sm variant-filled-error rounded-none rounded-bl"
      on:click={removeItem}
    >
      Delete
    </button>
    <button
      type="button"
      class="btn btn-sm variant-filled-tertiary rounded-none"
      on:click={editItem}
    >
      Edit
    </button>
    <button
      type="button"
      class="btn btn-sm variant-filled-success rounded-none rounded-br"
      on:click={copyItem}
    >
      Copy
    </button>
  </div>
</div>
