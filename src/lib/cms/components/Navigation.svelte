<script lang="ts">
	import NavItem from "./NavItem.svelte";
	import NavMenu from "./NavMenu.svelte";

	let { pathname, links } = $props();
</script>

<NavMenu>
	<NavItem active={pathname == "/admin"} name="Home" href="/admin" />
	{#each Object.keys(links) as slug}
		<NavItem
			active={pathname.startsWith("/admin/" + slug)}
			name={links[slug]}
			href="/admin/{slug}"
		/>
	{/each}
</NavMenu>
