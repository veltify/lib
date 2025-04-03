<script lang="ts">
	import { FormField, Input } from '$lib';

	let { value = $bindable(), halfWidth = false, name, field, error } = $props();
</script>

<FormField
		label={field.label}
		required={field.required}
		{error}
		class="col-span-2 {halfWidth ? 'sm:col-span-1' : ``}"
	>
		<Input
			type="password"
			{name}
			placeholder={field.placeholder ?? `Enter ${field.label}`}
			bind:value
		/>
	</FormField>