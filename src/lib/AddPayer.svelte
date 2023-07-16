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

<div class=" grid grid-cols-1 justify-items-center gap-4 divide-y shadow-md">
  <div class="flex w-full flex-row items-center justify-items-center">
    <div class="w-full">
      <input
        class="input variant-form-material"
        type="text"
        bind:value={payer}
      />
    </div>
    <div>
      <button
        type="button"
        class="btn btn-sm variant-filled"
        on:click={addPayer}
      >
        Add Payer
      </button>
    </div>
  </div>
  <div class="grid auto-cols-auto grid-flow-col gap-x-4">
    {#each $Payers as payer}
      <div class="p-2">
        <span class="text-sm">{payer}</span>
      </div>
    {/each}
  </div>
</div>
