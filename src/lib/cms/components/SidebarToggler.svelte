<script>
	import { BaseIcon as Icon, Button } from "$lib";
    import { sidebarStore } from '$lib/cms/stores/sidebar';

    const icons = {
		lucidePanelLeftClose: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18m7-6l-3-3l3-3"/></g></svg>`,
		lucidePanelLeftOpen: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18m5-12l3 3l-3 3"/></g></svg>`,
	}

</script>

<span class="md:hidden">
    <Button variant="ghost"  onclick={() => ($sidebarStore = !$sidebarStore)}>
        {#if $sidebarStore}
            <Icon {icons} class="w-lg h-lg" name="lucidePanelLeftClose"/>
        {:else}
            <Icon {icons} class="w-lg h-lg" name="lucidePanelLeftOpen"/>
        {/if}
    </Button>
</span>
