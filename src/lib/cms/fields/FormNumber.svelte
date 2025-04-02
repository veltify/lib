<script lang="ts">
	import { FormField, Input } from "$lib";

	let {
		value = $bindable(),
		halfWidth = false,
		name,
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
	<Input
		type="number"
		bind:value
		{name}
		placeholder={field.placeholder ?? `Enter ${field.label}`}
	/>
</FormField>
