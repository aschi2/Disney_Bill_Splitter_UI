<script>
import {Cart, Add_Name,Add_Price,Add_Assigned_To,Add_Can_Discount} from "../stores/stores"
export let item;
function removeItem() {
	const index = $Cart.findIndex((i) => {
			return i.id === item.id;
		})
	$Cart.splice(index, 1);
	$Cart = $Cart

}
function editItem() {
	$Add_Name = item.name
	$Add_Price = item.price
	$Add_Assigned_To = item.assigned_to
	$Add_Can_Discount = item.can_discount
	removeItem()
}
</script>

<div class="grid grid-cols-1 divide-y shadow-md bg-white/10 card">
<div class="grid grid-cols-1">
    <div class="w-full truncate px-2 text-center">
      {item.name}
    </div>
</div>
  <div class="grid grid-cols-2 divide-x ">
    <div class="w-full px-2 text-center">
      ${item.price.toFixed(2)}
    </div>
    <div class="h-fit w-full px-2 text-center">
      {item.can_discount ? String(item.discount) + "% off" : "Not Discounted"}
    </div>
  </div>

  <div class="text-center">
    {item.assigned_to}
  </div>
  <div class="text-center py-2 grid grid-cols-2">
      <button type="button" class="btn btn-sm variant-filled-error rounded" on:click={removeItem}>
      Delete
      </button>
      <button type="button" class="btn btn-sm variant-filled-tertiary rounded" on:click={editItem}>
      Edit
      </button>

  </div>
</div>
