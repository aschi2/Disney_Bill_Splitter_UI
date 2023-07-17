<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
  import { Cart, Tax, Tip, Subtotal, Subtotal_Full } from "../stores/stores";
  import Items from "../lib/items.svelte";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import AddPayer from "../lib/AddPayer.svelte";
  import AddItem from "../lib/AddItem.svelte";
  import Split from "../lib/Split.svelte";
  import { Toast } from "@skeletonlabs/skeleton";
  $: total = Number($Tax) + Number($Tip) + Number(subtotal);
  $: subtotal = Number($Subtotal);
</script>

<Toast />
<div class="place-items-center gap-8 divide-y">
  <div class="w-full">
    <h1 class="h1 text-center backdrop-brightness-125 shadow-lg py-2">
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
                ${subtotal.toFixed(2)}
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
</div>
