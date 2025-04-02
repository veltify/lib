<script>
	import { Image } from "@unpic/svelte";

	let { value, field } = $props();
</script>

{#if field.multiple}
{#each (value ?? []).slice(4) as item}
	<Image class="border rounded border-base-300 bg-base-300/50" width={50} height={50} src={item} alt="image234234" />
{/each}
{#if value.length > 4}
	<div class="w-3xl h-3xl flex items-center justify-center">+{value.length - 4}</div>
{/if}
{:else}
	<Image class="border rounded border-base-300 bg-base-300/50" width={50} height={50} src={value} alt="image234234" />
{/if}
