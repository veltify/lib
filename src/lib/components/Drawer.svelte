<script>
	let { open = $bindable(), children } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={() => (open = false)}
	class="fixed inset-0 z-10 bg-black/80 opacity-0 transition duration-500"
	class:opacity-100={open}
	class:pointer-events-none={!open}
></div>
<div
	class="fixed bottom-0 top-0 z-10 w-60 border-e border-base-300 bg-base-200 p-2 transition duration-500"
	class:-translate-x-full={!open}
	class:left-0={open}
>
	{@render children()}
</div>
