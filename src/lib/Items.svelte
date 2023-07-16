<script>
import {Cart} from "../stores/stores"
export let item;
function removeItem() {
	const index = $Cart.findIndex((i) => {
			return i.id === item.id;
		})
	$Cart.splice(index, 1);
	$Cart = $Cart

}
</script>

<div class="grid grid-cols-1 divide-y shadow-md bg-white/10 card">
  <div class="grid grid-cols-3 divide-x ">
    <div class="w-full truncate px-2 text-center">
      {item.name}
    </div>
    <div class="w-full px-2 text-center">
      ${item.price.toFixed(2)}
    </div>
    <div class="h-fit w-full px-2 text-center">
      {item.can_discount ? "Discounted" : "Not Discounted"}
    </div>
  </div>

  <div class="text-center">
    {item.assigned_to}
  </div>
  <div class="text-center py-2">
      <button type="button" class="btn btn-sm variant-filled-error" on:click={removeItem}>
      Delete
      </button>

  </div>
</div>
