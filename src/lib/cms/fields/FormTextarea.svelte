<script lang="ts">
    import { FormField, Textarea } from "$lib";

	let { value = $bindable(), halfWidth = false, field, error, name } = $props();
</script>

<FormField
	required={field.required}
	label={field.label}
	{error}
	class="col-span-2 {halfWidth ? 'sm:col-span-1' : ``}"
>
	<Textarea
		required={field.required}
		bind:value
		{name}
		placeholder={field.placeholder ?? `Enter ${field.label}`}
	/>
</FormField>