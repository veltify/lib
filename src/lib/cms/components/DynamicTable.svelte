<script lang="ts">
	import { Button, Card } from "veltify";
	
	import TableText from '$lib/cms/fields/TableText.svelte';

	let { fields, config, items = [], context = {}, empty, actions } = $props();

	let confirmOpen: any = $state(false);
	let current: any = $state(null);

	function getComponent(field: any) {
		if (typeof field.type === "object") {
			return field.type.table;
		}

		const fieldType = fields[field.type];
		return fieldType.table ?? TableText;
	}
	
	$effect(() => {
		if (!confirmOpen) {
			current = null;
		}
	});
</script>

<Card>
	<div class="relative w-full overflow-auto rounded-lg">
		{#if items.length > 0}
			<table class="min-w-full w-full text-sm">
				<thead class="overflow-hidden bg-base-200">
					<tr>
						{#each config.table?.columns as fieldName}
							{@const field = config.fields[fieldName]}
							{@const hidden = field.hidden
								? field.hidden({ mode: "list" })
								: false}
							{#if !hidden}
								<th
									class="h-12 border-b border-base-300 px-4 text-start font-medium text-muted"
								>
									{field.label}
								</th>
							{/if}
						{/each}
						{#if actions}
							<th class="h-12 w-0 border-b border-base-300 px-4">
							</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each items as item}
						<tr
							class="border-b border-base-300/50 hover:bg-base-300/20"
						>
							{#each config.table?.columns as fieldName}
								{@const field = config.fields[fieldName]}
								{@const Component = getComponent(field)}

								{@const hidden = field.hidden
									? field.hidden({ mode: "list" })
									: false}
								{#if !hidden}
									<td
										class="whitespace-nowrap p-4 align-middle"
									>
										<Component
											name={fieldName}
											{context}
											{field}
											value={item?.[fieldName]}
										/>
									</td>
								{/if}
							{/each}
							{#if actions}
								<td class="p-4 align-middle w-0">
									<div class="flex gap-2">
										{@render actions(item)}
									</div>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<div
				class="flex flex-col items-center justify-center rounded-lg border border-dashed border-base-300 bg-base-200 py-20 text-center"
			>
				{#if empty}
					{@render empty()}
				{/if}
			</div>
		{/if}
	</div>
</Card>

{#if false}
	<div class="flex items-center justify-between p-4">
		<span>0 of 100 row(s) selected.</span>
		<div>Rows per page 10(dropdown) Page 1 of 10 (buttons)</div>
	</div>
{/if}
