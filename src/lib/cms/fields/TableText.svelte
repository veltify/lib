<script>
    let {value} = $props();
</script>

<span class="line-clamp-1">
    {value?.length > 50 ? value.slice(0, 50) + '...' : value}
</span>