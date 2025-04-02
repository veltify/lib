<script>
    let {value, field} = $props();
</script>

{#if value === 0}
    ...
{:else}
    {new Date(value).toDateString()}
{/if}
