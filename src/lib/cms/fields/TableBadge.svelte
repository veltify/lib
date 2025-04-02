<script>
    let {value, field} = $props();
</script>

<span class="border border-primary/20 bg-primary/10 text-primary rounded-full px-2 py-1">
    {#if typeof field.items[0] === 'object'}
        {field.items.find(x => x.value === value)?.text ?? value}
    {:else}
        {value}
    {/if}
</span>