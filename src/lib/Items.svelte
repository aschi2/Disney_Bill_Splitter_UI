<script>
  export let item;
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
</div>
