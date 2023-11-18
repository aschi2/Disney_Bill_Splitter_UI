<script>
  import {
    Cart,
    Tax,
    Tip,
    Payers,
  } from "../stores/stores";
  import Items from "../lib/Items.svelte";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import AddPayer from "../lib/AddPayer.svelte";
  import AddItem from "../lib/AddItem.svelte";
  import Split from "../lib/Split.svelte";
  import Summary from "../lib/Summary.svelte";
  import { Toast } from "@skeletonlabs/skeleton";
  function reset() {
    $Cart = [];
    $Tax = 0;
    $Tip = 0;
    $Payers = [];
  }
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<svelte:head>
</svelte:head>

<Toast />
<div class="place-items-center gap-8">
  <div class="w-full">
    <h1 class="h3 pt-safe pb-2 text-center shadow-2xl sticky top-0 z-50 bg-surface-900">
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
          <Summary />
        </svelte:fragment>
      </AccordionItem>
      <AccordionItem open>
        <svelte:fragment slot="summary">Split</svelte:fragment>
        <svelte:fragment slot="content">
          <Split />
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <div class="text-center">
      <button
        type="button"
        class="btn variant-filled-error rounded"
        on:click={reset}
      >
        Reset
      </button>
    </div>
    <div class="h-10" />
  </div>
</div>
