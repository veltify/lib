<script>
	let { value, field, name, context } = $props();

	let item = $derived.by(() => {
		if (field.multiple) {
			return context[name].filter((x) => value.includes(x.id)).map((x) => x[field.titleField]);
		} else {
			return context[name]?.find((x) => x.id == value)?.[field.titleField];
		}
	});
</script>

{#if field.multiple}
	{#each item as text}
		<span class="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-primary">
			{text}
		</span>
	{/each}
{:else}
	<span class="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-primary">
		{item}
	</span>
{/if}
