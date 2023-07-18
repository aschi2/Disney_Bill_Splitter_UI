<script>
  import { Cart, Tax, Tip, Subtotal, Subtotal_Full, Payers } from "../stores/stores";
  import Items from "../lib/Items.svelte";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import AddPayer from "../lib/AddPayer.svelte";
  import AddItem from "../lib/AddItem.svelte";
  import Split from "../lib/Split.svelte";
  import { Toast } from "@skeletonlabs/skeleton";
  $: total = Number($Tax) + Number($Tip) + Number($Subtotal);
  function reset() {
    $Cart = [];
    $Tax = 0;
    $Tip = 0;
    $Payers = []
  }
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />
  <meta name="apple-mobile-web-app-title" content="Themepark Split" />
</svelte:head>

<Toast />
<div class="place-items-center gap-8">
  <div class="w-full">
    <h1 class="h1 py-2 text-center shadow-lg backdrop-brightness-125">
      <span
        class="bg-gradient-to-br from-blue-500 to-cyan-300 box-decoration-clone bg-clip-text text-transparent"
        >Themepark Bill Splitter</span
      >
    </h1>

    <Accordion>
      <AccordionItem open>
        <svelte:fragment slot="summary">Add Payers</svelte:fragment>
        <svelte:fragment slot="content">
          <div class="align-center item-center justify-center">
            <AddPayer />
          </div>
        </svelte:fragment>
      </AccordionItem>
      <AccordionItem open>
        <svelte:fragment slot="summary">Add Items</svelte:fragment>
        <svelte:fragment slot="content">
          <div class="align-center item-center justify-center">
            <AddItem />
          </div>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
  </div>

  <Accordion>
    <AccordionItem open>
      <svelte:fragment slot="summary">Cart</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="grid auto-cols-max grid-cols-1 place-items-center gap-4">
          {#each $Cart as item}
            <div class="w-5/6">
              <Items bind:item />
            </div>
          {/each}
        </div>
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem open>
      <svelte:fragment slot="summary">Summary</svelte:fragment>
      <svelte:fragment slot="content">
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
              {$Subtotal > 0
                ? (($Tip / $Subtotal_Full) * 100).toFixed(2)
                : "0.00"}%
            </div>
            <div>
              Total: ${total.toFixed(2)}
            </div>
          </div>
        </div></svelte:fragment
      >
    </AccordionItem>
    <AccordionItem open>
      <svelte:fragment slot="summary">Split</svelte:fragment>
      <svelte:fragment slot="content">
        <Split />
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
  <div class = "text-center">
    <button type="button" class="btn variant-filled-error rounded" on:click={reset}>
      Reset
    </button>
  </div>
  <div class="h-10">
  </div>
</div>
