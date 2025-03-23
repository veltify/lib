<script>
    let {title, children} = $props();

</script>
<h2 class="text-xl font-bold text-gray-700 mt-8 mb-4">{title}</h2>

<div class="border border-base-300 rounded shadow p-8 my-4">
    {@render children?.()}
</div>

