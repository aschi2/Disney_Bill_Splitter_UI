<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
  import { Cart, Tax, Tip, Subtotal } from "../stores/stores";
  import Items from "../lib/items.svelte";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import AddPayer from "../lib/AddPayer.svelte";
  import AddItem from "../lib/AddItem.svelte";
  import { Toast } from "@skeletonlabs/skeleton";
  $: total = Number($Tax) + Number($Tip) + Number(subtotal);
  $: subtotal = Number($Subtotal)
</script>

<Toast />
<div class="place-items-center gap-8 divide-y">
  <div class="w-full">
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
	<div>
	Subtotal: ${subtotal}
	</div>
	<div class = "flex flex-row items-center gap-x-4">
	Tax:<input
        class="input variant-form-material"
        type="text"
        inputmode="decimal"
        bind:value={$Tax}
        placeholder="Item Price"
      />

        </div>
	<div class = "flex flex-row items-center gap-x-4">
	Tip:<input
        class="input variant-form-material"
        type="text"
        inputmode="decimal"
        bind:value={$Tip}
        placeholder="Tip"
      /> {$Subtotal > 0 ? ($Tip/$Subtotal*100).toFixed(2) : "0.00"}%

        </div>
	<div>
	Total: ${total.toFixed(2)}
	</div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
