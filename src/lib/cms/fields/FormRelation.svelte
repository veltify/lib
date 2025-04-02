<script lang="ts">
	import { FormField, Select } from "$lib";

	let {
		value = $bindable(),
		halfWidth = false,
		name,
		context = {},
		field,
		error,
	} = $props();
</script>

<FormField
	required={field.required}
	label={field.label}
	{error}
	class="col-span-2 {halfWidth ? 'sm:col-span-1' : ``}"
>
	<Select multiple={field.multiple} bind:value {name}>
		<option selected value={null} hidden disabled>
			Choose {field.label}
		</option>

		{#each context[name] ?? [] as item}
			<option value={item.id}>{item[field.titleField]}</option>
		{/each}
	</Select>
</FormField>
