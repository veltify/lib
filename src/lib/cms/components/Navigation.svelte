<script lang="ts">
	import NavItem from "./NavItem.svelte";
	import NavMenu from "./NavMenu.svelte";

	import { page } from "$app/state";

	let { links } = $props();
</script>

<NavMenu>
	<NavItem active={page.url.pathname == "/admin"} name="Home" href="/admin" />
	{#each Object.keys(links) as slug}
		<NavItem
			active={page.url.pathname.startsWith("/admin/" + slug)}
			name={links[slug]}
			href="/admin/{slug}"
		/>
	{/each}
</NavMenu>
