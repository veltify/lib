<script>
	import {Drawer} from '$lib';
	let { children } = $props();

	import { sidebarStore } from '$lib/cms/stores/sidebar';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		$sidebarStore = false;
	});
</script>

<div class="hidden md:flex">
	<aside class="w-70 border-e bg-base-200 border-base-300 p-2">
		<div class=" flex h-full flex-col gap-2">
			{@render children()}
		</div>
	</aside>
</div>

<div class="flex md:hidden">
	<Drawer bind:open={$sidebarStore}>
		<div class=" flex h-full flex-col gap-2">
			{@render children()}
		</div>
	</Drawer>
</div>
