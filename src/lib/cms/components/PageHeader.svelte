<script lang="ts">
	import { Button } from "veltify";
	import SidebarToggler from "./SidebarToggler.svelte";

    let {showSidebarToggler = true, title, backUrl = undefined, onback = undefined, backText = 'Back', children = undefined, ...restProps} = $props();
</script>

<div {...restProps} class="flex items-center flex-wrap justify-between gap-2 py-4">
    {#if showSidebarToggler}
        <SidebarToggler />
    {/if}
    <h2 class="flex-1 text-2xl font-bold text-content">{title}</h2>
    <div class="ms-auto flex flex-wrap gap-2">
        {#if backUrl || onback}
            <Button variant="outline" href={backUrl} onclick={onback}>
                {'<'}
                {backText}
            </Button>
        {/if}
        {@render children?.()}
    </div>
</div>