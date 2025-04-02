<script lang="ts">
    import { FormField, Select } from "$lib";

	let { value = $bindable(), halfWidth = false, name, field, error } = $props();

	function getText(item: any) {
		if (typeof item === 'string' || typeof item === 'number') {
			return item;
		}

		return item.text;
	}

	function getValue(item: any) {
		if (typeof item === 'string' || typeof item === 'number') {
			return item;
		}

		return item.value;
	}

	function isSelected(item: any) {
		if (typeof item === 'string' || typeof item === 'number') {
			return value == item;
		}

		return value == item.value;
	}
</script>


<FormField required={field.required} label={field.label} {error} class="col-span-2 {halfWidth ? 'sm:col-span-1' : ``}">
	<Select bind:value {name}>
		<option selected value={null} hidden disabled>Choose {field.label}</option>
		{#each field.items as item}
			<option selected={isSelected(item)} value={getValue(item)}>{getText(item)}</option>
		{/each}
	</Select>
</FormField>
