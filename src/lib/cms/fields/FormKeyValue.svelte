<script lang="ts">
	import { Button, Icon } from "$lib";


    const icons = {
		lucideCirclePlus:
			'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8m-4-4v8"/></g></svg>',
    }

	let {
		value = $bindable(),
		halfWidth = false,
		field,
		error,
		name,
	} = $props();
</script>

<span class="col-span-2 flex flex-col {halfWidth ? 'sm:col-span-1' : ``}">
	<span class="block text-sm font-medium text-content/80">
		{field.label}

		{#if field.required}
			<span class=" text-red-500">*</span>
		{/if}
	</span>
	<div class="flex flex-col items-start gap-2">
		{#each value ?? [] as item}
			<div class="grid grid-cols-[1fr_1fr_auto] items-center gap-4">
				<div>
					<input
						class="block bg-transparent w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
						type="text"
						placeholder="Key"
						bind:value={item.key}
					/>
				</div>
				<div>
					<input
						class="block bg-transparent w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
						type="text"
						placeholder="Value"
						bind:value={item.value}
					/>
				</div>
				<div class="min-w-[60px] text-center">
					<Button
						onclick={() =>
							(value = value.filter((x) => x.key !== value.key))}
						variant="destructive">Remove</Button
					>
				</div>
			</div>
		{/each}
		<Button
			onclick={() => {
				value ??= [];
				value.push({ key: "", value: "" });
			}}
			variant="secondary"
		>
			<Icon {icons} name="lucideCirclePlus" />
			Add Item
		</Button>
	</div>

	<span class="h-4 pt-0.5 text-xs text-red-500">{error || ""}</span>
</span>
