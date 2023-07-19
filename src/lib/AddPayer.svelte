<script lang="ts">
  import { toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";
  import { Payers } from "../stores/stores.js";
  let payer = "";
  const adderror: ToastSettings = {
    message: "Invalid Payer Name!",
    background: "variant-filled-error",
  };

  function addPayer() {
    if (payer != "" && !$Payers.includes(payer)) {
      $Payers.push(payer);
      $Payers = $Payers;
      console.log($Payers);
      payer = "";
    } else {
      payer = "";
      toastStore.trigger(adderror);
    }
  }
</script>

<div class=" grid grid-cols-1 justify-items-center gap-4">
  <div class="flex w-full flex-row items-center justify-items-center input-group input-group-divider rounded">
      <input
        class="input variant-form-material"
	on:keypress={e => {if (e.key === 'Enter') addPayer()}}
        type="text"
        bind:value={payer}
      />
      <button
        type="button"
        class="variant-filled h-full whitespace-nowrap"
        on:click={addPayer}
      >
      <div class="flex flex-row">
        Add Payer
	</div>
      </button>
  </div>
  <!-- <div class="grid grid-cols-3 grid-flow gap-4 text-center w-full"> -->
  <!--   {#each $Payers as payer} -->
  <!--     <div class="p-2 card truncate"> -->
  <!--       <span class="text-sm">{payer}</span> -->
  <!--     </div> -->
  <!--   {/each} -->
  <!-- </div> -->
</div>
