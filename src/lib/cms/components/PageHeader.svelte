<script lang="ts">
	import { BaseIcon as Icon, Button } from "$lib";
	import SidebarToggler from "./SidebarToggler.svelte";

    const icons = {
        arrowBack: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"/></svg>`
    }

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
                <Icon {icons} name="arrowBack" />
                
                {backText}
            </Button>
        {/if}
        {@render children?.()}
    </div>
</div>